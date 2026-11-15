<?php

namespace MyLaravelCore\Support\Workflow;

use BackedEnum;
use Carbon\Carbon;
use Carbon\CarbonInterface;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Event;
use MyLaravelCore\Enums\WorkFlowType;
use MyLaravelCore\Events\WorkflowTransitioned;
use MyLaravelCore\Exceptions\WorkflowTransitionException;
use MyLaravelCore\Support\Jalali\Jalali;
use MyLaravelCore\Support\Workflow\DTO\TimeWindow;
use MyLaravelCore\Support\Workflow\DTO\WorkflowRule;
use MyLaravelCore\Support\Workflow\DTO\WorkflowTransition;
use Traversable;
use UnitEnum;

/**
 * Base class for declarative Role + Time-Windowed Workflows in AbolFrame.
 */
abstract class BaseWorkflow
{
    /**
     * Unique machine identifier (e.g. 'purchase', 'user').
     */
    abstract public function name(): string;

    /**
     * Human-readable Persian/English title (e.g. 'گردش کار خرید').
     */
    abstract public function title(): string;

    /**
     * Return list of role/status/time-window rules governing VIEW, CHANGE, and SET access.
     *
     * @return array<int, WorkflowRule>
     */
    abstract public function rules(): array;

    /**
     * Allowed state transitions (from -> to). Override to enforce directed graph edges.
     *
     * @return array<int, WorkflowTransition>
     */
    public function transitions(): array
    {
        return [];
    }

    /**
     * Optional backed Enum class representing all statuses in this workflow.
     *
     * @return class-string<UnitEnum>|null
     */
    public function statusEnum(): ?string
    {
        return null;
    }

    public function statusColumn(): string
    {
        return 'status';
    }

    public function initialStatus(): string|int|UnitEnum|null
    {
        return null;
    }

    /**
     * Roles exempt from time/rule blocks (configured or overridden per workflow).
     *
     * @return array<int, string>
     */
    public function superAdminRoles(): array
    {
        if (function_exists('config')) {
            return (array) config('core.workflow.super_admin_roles', []);
        }

        return [];
    }

    /**
     * Return all normalized status values defined by this workflow's Enum or rules/transitions.
     *
     * @return array<int, string|int>
     */
    public function allStatuses(): array
    {
        $enum = $this->statusEnum();
        if ($enum !== null && enum_exists($enum)) {
            return array_values(array_map(
                static fn (UnitEnum $case) => WorkflowRule::normalizeStatusValue($case),
                $enum::cases()
            ));
        }

        $statuses = [];

        foreach ($this->rules() as $rule) {
            foreach ($rule->getStatuses() as $status) {
                if ((string) $status !== '*' && ! in_array($status, $statuses, true)) {
                    $statuses[] = $status;
                }
            }
        }

        foreach ($this->transitions() as $transition) {
            foreach ($transition->getFromStatuses() as $from) {
                if ((string) $from !== '*' && ! in_array($from, $statuses, true)) {
                    $statuses[] = $from;
                }
            }
            $to = $transition->getToStatus();
            if ((string) $to !== '*' && ! in_array($to, $statuses, true)) {
                $statuses[] = $to;
            }
        }

        return $statuses;
    }

    /**
     * Resolve normalized role names/identifiers from any user representation.
     *
     * @return array<int, string>
     */
    public function resolveUserRoles(mixed $user): array
    {
        if (function_exists('config')) {
            $customResolver = config('core.workflow.role_resolver');
            if (is_callable($customResolver)) {
                return $this->normalizeRoleCollection($customResolver($user));
            }
        }

        if ($user === null) {
            return [];
        }

        if (is_string($user) || is_int($user) || $user instanceof UnitEnum) {
            return $this->normalizeRoleCollection([$user]);
        }

        if (is_array($user)) {
            if (array_key_exists('roles', $user)) {
                return $this->normalizeRoleCollection($user['roles']);
            }
            if (array_key_exists('role', $user)) {
                return $this->normalizeRoleCollection([$user['role']]);
            }

            return $this->normalizeRoleCollection($user);
        }

        if (is_object($user)) {
            if (method_exists($user, 'getWorkflowRoles')) {
                return $this->normalizeRoleCollection($user->getWorkflowRoles());
            }

            if (method_exists($user, 'getRoleNames')) {
                return $this->normalizeRoleCollection($user->getRoleNames());
            }

            $collected = [];

            if (isset($user->roles)) {
                $collected = array_merge($collected, $this->normalizeRoleCollection($user->roles));
            }

            if (isset($user->role)) {
                $collected = array_merge($collected, $this->normalizeRoleCollection([$user->role]));
            }

            if (isset($user->role_name)) {
                $collected = array_merge($collected, $this->normalizeRoleCollection([$user->role_name]));
            }

            if (isset($user->role_id)) {
                $collected = array_merge($collected, $this->normalizeRoleCollection([$user->role_id]));
            }

            return array_values(array_unique($collected));
        }

        return [];
    }

