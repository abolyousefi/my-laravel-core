<?php

namespace MyLaravelCore\Traits;

use Illuminate\Support\Facades\Auth;
use MyLaravelCore\Enums\IsDeleted;
use MyLaravelCore\Support\Builders\SoftDeleteBuilder;
use MyLaravelCore\Support\Scopes\SoftDeletingScope;

trait SoftDeletes
{
    /**
     * Indicates if the model is currently force deleting.
     */
    protected bool $forceDeleting = false;

    /**
     * Boot the soft deleting trait for a model.
     */
    public static function bootSoftDeletes(): void
    {
        static::addGlobalScope(new SoftDeletingScope());
    }

    /**
     * Initialize the soft deleting trait for an instance.
     */
    public function initializeSoftDeletes(): void
    {
        if (!isset($this->casts[$this->getDeletedAtColumn()])) {
            $this->casts[$this->getDeletedAtColumn()] = 'datetime';
        }

        if (!isset($this->casts[$this->getIsDeletedColumn()])) {
            $this->casts[$this->getIsDeletedColumn()] = IsDeleted::class;
        }
    }

    /**
     * Create a new Eloquent query builder for the model.
     */
    public function newEloquentBuilder($query): SoftDeleteBuilder
    {
        return new SoftDeleteBuilder($query);
    }

    /**
     * Force a hard delete on a soft deleted model.
     */
    public function forceDelete(): ?bool
    {
        $this->forceDeleting = true;

        return tap($this->delete(), function ($deleted) {
            $this->forceDeleting = false;

            if ($deleted) {
                $this->fireModelEvent('forceDeleted', false);
            }
        });
    }

    /**
     * Perform the actual delete query on this model instance.
     */
    protected function performDeleteOnModel(): void
    {
        if ($this->forceDeleting) {
            $this->setKeysForSaveQuery($this->newModelQuery())->forceDelete();
            $this->exists = false;
            return;
        }

        $this->runSoftDelete();
    }

    /**
     * Perform the actual delete query on this model instance.
     */
    protected function runSoftDelete(): void
    {
        $query = $this->setKeysForSaveQuery($this->newModelQuery());

        $time = $this->freshTimestamp();

        $columns = [
            $this->getDeletedAtColumn() => $this->fromDateTime($time),
            $this->getIsDeletedColumn() => IsDeleted::YES->value,
        ];

        $this->{$this->getDeletedAtColumn()} = $time;
        $this->{$this->getIsDeletedColumn()} = IsDeleted::YES;

        // Track user who performed deletion if authenticated
        if (Auth::check()) {
            $user = Auth::user();
            $userId = Auth::id();
            $table = $this->getTable();
            $polyTables = config('core.user_activity_polymorphic.tables', config('abolframe.user_activity_polymorphic.tables', []));

            if (isset($polyTables[$table]) && in_array('deleted_by', (array) $polyTables[$table], true)) {
                $columns['deletable_id'] = $userId;
                $columns['deletable_type'] = $user ? get_class($user) : null;
                $this->deletable_id = $userId;
                $this->deletable_type = $user ? get_class($user) : null;
            } else {
                $fillable = $this->getFillable();
                if (in_array('deleted_by', $fillable, true)) {
                    $columns['deleted_by'] = $userId;
                    $this->deleted_by = $userId;
                }
                if (in_array('deletable_id', $fillable, true)) {
                    $columns['deletable_id'] = $userId;
                    $this->deletable_id = $userId;
                }
                if (in_array('deletable_type', $fillable, true) && $user) {
                    $columns['deletable_type'] = get_class($user);
                    $this->deletable_type = get_class($user);
                }
            }
        }

        if ($this->usesTimestamps() && !is_null($this->getUpdatedAtColumn())) {
            $this->{$this->getUpdatedAtColumn()} = $time;
            $columns[$this->getUpdatedAtColumn()] = $this->fromDateTime($time);
        }

        $query->update($columns);

        $this->syncOriginalAttributes(array_keys($columns));

        $this->fireModelEvent('trashed', false);
    }

    /**
     * Restore a soft-deleted model instance.
     */
    public function restore(): bool
    {
        if ($this->fireModelEvent('restoring') === false) {
            return false;
        }

        $this->{$this->getDeletedAtColumn()} = null;
        $this->{$this->getIsDeletedColumn()} = IsDeleted::NO;

        $fillable = $this->getFillable();
        foreach (['deleted_by', 'deletable_id', 'deletable_type'] as $col) {
            if (in_array($col, $fillable, true) || array_key_exists($col, $this->attributes)) {
                $this->{$col} = null;
            }
        }

        $this->exists = true;

        $result = $this->save();

        $this->fireModelEvent('restored', false);

        return $result;
    }

    /**
     * Get the name of the "deleted at" column.
     */
    public function getDeletedAtColumn(): string
    {
        return defined(static::class . '::DELETED_AT') ? static::DELETED_AT : 'deleted_at';
    }

    /**
     * Get the name of the "is deleted" column.
     */
    public function getIsDeletedColumn(): string
    {
        return defined(static::class . '::IS_DELETED') ? static::IS_DELETED : 'is_deleted';
    }

    /**
     * Get the fully qualified "is deleted" column.
     */
    public function getQualifiedIsDeletedColumn(): string
    {
        return $this->qualifyColumn($this->getIsDeletedColumn());
    }

    /**
     * Determine if the model is currently force deleting.
     */
    public function isForceDeleting(): bool
    {
        return $this->forceDeleting;
    }
}
