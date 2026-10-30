<?php

namespace MyLaravelCore\Contracts;

/**
 * Stub definition for FilterableInterface.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
interface FilterableInterface
{
    /**
     * scopeFilter signature.
     */
    public function scopeFilter(Illuminate\Database\Eloquent\Builder $builder, array $filters = []): Illuminate\Database\Eloquent\Builder {
        // Protected implementation
    }

}
