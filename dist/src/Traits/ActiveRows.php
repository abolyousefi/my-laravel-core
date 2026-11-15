<?php

namespace MyLaravelCore\Traits;

use Illuminate\Database\Eloquent\Builder;

/**
 * @deprecated Use Boolean Scopes (Model::onlyIsActive() / Model::exceptIsActive()) instead.
 */
trait ActiveRows
{
    public static function bootActiveRows(): void
    {
        static::addGlobalScope('check_for_activation', function (Builder $builder) {
            $builder->where($builder->getModel()->qualifyColumn('is_active'), 1);
        });
    }
}
