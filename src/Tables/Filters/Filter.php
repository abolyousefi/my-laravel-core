<?php

namespace MyLaravelCore\Tables\Filters;

use Closure;
use Illuminate\Database\Eloquent\Builder;

abstract class Filter
{
    protected string $key;
    protected string $label;
    protected ?Closure $queryCallback = null;

    public function __construct(string $key, ?string $label = null)
    {
        $this->key = $key;
        $this->label = $label ?? ucfirst(str_replace('_', ' ', $key));
    }

    public static function make(string $key, ?string $label = null): static
    {
        return new static($key, $label);
    }

    public function query(Closure $callback): static
    {
        $this->queryCallback = $callback;
        return $this;
    }

    public function getKey(): string
    {
        return $this->key;
    }

    public function getLabel(): string
    {
        return $this->label;
    }

    /**
     * Apply filter logic to Eloquent builder.
     */
    public function apply(Builder $query, mixed $value): void
    {
        if ($value === null || $value === '') {
            return;
        }

        if ($this->queryCallback) {
            ($this->queryCallback)($query, $value);
            return;
        }

        $query->where($this->key, $value);
    }

    /**
     * Render HTML input for filter.
     */
    abstract public function render(mixed $currentValue = null): string;
}