    /**
     * Check whether the given user can perform $type (VIEW, CHANGE, SET) on $status at $at.
     */
    public function can(
        mixed $user,
        string|int|UnitEnum $status,
        WorkFlowType $type = WorkFlowType::VIEW,
        CarbonInterface|DateTimeInterface|Jalali|string|null $at = null,
        mixed $model = null
    ): bool {
        $userRoles = $this->resolveUserRoles($user);

        if ($this->hasSuperAdminRole($userRoles)) {
            return true;
        }

        if (empty($userRoles)) {
            return false;
        }

        $moment = $this->normalizeMoment($at);

        foreach ($this->rules() as $rule) {
            if ($rule->matches($user, $userRoles, $status, $type, $moment, $model)) {
                return true;
            }
        }

        return false;
    }

    public function canViewStatus(
        mixed $user,
        string|int|UnitEnum $status,
        CarbonInterface|DateTimeInterface|Jalali|string|null $at = null,
        mixed $model = null
    ): bool {
        return $this->can($user, $status, WorkFlowType::VIEW, $at, $model);
    }

    public function canChangeStatus(
        mixed $user,
        string|int|UnitEnum $status,
        CarbonInterface|DateTimeInterface|Jalali|string|null $at = null,
        mixed $model = null
    ): bool {
        return $this->can($user, $status, WorkFlowType::CHANGE, $at, $model);
    }

    public function canSetStatus(
        mixed $user,
        string|int|UnitEnum $status,
        CarbonInterface|DateTimeInterface|Jalali|string|null $at = null,
        mixed $model = null
    ): bool {
        return $this->can($user, $status, WorkFlowType::SET, $at, $model);
    }

    /**
     * Return all statuses visible (or actionable via $type) to $user at $at.
     *
     * @return array<int, string|int>
     */
    public function visibleStatuses(
        mixed $user,
        CarbonInterface|DateTimeInterface|Jalali|string|null $at = null,
        WorkFlowType $type = WorkFlowType::VIEW,
        mixed $model = null
    ): array {
        $result = [];

        foreach ($this->allStatuses() as $status) {
            if ($this->can($user, $status, $type, $at, $model)) {
                $result[] = $status;
            }
        }

        return $result;
    }

    /**
     * Filter an Eloquent query to records whose status is currently visible to $user at $at.
     */
    public function applyVisibleScope(
        Builder $query,
        mixed $user,
        CarbonInterface|DateTimeInterface|Jalali|string|null $at = null,
        ?string $column = null
    ): Builder {
        $statuses = $this->visibleStatuses($user, $at, WorkFlowType::VIEW);
        $col = $column ?? $this->statusColumn();

        if (method_exists($query, 'getModel') && $query->getModel() !== null) {
            $col = $query->getModel()->qualifyColumn($col);
        }

        if (empty($statuses)) {
            return $query->whereRaw('1 = 0');
        }

        return $query->whereIn($col, $statuses);
    }

    /**
     * Determine whether $user can move $model from its current status to $toStatus at $at.
     */
    public function canTransition(
        mixed $user,
        mixed $model,
        string|int|UnitEnum $toStatus,
        CarbonInterface|DateTimeInterface|Jalali|string|null $at = null,
        ?string $note = null
    ): bool {
        $evaluation = $this->evaluateTransition($user, $model, $toStatus, $at, $note);

        return $evaluation['allowed'];
    }

