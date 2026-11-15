<?php

namespace MyLaravelCore\Support\DeleteDependency\Traits;

use MyLaravelCore\Enums\DeleteDependencyMode;
use MyLaravelCore\Exceptions\DeletionGuardException;
use MyLaravelCore\Support\DeleteDependency\DTO\DeletableState;
use MyLaravelCore\Support\DeleteDependency\DTO\DeleteDependency;

trait HasDeleteDependency
{
    public function initializeHasDeleteDependency(): void
    {
        if (!in_array('deletable', $this->appends, true)) {
            $this->appends[] = 'deletable';
        }
    }

    /**
     * Override in model to define relation and condition delete dependencies.
     *
     * @return array<int, DeleteDependency>
     */
    public function deleteDependencies(): array
    {
        return [];
    }

    /**
     * Check if the model has any blocking relation or flag rule dependencies.
     */
    public function hasDependencies(): bool
    {
        return !empty($this->getAllBlockingRelations()) || $this->hasDeleteFlagBlocks();
    }

    /**
     * Get the first blocking relation dependency.
     */
    public function getBlockingRelation(): ?DeleteDependency
    {
        $all = $this->getAllBlockingRelations();
        return $all[0] ?? null;
    }

    /**
     * Get all blocking relation dependencies.
     *
     * @return array<int, DeleteDependency>
     */
    public function getAllBlockingRelations(): array
    {
        $blocking = [];

        foreach ($this->deleteDependencies() as $dep) {
            if (!$dep instanceof DeleteDependency || $dep->getType() !== DeleteDependency::TYPE_RELATION) {
                continue;
            }

            $rel = $dep->getRelationName();
            if ($rel && method_exists($this, $rel)) {
                $exists = $this->{$rel}()->exists();
                if ($exists) {
                    $blocking[] = $dep;
                }
            }
        }

        return $blocking;
    }

    /**
     * Check if any condition/flag rule blocks deletion.
     */
    public function hasDeleteFlagBlocks(): bool
    {
        return !empty($this->getAllBlockingFlagRules());
    }

    /**
     * Get the first blocking flag/condition rule.
     */
    public function getBlockingFlagRule(): ?DeleteDependency
    {
        $all = $this->getAllBlockingFlagRules();
        return $all[0] ?? null;
    }

    /**
     * Get all blocking condition/flag rules.
     * Note: condition closure/boolean returns true when deletion IS allowed (e.g. fn() => !$this->is_locked),
     * so when it evaluates to false, deletion is blocked.
     *
     * @return array<int, DeleteDependency>
     */
    public function getAllBlockingFlagRules(): array
    {
        $blocking = [];

        foreach ($this->deleteDependencies() as $dep) {
            if (!$dep instanceof DeleteDependency || $dep->getType() !== DeleteDependency::TYPE_CONDITION) {
                continue;
            }

            $rule = $dep->getConditionRule();
            $canDelete = is_callable($rule) ? (bool) $rule($this) : (bool) $rule;

            if (!$canDelete) {
                $blocking[] = $dep;
            }
        }

        return $blocking;
    }

    /**
     * Get all translated labels of blocking dependencies (relations first, then flag rules).
     *
     * @return array<int, string>
     */
    public function getAllBlockingLabels(): array
    {
        $deps = array_merge($this->getAllBlockingRelations(), $this->getAllBlockingFlagRules());

        return array_values(array_filter(array_map(
            fn (DeleteDependency $dep) => $dep->getLabel(),
            $deps
        )));
    }

    /**
     * Get formatted delete error message based on mode (FIRST, ALL, GENERAL) or null if deletable.
     */
    public function getDeleteErrorMessage(?DeleteDependencyMode $mode = null): ?string
    {
        $labels = $this->getAllBlockingLabels();
        if (empty($labels)) {
            return null;
        }

        if ($mode === null) {
            $cfgMode = config('core.delete_dependency.default_mode', config('abolframe.delete_dependency.default_mode', 'general'));
            $mode = match (strtolower((string) $cfgMode)) {
                'first' => DeleteDependencyMode::FIRST,
                'all' => DeleteDependencyMode::ALL,
                default => DeleteDependencyMode::GENERAL,
            };
        }

        if ($mode === DeleteDependencyMode::FIRST) {
            return sprintf('امکان حذف این رکورد به دلیل وابستگی در «%s» وجود ندارد.', $labels[0]);
        }

        if ($mode === DeleteDependencyMode::ALL) {
            return sprintf('امکان حذف این رکورد به دلیل وابستگی در «%s» وجود ندارد.', implode('، ', $labels));
        }

        $generalKey = config(
            'core.delete_dependency.general_message',
            config('abolframe.delete_dependency.general_message', 'امکان حذف این رکورد به دلیل وجود وابستگی وجود ندارد.')
        );

        return __($generalKey);
    }

    /**
     * Alias for getDeleteErrorMessage().
     */
    public function deletionBlockMessage(?DeleteDependencyMode $mode = null): ?string
    {
        return $this->getDeleteErrorMessage($mode);
    }

    /**
     * Throw DeletionGuardException if record cannot be deleted.
     */
    public function canBeDeleteOrFail(?DeleteDependencyMode $mode = null): void
    {
        if ($message = $this->getDeleteErrorMessage($mode)) {
            throw new DeletionGuardException($message);
        }
    }

    /**
     * Accessor for $model->deletable returning DeletableState.
     */
    public function getDeletableAttribute(): DeletableState
    {
        $msg = $this->getDeleteErrorMessage();
        return new DeletableState($msg === null, $msg);
    }
}
