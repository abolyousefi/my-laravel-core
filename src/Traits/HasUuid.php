<?php

namespace MyLaravelCore\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

trait HasUuid
{
    /**
     * Initialize the trait.
     */
    public function initializeHasUuid(): void
    {
        $uuidColumn = $this->getUuidColumnName();
        if (empty($this->{$uuidColumn})) {
            $this->{$uuidColumn} = (string) Str::uuid();
        }
    }

    /**
     * Boot the trait.
     */
    protected static function bootHasUuid(): void
    {
        static::creating(function (Model $model) {
            $uuidColumn = $model->getUuidColumnName();
            if (empty($model->{$uuidColumn})) {
                $model->{$uuidColumn} = (string) Str::uuid();
            }
        });
    }

    /**
     * Name of the UUID column on the model.
     */
    public function getUuidColumnName(): string
    {
        return property_exists($this, 'uuidColumn') ? $this->uuidColumn : 'uuid';
    }

    /**
     * Scope query to find model by its UUID.
     */
    public function scopeWhereUuid(Builder $query, string $uuid): Builder
    {
        return $query->where($this->getUuidColumnName(), $uuid);
    }

    /**
     * Find a model by its UUID.
     */
    public static function findByUuid(string $uuid): ?static
    {
        return static::where((new static)->getUuidColumnName(), $uuid)->first();
    }

    /**
     * Find a model by its UUID or throw an exception.
     */
    public static function findByUuidOrFail(string $uuid): static
    {
        return static::where((new static)->getUuidColumnName(), $uuid)->firstOrFail();
    }
}