    /**
     * Authorize a transition or throw WorkflowTransitionException with the exact denial reason.
     */
    public function authorizeTransition(
        mixed $user,
        mixed $model,
        string|int|UnitEnum $toStatus,
        CarbonInterface|DateTimeInterface|Jalali|string|null $at = null,
        ?string $note = null
    ): ?WorkflowTransition {
        $evaluation = $this->evaluateTransition($user, $model, $toStatus, $at, $note);

        if (! $evaluation['allowed']) {
            throw new WorkflowTransitionException($evaluation['reason'] ?? 'امکان تغییر وضعیت در این گردش کار وجود ندارد.');
        }

        return $evaluation['transition'];
    }

    /**
     * Return all permitted WorkflowTransition objects available from $model's current status for $user at $at.
     *
     * @return array<int, WorkflowTransition>
     */
    public function availableTransitions(
        mixed $user,
        mixed $model,
        CarbonInterface|DateTimeInterface|Jalali|string|null $at = null
    ): array {
        $currentStatus = $this->extractModelStatus($model);
        $userRoles = $this->resolveUserRoles($user);
        $isSuperAdmin = $this->hasSuperAdminRole($userRoles);
        $moment = $this->normalizeMoment($at);

        $transitions = $this->transitions();

        // When no explicit transition graph is configured, synthesize transitions to statuses the user can SET.
        if (empty($transitions)) {
            $synthesized = [];
            foreach ($this->allStatuses() as $target) {
                if ((string) $target === (string) $currentStatus) {
                    continue;
                }
                if ($this->canTransition($user, $model, $target, $moment)) {
                    $label = $this->resolveStatusLabel($target);
                    $synthesized[] = WorkflowTransition::make($currentStatus ?? '*', $target)->label($label);
                }
            }

            return $synthesized;
        }

        $available = [];

        foreach ($transitions as $transition) {
            if ($currentStatus !== null && ! $transition->matchesFrom($currentStatus)) {
                continue;
            }

            if (! $isSuperAdmin) {
                if (! $transition->matchesRole($userRoles)) {
                    continue;
                }

                if (! $transition->passesTimeWindow($moment)) {
                    continue;
                }

                if (empty($transition->getRoles()) && ! $this->passesRuleBasedTransition($user, $currentStatus, $transition->getToStatus(), $moment, $model)) {
                    continue;
                }
            }

            if (! $transition->passesGuard($model, $user, null)) {
                continue;
            }

            $available[] = $transition;
        }

        return $available;
    }

    /**
     * Return UI-ready array of available transitions (including resolved Persian labels).
     *
     * @return array<int, array<string, mixed>>
     */
    public function availableTransitionOptions(
        mixed $user,
        mixed $model,
        CarbonInterface|DateTimeInterface|Jalali|string|null $at = null
    ): array {
        return array_map(function (WorkflowTransition $transition): array {
            $data = $transition->toArray();
            if ($transition->getLabel() === null) {
                $data['label'] = $this->resolveStatusLabel($transition->getToStatus());
            }

            return $data;
        }, $this->availableTransitions($user, $model, $at));
    }

    /**
     * Authorize, apply, save, and dispatch WorkflowTransitioned event on an Eloquent model.
     */
    public function executeTransition(
        mixed $model,
        string|int|UnitEnum $toStatus,
        mixed $user = null,
        ?string $note = null,
        CarbonInterface|DateTimeInterface|Jalali|string|null $at = null
    ): bool {
        $this->authorizeTransition($user, $model, $toStatus, $at, $note);

        $fromStatus = $this->extractModelStatus($model);
        $column = $this->statusColumn();
        $targetValue = WorkflowRule::normalizeStatusValue($toStatus);

        $model->{$column} = $targetValue;
        $saved = $model->save();

        if ($saved && class_exists(Event::class)) {
            Event::dispatch(new WorkflowTransitioned(
                model: $model,
                workflow: $this->name(),
                fromStatus: $fromStatus,
                toStatus: $targetValue,
                actor: $user,
                note: $note,
            ));
        }

        return $saved;
    }

