<?php

namespace MyLaravelCore\Support\BooleanScopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use MyLaravelCore\Exceptions\InvalidBooleanScopeFieldsTypeException;

class BooleanScopeRegistrar
{
    /**
     * Default boolean columns automatically registered as Eloquent Builder macros.
     *
     * @var array<int, string>
     */
    public const DEFAULT_FIELDS = [
        'is_archive',
        'is_started',
        'is_start',
        'is_success',
        'is_verified',
        'is_expired',
        'is_active',
        'is_archived',
        'is_count',
        'is_default',
        'is_end',
        'is_lock',
        'is_required',
    ];

    /**
     * Register all default and configured boolean scope macros on Eloquent Builder.
     */
    public static function register(): void
    {
        $additional = config(
            'core.additional_boolean_scope_fields',
            config('abolframe.additional_boolean_scope_fields', [])
        );

        if (!is_array($additional)) {
            throw new InvalidBooleanScopeFieldsTypeException(
                'Configuration [additional_boolean_scope_fields] must be an array.'
            );
        }

        foreach ($additional as $item) {
            if (!is_string($item)) {
                throw new InvalidBooleanScopeFieldsTypeException(
                    'Configuration [additional_boolean_scope_fields] must be array of strings.'
                );
            }
        }

        $fields = array_unique(array_map(
            'strtolower',
            array_merge(self::DEFAULT_FIELDS, $additional)
        ));

        foreach ($fields as $field) {
            $studly = Str::studly($field);
            $onlyMacro = 'only' . $studly;
            $exceptMacro = 'except' . $studly;

            if (!Builder::hasGlobalMacro($onlyMacro)) {
                Builder::macro($onlyMacro, function () use ($field) {
                    /** @var Builder $this */
                    $column = $this->getModel()->qualifyColumn($field);
                    return $this->where($column, 1);
                });
            }

            if (!Builder::hasGlobalMacro($exceptMacro)) {
                Builder::macro($exceptMacro, function () use ($field) {
                    /** @var Builder $this */
                    $column = $this->getModel()->qualifyColumn($field);
                    return $this->where($column, 0);
                });
            }
        }
    }
}
