<?php

namespace MyLaravelCore\Traits;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Facades\Auth;
use MyLaravelCore\Exceptions\SoftDeletesNotFoundOnModelException;

trait UserActivityTracking
{
    /**
     * Mapping of simple column => [relationName, existingRelationName, morphPrefix]
     *
     * @var array<string, array{0: string, 1: string, 2: string}>
     */
    protected static array $activityColumnsMap = [
        'created_by' => ['createdBy', 'existingCreatedBy', 'creatable'],
        'updated_by' => ['updatedBy', 'existingUpdatedBy', 'updatable'],
        'deleted_by' => ['deletedBy', 'existingDeletedBy', 'deletable'],
        'expired_by' => ['expiredBy', 'existingExpiredBy', 'expirable'],
        'archived_by' => ['archivedBy', 'existingArchivedBy', 'archivable'],
    ];

    /**
     * Boot UserActivityTracking trait to auto-fill created_by / updated_by on save.
     */
    public static function bootUserActivityTracking(): void
    {
        static::creating(function ($model) {
            if (!Auth::check()) {
                return;
            }
            $user = Auth::user();
            $userId = Auth::id();
            if ($model->isPolymorphicActivityColumn('created_by')) {
                $model->creatable_id = $model->creatable_id ?? $userId;
                $model->creatable_type = $model->creatable_type ?? ($user ? get_class($user) : null);
            } elseif (in_array('created_by', $model->getFillable(), true)) {
                $model->created_by = $model->created_by ?? $userId;
            }
        });

        static::updating(function ($model) {
            if (!Auth::check()) {
                return;
            }
            $user = Auth::user();
            $userId = Auth::id();
            if ($model->isPolymorphicActivityColumn('updated_by')) {
                $model->updatable_id = $userId;
                $model->updatable_type = $user ? get_class($user) : null;
            } elseif (in_array('updated_by', $model->getFillable(), true)) {
                $model->updated_by = $userId;
            }
        });
    }

    /**
     * Initialize trait: replace simple activity columns in $fillable with polymorphic pairs if configured.
     */
    public function initializeUserActivityTracking(): void
    {
        $table = $this->getTable();
        $polyTables = config('core.user_activity_polymorphic.tables', config('abolframe.user_activity_polymorphic.tables', []));

        if (!isset($polyTables[$table]) || !is_array($polyTables[$table])) {
            return;
        }

        foreach ($polyTables[$table] as $column) {
            if (!isset(static::$activityColumnsMap[$column])) {
                continue;
            }

            $morphPrefix = static::$activityColumnsMap[$column][2];
            $keyIndex = array_search($column, $this->fillable, true);
            if ($keyIndex !== false) {
                unset($this->fillable[$keyIndex]);
            }

            foreach (["{$morphPrefix}_id", "{$morphPrefix}_type"] as $polyCol) {
                if (!in_array($polyCol, $this->fillable, true)) {
                    $this->fillable[] = $polyCol;
                }
            }
        }

        $this->fillable = array_values($this->fillable);
    }

    public function isPolymorphicActivityColumn(string $column): bool
    {
        $table = $this->getTable();
        $polyTables = config('core.user_activity_polymorphic.tables', config('abolframe.user_activity_polymorphic.tables', []));

        return isset($polyTables[$table]) && in_array($column, (array) $polyTables[$table], true);
    }

    protected function resolveDefaultGuardUserModel(): string
    {
        $guard = config('auth.defaults.guard', 'web');
        $provider = config("auth.guards.{$guard}.provider", 'users');
        $modelClass = config("auth.providers.{$provider}.model")
            ?? config('core.audit.user_model', 'App\\Models\\User');

        if (class_exists($modelClass)) {
            $uses = class_uses_recursive($modelClass);
            if (!in_array(SoftDeletes::class, $uses, true) && !method_exists($modelClass, 'withTrashed')) {
                throw new SoftDeletesNotFoundOnModelException(
                    "Model [{$modelClass}] must use SoftDeletes trait to support UserActivityTracking."
                );
            }
        }

        return $modelClass;
    }

    protected function buildActivityRelationship(string $column, bool $withTrashed = true): BelongsTo|MorphTo
    {
        [, , $morphPrefix] = static::$activityColumnsMap[$column];

        if ($this->isPolymorphicActivityColumn($column) || in_array("{$morphPrefix}_id", $this->getFillable(), true)) {
            $relation = $this->morphTo($morphPrefix, "{$morphPrefix}_type", "{$morphPrefix}_id");
            return ($withTrashed && method_exists($relation, 'withTrashed')) ? $relation->withTrashed() : $relation;
        }

        $modelClass = $this->resolveDefaultGuardUserModel();
        $relation = $this->belongsTo($modelClass, $column);

        return ($withTrashed && method_exists($relation, 'withTrashed')) ? $relation->withTrashed() : $relation;
    }

    public function createdBy(): BelongsTo|MorphTo
    {
        return $this->buildActivityRelationship('created_by', true);
    }

    public function existingCreatedBy(): BelongsTo|MorphTo
    {
        return $this->buildActivityRelationship('created_by', false);
    }

    public function creatable(): MorphTo
    {
        return $this->morphTo('creatable', 'creatable_type', 'creatable_id');
    }

    public function updatedBy(): BelongsTo|MorphTo
    {
        return $this->buildActivityRelationship('updated_by', true);
    }

    public function existingUpdatedBy(): BelongsTo|MorphTo
    {
        return $this->buildActivityRelationship('updated_by', false);
    }

    public function updatable(): MorphTo
    {
        return $this->morphTo('updatable', 'updatable_type', 'updatable_id');
    }

    public function deletedBy(): BelongsTo|MorphTo
    {
        return $this->buildActivityRelationship('deleted_by', true);
    }

    public function existingDeletedBy(): BelongsTo|MorphTo
    {
        return $this->buildActivityRelationship('deleted_by', false);
    }

    public function deletable(): MorphTo
    {
        return $this->morphTo('deletable', 'deletable_type', 'deletable_id');
    }

    public function expiredBy(): BelongsTo|MorphTo
    {
        return $this->buildActivityRelationship('expired_by', true);
    }

    public function existingExpiredBy(): BelongsTo|MorphTo
    {
        return $this->buildActivityRelationship('expired_by', false);
    }

    public function expirable(): MorphTo
    {
        return $this->morphTo('expirable', 'expirable_type', 'expirable_id');
    }

    public function archivedBy(): BelongsTo|MorphTo
    {
        return $this->buildActivityRelationship('archived_by', true);
    }

    public function existingArchivedBy(): BelongsTo|MorphTo
    {
        return $this->buildActivityRelationship('archived_by', false);
    }

    public function archivable(): MorphTo
    {
        return $this->morphTo('archivable', 'archivable_type', 'archivable_id');
    }
}