    /**
     * Return human-readable structure describing all statuses, rules, and transitions for documentation/UI.
     */
    public function toDiagramArray(): array
    {
        return [
            'name' => $this->name(),
            'title' => $this->title(),
            'status_column' => $this->statusColumn(),
            'status_enum' => $this->statusEnum(),
            'initial_status' => $this->initialStatus() !== null
                ? WorkflowRule::normalizeStatusValue($this->initialStatus())
                : null,
            'statuses' => array_map(fn ($status) => [
                'value' => $status,
                'label' => $this->resolveStatusLabel($status),
            ], $this->allStatuses()),
            'rules' => array_map(static fn (WorkflowRule $rule) => $rule->toArray(), $this->rules()),
            'transitions' => array_map(fn (WorkflowTransition $transition) => array_merge(
                $transition->toArray(),
                ['label' => $transition->getLabel() ?? $this->resolveStatusLabel($transition->getToStatus())]
            ), $this->transitions()),
        ];
    }

    public function resolveStatusLabel(string|int|UnitEnum $status): string
    {
        $normalized = WorkflowRule::normalizeStatusValue($status);
        $enum = $this->statusEnum();

        if ($enum !== null && enum_exists($enum)) {
            $case = is_subclass_of($enum, BackedEnum::class)
                ? $enum::tryFrom($normalized)
                : null;

            if ($case !== null && method_exists($case, 'label')) {
                return (string) $case->label();
            }
        }

        return (string) $normalized;
    }

    /**
     * @return array{allowed: bool, transition: ?WorkflowTransition, reason: ?string}
     */
    protected function evaluateTransition(
        mixed $user,
        mixed $model,
        string|int|UnitEnum $toStatus,
        CarbonInterface|DateTimeInterface|Jalali|string|null $at = null,
        ?string $note = null
    ): array {
        $fromStatus = $this->extractModelStatus($model);
        $targetValue = WorkflowRule::normalizeStatusValue($toStatus);
        $userRoles = $this->resolveUserRoles($user);
        $isSuperAdmin = $this->hasSuperAdminRole($userRoles);
        $moment = $this->normalizeMoment($at);

        $transitions = $this->transitions();

        // Case 1: Graph edges are explicitly defined via transitions().
        if (! empty($transitions)) {
            $matchingEdges = array_values(array_filter(
                $transitions,
                static fn (WorkflowTransition $t) => $fromStatus !== null
                    ? $t->matchesEdge($fromStatus, $targetValue)
                    : (string) $t->getToStatus() === (string) $targetValue
            ));

            if (empty($matchingEdges)) {
                return [
                    'allowed' => false,
                    'transition' => null,
                    'reason' => sprintf(
                        'انتقال وضعیت از «%s» به «%s» در گردش کار «%s» تعریف نشده است.',
                        $fromStatus !== null ? $this->resolveStatusLabel($fromStatus) : 'نامشخص',
                        $this->resolveStatusLabel($targetValue),
                        $this->title()
                    ),
                ];
            }

            $lastDenial = 'نقش یا بازه زمانی شما مجاز به انجام این تغییر وضعیت نیست.';

            foreach ($matchingEdges as $edge) {
                if (! $isSuperAdmin) {
                    if (! $edge->matchesRole($userRoles)) {
                        $lastDenial = 'نقش کاربری شما مجاز به اجرای این مرحله از گردش کار نیست.';
                        continue;
                    }

                    if (! $edge->passesTimeWindow($moment)) {
                        $lastDenial = 'در این بازه زمانی امکان تغییر وضعیت وجود ندارد.';
                        continue;
                    }

                    if (empty($edge->getRoles()) && ! $this->passesRuleBasedTransition($user, $fromStatus, $targetValue, $moment, $model)) {
                        $lastDenial = 'دسترسی نقش یا بازه زمانی برای تغییر یا تنظیم این وضعیت تایید نشد.';
                        continue;
                    }
                }

                if ($edge->isNoteRequired() && trim((string) $note) === '') {
                    $lastDenial = 'ثبت توضیحات (یادداشت) برای این تغییر وضعیت الزامی است.';
                    continue;
                }

                if (! $edge->passesGuard($model, $user, $note)) {
                    $lastDenial = 'شروط اختصاصی انتقال وضعیت برقرار نیست.';
                    continue;
                }

                return [
                    'allowed' => true,
                    'transition' => $edge,
                    'reason' => null,
                ];
            }

            return [
                'allowed' => false,
                'transition' => null,
                'reason' => $lastDenial,
            ];
        }

        // Case 2: No explicit edges; evaluate via CHANGE / SET rules.
        if ($isSuperAdmin) {
            return [
                'allowed' => true,
                'transition' => null,
                'reason' => null,
            ];
        }

        if ($this->passesRuleBasedTransition($user, $fromStatus, $targetValue, $moment, $model)) {
            return [
                'allowed' => true,
                'transition' => null,
                'reason' => null,
            ];
        }

        return [
            'allowed' => false,
            'transition' => null,
            'reason' => 'شما در این نقش یا بازه زمانی مجوز تغییر یا تنظیم وضعیت انتخاب‌شده را ندارید.',
        ];
    }

