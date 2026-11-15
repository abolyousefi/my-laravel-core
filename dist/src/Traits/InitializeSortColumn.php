<?php

namespace MyLaravelCore\Traits;

use Illuminate\Support\Facades\Schema;

trait InitializeSortColumn
{
    public static function bootInitializeSortColumn(): void
    {
        static::creating(function ($model) {
            $sortColumn = defined(static::class . '::SORT_COLUMN') ? static::SORT_COLUMN : 'sort';

            if (!isset($model->{$sortColumn})) {
                $fillable = $model->getFillable();
                $hasSort = in_array($sortColumn, $fillable, true)
                    || Schema::hasColumn($model->getTable(), $sortColumn);

                if ($hasSort) {
                    $query = static::query();
                    if (Schema::hasColumn($model->getTable(), 'deleted_at')) {
                        $query->whereNull('deleted_at');
                    }
                    $max = (int) $query->max($sortColumn);
                    $model->{$sortColumn} = $max + 1;
                }
            }
        });
    }
}
