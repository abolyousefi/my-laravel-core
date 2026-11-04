<?php

namespace MyLaravelCore\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pipeline\Pipeline;
use Illuminate\Support\Str;

trait CustomFilterable
{
    /**
     * Apply custom filter methods (filter{StudlyName}) sequentially via Pipeline
     * for non-null query string parameters.
     */
    public function scopeCustomFilter(Builder $query, string ...$filters): Builder
    {
        $pipes = [];

        foreach ($filters as $filter) {
            $method = 'filter' . Str::studly($filter);
            $value = request($filter);

            if ($value !== null && $value !== '' && method_exists($this, $method)) {
                $pipes[] = function (Builder $builder, \Closure $next) use ($method, $value) {
                    $result = $this->{$method}($builder, $value);
                    return $next($result instanceof Builder ? $result : $builder);
                };
            }
        }

        if (empty($pipes)) {
            return $query;
        }

        return app(Pipeline::class)
            ->send($query)
            ->through($pipes)
            ->thenReturn();
    }
}
