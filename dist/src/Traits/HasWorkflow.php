<?php

namespace MyLaravelCore\Traits;

use Carbon\CarbonInterface;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Builder;
use MyLaravelCore\Enums\WorkFlowType;
use MyLaravelCore\Support\Jalali\Jalali;
use MyLaravelCore\Support\Workflow\BaseWorkflow;
use MyLaravelCore\Support\Workflow\DTO\WorkflowTransition;
use MyLaravelCore\Support\Workflow\WorkflowManager;
use UnitEnum;

/**
 * Connects an Eloquent model to a BaseWorkflow definition for role- and time-windowed
 * status visibility scoping and guarded transitions.
 */
trait HasWorkflow
{
    use HasStatus;

    /**
     * Resolve the workflow instance bound to this model.
     * Override workflowClass() or workflowName(), or define property $workflowClass / $workflowName.
     */
    public function workflow(): BaseWorkflow
    {
        $manager = app(WorkflowManager::class);

        if (method_exists($this, 'workflowClass') && ($class = $this->workflowClass())) {
            return $manager->for($class);
        }

        if (property_exists($this, 'workflowClass') && ! empty($this->workflowClass)) {
            return $manager->for($this->workflowClass);
        }

        if (property_exists($this, 'workflowName') && ! empty($this->workflowName)) {
            return $manager->for($this->workflowName);
        }

        return $manager->for($this->getTable());
    }

    /**
     * Filter records whose status the given user (or current authenticated user) can VIEW at $at.
     */
    public function scopeVisibleForWorkflow(
        Builder $query,
        mixed $user = null,
        CarbonInterface|DateTimeInterface|Jalali|string|null $at = null,
        ?string $column = null
    ): Builder {
        $actor = $user ?? (function_exists('authUser') ? authUser() : null);

        return $this->workflow()->applyVisibleScope($query, $actor, $at, $column);
    }

    /**
     * Alias for scopeVisibleForWorkflow().
     */
    public function scopeVisibleFor(
        Builder $query,
        mixed $user = null,
        CarbonInterface|DateTimeInterface|Jalali|string|null $at = null
    ): Builder {
        return $this->scopeVisibleForWorkflow($query, $user, $at);
    }

    public function canUserViewInWorkflow(
        mixed $user = null,
        CarbonInterface|DateTimeInterface|Jalali|string|null $at = null
    ): bool {
        $actor = $user ?? (function_exists('authUser') ? authUser() : null);
        $col = $this->workflow()->statusColumn();
        $status = $this->{$col};

        if ($status === null) {
            return false;
        }

        return $this->workflow()->can($actor, $status, WorkFlowType::VIEW, $at, $this);
    }

    public function canTransitionTo(
        string|int|UnitEnum $toStatus,
        mixed $user = null,
        CarbonInterface|DateTimeInterface|Jalali|string|null $at = null,
        ?string $note = null
    ): bool {
        $actor = $user ?? (function_exists('authUser') ? authUser() : null);

        return $this->workflow()->canTransition($actor, $this, $toStatus, $at, $note);
    }

    /**
     * @return array<int, WorkflowTransition>
     */
    public function availableWorkflowTransitions(
        mixed $user = null,
        CarbonInterface|DateTimeInterface|Jalali|string|null $at = null
    ): array {
        $actor = $user ?? (function_exists('authUser') ? authUser() : null);

        return $this->workflow()->availableTransitions($actor, $this, $at);
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function availableWorkflowTransitionOptions(
        mixed $user = null,
        CarbonInterface|DateTimeInterface|Jalali|string|null $at = null
    ): array {
        $actor = $user ?? (function_exists('authUser') ? authUser() : null);

        return $this->workflow()->availableTransitionOptions($actor, $this, $at);
    }

    /**
     * Validate role + time window + transition edge, update model status, and dispatch event.
     */
    public function transitionTo(
        string|int|UnitEnum $toStatus,
        mixed $user = null,
        ?string $note = null,
        CarbonInterface|DateTimeInterface|Jalali|string|null $at = null
    ): bool {
        $actor = $user ?? (function_exists('authUser') ? authUser() : null);

        return $this->workflow()->executeTransition($this, $toStatus, $actor, $note, $at);
    }
}
