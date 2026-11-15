<?php

namespace MyLaravelCore\Support\Workflow\DTO;

use Carbon\CarbonInterface;
use Closure;
use UnitEnum;

/**
 * Defines a permitted status transition edge (from -> to) with optional role,
 * time-window schedule, UI metadata, note requirement, and guard closure.
 */
class WorkflowTransition
{
    /** @var array<int, string|int> */
    protected array $fromStatuses = [];

    protected string|int $toStatus;

    /** @var array<int, string> */
    protected array $roles = [];

    protected ?TimeWindow $timeWindow = null;

    protected ?Closure $guard = null;

    protected ?string $label = null;

    protected string $variant = 'primary';

    protected ?string $icon = null;

    protected bool $requiresNote = false;

    /**
     * @param string|int|UnitEnum|array<int, string|int|UnitEnum> $from
     */
    public function __construct(string|int|UnitEnum|array $from, string|int|UnitEnum $to)
    {
        $fromItems = is_array($from) ? $from : [$from];
        $this->fromStatuses = array_values(array_unique(array_map(
            static fn ($s) => WorkflowRule::normalizeStatusValue($s),
            $fromItems
        ), SORT_REGULAR));

        $this->toStatus = WorkflowRule::normalizeStatusValue($to);
    }

    /**
     * @param string|int|UnitEnum|array<int, string|int|UnitEnum> $from
     */
    public static function make(string|int|UnitEnum|array $from, string|int|UnitEnum $to): self
    {
        return new self($from, $to);
    }

    /**
     * Restrict which roles can trigger this transition (empty = any role permitted by workflow rules).
     *
     * @param string|int|UnitEnum|array<int, string|int|UnitEnum> $roles
     */
    public function roles(string|int|UnitEnum|array $roles): self
    {
        $items = is_array($roles) ? $roles : [$roles];
        $this->roles = array_values(array_unique(array_map(
            static fn ($r) => (string) WorkflowRule::normalizeStatusValue($r),
            $items
        )));

        return $this;
    }

    public function during(TimeWindow $window): self
    {
        $this->timeWindow = $window;

        return $this;
    }

    public function hours(string $from, string $to): self
    {
        $this->ensureTimeWindow()->hours($from, $to);

        return $this;
    }

    public function between(mixed $startsAt, mixed $endsAt): self
    {
        $this->ensureTimeWindow()->between($startsAt, $endsAt);

        return $this;
    }

    /**
     * @param array<int, string|int>|string $days
     */
    public function days(array|string $days): self
    {
        $this->ensureTimeWindow()->days($days);

        return $this;
    }

    public function timezone(string $timezone): self
    {
        $this->ensureTimeWindow()->timezone($timezone);

        return $this;
    }

    public function label(string $label): self
    {
        $this->label = $label;

        return $this;
    }

    public function variant(string $variant): self
    {
        $this->variant = $variant;

        return $this;
    }

    public function icon(string $icon): self
    {
        $this->icon = $icon;

        return $this;
    }

    public function requiresNote(bool $required = true): self
    {
        $this->requiresNote = $required;

        return $this;
    }

    /**
     * Attach a guard closure: fn ($model, $user, ?string $note): bool.
     */
    public function guard(Closure $guard): self
    {
        $this->guard = $guard;

        return $this;
    }

    public function matchesEdge(string|int|UnitEnum $from, string|int|UnitEnum $to): bool
    {
        $fromVal = (string) WorkflowRule::normalizeStatusValue($from);
        $toVal = (string) WorkflowRule::normalizeStatusValue($to);

        if ((string) $this->toStatus !== $toVal) {
            return false;
        }

        foreach ($this->fromStatuses as $candidate) {
            if ((string) $candidate === '*' || (string) $candidate === $fromVal) {
                return true;
            }
        }

        return false;
    }

    public function matchesFrom(string|int|UnitEnum $from): bool
    {
        $fromVal = (string) WorkflowRule::normalizeStatusValue($from);

        foreach ($this->fromStatuses as $candidate) {
            if ((string) $candidate === '*' || (string) $candidate === $fromVal) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param array<int, string> $userRoles
     */
    public function matchesRole(array $userRoles): bool
    {
        if (empty($this->roles) || in_array('*', $this->roles, true)) {
            return true;
        }

        $normalized = array_map(static fn ($r) => mb_strtolower(trim((string) $r)), $userRoles);
        foreach ($this->roles as $role) {
            if (in_array(mb_strtolower(trim((string) $role)), $normalized, true)) {
                return true;
            }
        }

        return false;
    }

    public function passesTimeWindow(CarbonInterface $at): bool
    {
        return $this->timeWindow === null || $this->timeWindow->isSatisfiedAt($at);
    }

    public function passesGuard(mixed $model, mixed $user, ?string $note = null): bool
    {
        if ($this->guard === null) {
            return true;
        }

        return (bool) ($this->guard)($model, $user, $note);
    }

    /**
     * @return array<int, string|int>
     */
    public function getFromStatuses(): array
    {
        return $this->fromStatuses;
    }

    public function getToStatus(): string|int
    {
        return $this->toStatus;
    }

    /**
     * @return array<int, string>
     */
    public function getRoles(): array
    {
        return $this->roles;
    }

    public function getTimeWindow(): ?TimeWindow
    {
        return $this->timeWindow;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function getVariant(): string
    {
        return $this->variant;
    }

    public function getIcon(): ?string
    {
        return $this->icon;
    }

    public function isNoteRequired(): bool
    {
        return $this->requiresNote;
    }

    public function toArray(): array
    {
        return [
            'from' => $this->fromStatuses,
            'to' => $this->toStatus,
            'label' => $this->label ?? (string) $this->toStatus,
            'variant' => $this->variant,
            'icon' => $this->icon,
            'roles' => $this->roles,
            'requires_note' => $this->requiresNote,
            'time_window' => $this->timeWindow?->toArray(),
        ];
    }

    protected function ensureTimeWindow(): TimeWindow
    {
        if ($this->timeWindow === null) {
            $this->timeWindow = TimeWindow::make();
        }

        return $this->timeWindow;
    }
}