    protected function passesRuleBasedTransition(
        mixed $user,
        string|int|null $fromStatus,
        string|int $toStatus,
        CarbonInterface $moment,
        mixed $model = null
    ): bool {
        $hasChangeRules = $this->hasRulesForType(WorkFlowType::CHANGE);
        $hasSetRules = $this->hasRulesForType(WorkFlowType::SET);

        if (! $hasChangeRules && ! $hasSetRules) {
            return false;
        }

        if ($hasChangeRules && $fromStatus !== null && ! $this->can($user, $fromStatus, WorkFlowType::CHANGE, $moment, $model)) {
            return false;
        }

        if ($hasSetRules && ! $this->can($user, $toStatus, WorkFlowType::SET, $moment, $model)) {
            return false;
        }

        return true;
    }

    protected function hasRulesForType(WorkFlowType $type): bool
    {
        foreach ($this->rules() as $rule) {
            if ($rule->allowsType($type)) {
                return true;
            }
        }

        return false;
    }

    protected function extractModelStatus(mixed $model): string|int|null
    {
        if ($model === null) {
            return null;
        }

        if (is_string($model) || is_int($model) || $model instanceof UnitEnum) {
            return WorkflowRule::normalizeStatusValue($model);
        }

        $col = $this->statusColumn();

        if (is_array($model)) {
            return isset($model[$col]) ? WorkflowRule::normalizeStatusValue($model[$col]) : null;
        }

        if (is_object($model) && isset($model->{$col})) {
            return WorkflowRule::normalizeStatusValue($model->{$col});
        }

        return null;
    }

    /**
     * @param array<int, string> $userRoles
     */
    protected function hasSuperAdminRole(array $userRoles): bool
    {
        $admins = array_map(
            static fn ($r) => mb_strtolower(trim((string) $r)),
            $this->superAdminRoles()
        );

        if (empty($admins)) {
            return false;
        }

        foreach ($userRoles as $role) {
            if (in_array(mb_strtolower(trim((string) $role)), $admins, true)) {
                return true;
            }
        }

        return false;
    }

    protected function normalizeMoment(CarbonInterface|DateTimeInterface|Jalali|string|null $at): CarbonInterface
    {
        $tz = function_exists('config')
            ? (string) config('core.workflow.default_timezone', config('core.date.timezone', 'Asia/Tehran'))
            : 'Asia/Tehran';

        if ($at === null) {
            return Carbon::now($tz);
        }

        return TimeWindow::parseDateTime($at, $tz);
    }

    /**
     * @return array<int, string>
     */
    protected function normalizeRoleCollection(mixed $roles): array
    {
        if ($roles === null) {
            return [];
        }

        $items = ($roles instanceof Traversable || is_array($roles)) ? $roles : [$roles];
        $result = [];

        foreach ($items as $item) {
            if ($item === null || $item === '') {
                continue;
            }

            if ($item instanceof BackedEnum) {
                $result[] = (string) $item->value;
                continue;
            }

            if ($item instanceof UnitEnum) {
                $result[] = $item->name;
                continue;
            }

            if (is_object($item)) {
                foreach (['slug', 'name', 'title', 'id'] as $prop) {
                    if (isset($item->{$prop}) && $item->{$prop} !== '') {
                        $result[] = (string) $item->{$prop};
                        break;
                    }
                }
                continue;
            }

            if (is_array($item)) {
                foreach (['slug', 'name', 'title', 'id'] as $key) {
                    if (isset($item[$key]) && $item[$key] !== '') {
                        $result[] = (string) $item[$key];
                        break;
                    }
                }
                continue;
            }

            $result[] = (string) $item;
        }

        return array_values(array_unique($result));
    }
}
