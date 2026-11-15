<?php

namespace MyLaravelCore\Traits;

use Illuminate\Database\Eloquent\Builder;

trait HasStatus
{
    /**
     * Check if model status is active (1, true, or 'active').
     */
    public function isActive(): bool
    {
        $status = $this->getStatusValue();
        return $status === 1 || $status === true || $status === 'active' || $status === '1';
    }

    /**
     * Check if model status matches given value.
     */
    public function isStatus(mixed $status): bool
    {
        return $this->getStatusValue() == $status;
    }

    /**
     * Get the current status column value.
     */
    public function getStatusValue(): mixed
    {
        $column = $this->getStatusColumnName();
        return $this->{$column} ?? null;
    }

    /**
     * Name of status column.
     */
    public function getStatusColumnName(): string
    {
        return property_exists($this, 'statusColumn') ? $this->statusColumn : 'status';
    }

    /**
     * Activate the model.
     */
    public function activate(): bool
    {
        $column = $this->getStatusColumnName();
        $this->{$column} = is_numeric($this->{$column} ?? 1) ? 1 : 'active';
        return $this->save();
    }

    /**
     * Deactivate the model.
     */
    public function deactivate(): bool
    {
        $column = $this->getStatusColumnName();
        $this->{$column} = is_numeric($this->{$column} ?? 0) ? 0 : 'inactive';
        return $this->save();
    }

    /**
     * Toggle active/inactive status.
     */
    public function toggleStatus(): bool
    {
        return $this->isActive() ? $this->deactivate() : $this->activate();
    }

    /**
     * Scope query to active models.
     */
    public function scopeActive(Builder $query): Builder
    {
        $column = $this->getStatusColumnName();
        return $query->where(function ($q) use ($column) {
            $q->where($column, 1)->orWhere($column, 'active')->orWhere($column, true);
        });
    }

    /**
     * Scope query to inactive models.
     */
    public function scopeInactive(Builder $query): Builder
    {
        $column = $this->getStatusColumnName();
        return $query->where(function ($q) use ($column) {
            $q->where($column, 0)->orWhere($column, 'inactive')->orWhere($column, false);
        });
    }

    /**
     * Scope query by specific status.
     */
    public function scopeStatus(Builder $query, mixed $status): Builder
    {
        return $query->where($this->getStatusColumnName(), $status);
    }
}
