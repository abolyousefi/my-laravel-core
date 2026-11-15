<?php

namespace MyLaravelCore\Contracts;

use Illuminate\Database\Eloquent\Builder;

interface FilterableInterface
{
    /**
     * Apply request filters to the Eloquent query builder.
     *
     * @param Builder $builder
     * @param array<string, mixed> $filters
     * @return Builder
     */
    public function scopeFilter(Builder $builder, array $filters = []): Builder;
}
