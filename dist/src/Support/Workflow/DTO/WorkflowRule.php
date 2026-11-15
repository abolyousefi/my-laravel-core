<?php

namespace MyLaravelCore\Support\Workflow\DTO;

use BackedEnum;
use Carbon\CarbonInterface;
use Closure;
use MyLaravelCore\Enums\WorkFlowType;
use UnitEnum;

/**
 * Defines a declarative rule tying Roles, Statuses, WorkFlowType permissions (VIEW / CHANGE / SET),
 * an optional TimeWindow schedule, and optional runtime predicates.
 */
class WorkflowRule
{
    /** @var array<int, string> */
    protected array $roles = [];

    /** @var array<int, string|int> */
    protected array $statuses = [];

    /** @var array<int, int> */
    protected array $types = [WorkFlowType::VIEW->value];

    protected TimeWindow|Closure|null $timeWindow = null;

    protected ?Closure $condition = null;

    protected ?string $description = null;

    public static function make(): self
    {
        return new self();
    }

    /**
     * Specify allowed role name(s)/ID(s), or '*' for any user.
     *
     * @param string|int|UnitEnum|array<int, string|int|UnitEnum> $roles
     */
    public function roles(string|int|UnitEnum|array $roles): self
    {
        $items = is_array($roles) ? $roles : [$roles];
        $this->roles = array_values(array_unique(array_map(
            static fn ($r) => self::normalizeScalar($r),
            $items
        )));

        return $this;
    }

    /**
     * Specify statuses covered by this rule (Enum cases, strings, ints, or '*').
     *
     * @param string|int|UnitEnum|array<int, string|int|UnitEnum> $statuses
     */
    public function statuses(string|int|UnitEnum|array $statuses): self
    {
        $items = is_array($statuses) ? $statuses : [$statuses];
        $this->statuses = array_values(array_unique(array_map(
            static fn ($s) => self::normalizeStatusValue($s),
            $items
        ), SORT_REGULAR));

        return $this;
    }

    /**
     * Specify which WorkFlowType actions are allowed by this rule.
     *
     * @param WorkFlowType|int|array<int, WorkFlowType|int> $types
     */
    public function allow(WorkFlowType|int|array $types): self
    {
        $items = is_array($types) ? $types : [$types];
        $normalized = [];

        foreach ($items as $type) {
            if ($type instanceof WorkFlowType) {
                $normalized[] = $type->value;
            } else {
                $normalized[] = (int) $type;
            }
        }

        $this->types = array_values(array_unique($normalized));

        return $this;
    }

    /**
     * Alias for allow().
     *
     * @param WorkFlowType|int|array<int, WorkFlowType|int> $types
     */
    public function types(WorkFlowType|int|array $types): self
    {
        return $this->allow($types);
    }

    public function canView(): self
    {
        return $this->addType(WorkFlowType::VIEW);
    }

    public function canChange(): self
    {
        return $this->addType(WorkFlowType::CHANGE);
    }

    public function canSet(): self
    {
        return $this->addType(WorkFlowType::SET);
    }

    public function onlyView(): self
    {
        $this->types = [WorkFlowType::VIEW->value];

        return $this;
    }

    public function allActions(): self
    {
        $this->types = [
            WorkFlowType::VIEW->value,
            WorkFlowType::CHANGE->value,
            WorkFlowType::SET->value,
        ];

        return $this;
    }

    public function during(TimeWindow|Closure $window): self
    {
        $this->timeWindow = $window;

        return $this;
    }

    public function window(TimeWindow|Closure $window): self
    {
        return $this->during($window);
    }

    public function hours(string $from, string $to): self
    {
        $window = $this->ensureTimeWindow();
        $window->hours($from, $to);

        return $this;
    }

    public function between(mixed $startsAt, mixed $endsAt): self
    {
        $window = $this->ensureTimeWindow();
        $window->between($startsAt, $endsAt);

        return $this;
    }

    public function from(mixed $startsAt): self
    {
        $window = $this->ensureTimeWindow();
        $window->from($startsAt);

        return $this;
    }

    public function until(mixed $endsAt): self
    {
        $window = $this->ensureTimeWindow();
        $window->until($endsAt);

        return $this;
    }

    /**
     * @param array<int, string|int>|string $days
     */
    public function days(array|string $days): self
    {
        $window = $this->ensureTimeWindow();
        $window->days($days);

        return $this;
    }

