<?php

namespace MyLaravelCore\Traits;

/**
 * Stub definition for Filterable.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
trait Filterable
{
    /**
     * scopeFilter signature.
     */
    public function scopeFilter(Illuminate\Database\Eloquent\Builder $query, array $filters = []): Illuminate\Database\Eloquent\Builder {
        // Protected implementation
    }

}