    public function timezone(string $timezone): self
    {
        $window = $this->ensureTimeWindow();
        $window->timezone($timezone);

        return $this;
    }

    /**
     * Attach a custom predicate receiving ($user, $status, CarbonInterface $at, $model).
     */
    public function when(Closure $condition): self
    {
        $this->condition = $condition;

        return $this;
    }

    public function description(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function allowsType(WorkFlowType $type): bool
    {
        return in_array($type->value, $this->types, true);
    }

    /**
     * @param array<int, string> $userRoles
     */
    public function matchesRole(array $userRoles): bool
    {
        if (empty($this->roles)) {
            return false;
        }

        if (in_array('*', $this->roles, true) || in_array('all', $this->roles, true)) {
            return true;
        }

        $normalizedUserRoles = array_map(
            static fn ($r) => mb_strtolower(trim((string) $r)),
            $userRoles
        );

        foreach ($this->roles as $role) {
            if (in_array(mb_strtolower(trim((string) $role)), $normalizedUserRoles, true)) {
                return true;
            }
        }

        return false;
    }

    public function matchesStatus(string|int|UnitEnum $status): bool
    {
        if (empty($this->statuses)) {
            return false;
        }

        if (in_array('*', $this->statuses, true)) {
            return true;
        }

        $normalized = self::normalizeStatusValue($status);

        foreach ($this->statuses as $candidate) {
            if ((string) $candidate === (string) $normalized) {
                return true;
            }
        }

        return false;
    }

    public function isSatisfiedAt(CarbonInterface $at, mixed $user = null, string|int|UnitEnum|null $status = null, mixed $model = null): bool
    {
        if ($this->timeWindow instanceof TimeWindow) {
            if (! $this->timeWindow->isSatisfiedAt($at)) {
                return false;
            }
        } elseif ($this->timeWindow instanceof Closure) {
            if (! (bool) ($this->timeWindow)($at, $user, $status, $model)) {
                return false;
            }
        }

        if ($this->condition !== null) {
            return (bool) ($this->condition)($user, $status, $at, $model);
        }

        return true;
    }

    /**
     * @param array<int, string> $userRoles
     */
    public function matches(
        mixed $user,
        array $userRoles,
        string|int|UnitEnum $status,
        WorkFlowType $type,
        CarbonInterface $at,
        mixed $model = null
    ): bool {
        if (! $this->allowsType($type)) {
            return false;
        }

        if (! $this->matchesRole($userRoles)) {
            return false;
        }

        if (! $this->matchesStatus($status)) {
            return false;
        }

        return $this->isSatisfiedAt($at, $user, $status, $model);
    }

    /**
     * @return array<int, string>
     */
    public function getRoles(): array
    {
        return $this->roles;
    }

    /**
     * @return array<int, string|int>
     */
    public function getStatuses(): array
    {
        return $this->statuses;
    }

    /**
     * @return array<int, int>
     */
    public function getTypes(): array
    {
        return $this->types;
    }

    public function getTimeWindow(): TimeWindow|Closure|null
    {
        return $this->timeWindow;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function toArray(): array
    {
        return [
            'roles' => $this->roles,
            'statuses' => $this->statuses,
            'types' => array_map(
                static fn (int $val) => WorkFlowType::tryFrom($val)?->name ?? $val,
                $this->types
            ),
            'time_window' => $this->timeWindow instanceof TimeWindow ? $this->timeWindow->toArray() : null,
            'description' => $this->description,
        ];
    }

    protected function addType(WorkFlowType $type): self
    {
        if (! in_array($type->value, $this->types, true)) {
            $this->types[] = $type->value;
        }

        return $this;
    }

    protected function ensureTimeWindow(): TimeWindow
    {
        if (! $this->timeWindow instanceof TimeWindow) {
            $this->timeWindow = TimeWindow::make();
        }

        return $this->timeWindow;
    }

    public static function normalizeStatusValue(string|int|UnitEnum $status): string|int
    {
        if ($status instanceof BackedEnum) {
            return $status->value;
        }

        if ($status instanceof UnitEnum) {
            return $status->name;
        }

        return $status;
    }

    protected static function normalizeScalar(string|int|UnitEnum $value): string
    {
        if ($value instanceof BackedEnum) {
            return (string) $value->value;
        }

        if ($value instanceof UnitEnum) {
            return $value->name;
        }

        return (string) $value;
    }
}
