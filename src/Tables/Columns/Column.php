<?php

namespace MyLaravelCore\Tables\Columns;

use Closure;

abstract class Column
{
    protected string $key;
    protected string $label;
    protected bool $sortable = false;
    protected bool $searchable = false;
    protected string $align = 'right'; // right, center, left
    protected ?string $width = null;
    protected ?Closure $formatCallback = null;
    protected ?Closure $tooltipCallback = null;
    protected ?string $subtitle = null;
    protected ?Closure $subtitleCallback = null;

    public function __construct(string $key, ?string $label = null)
    {
        $this->key = $key;
        $this->label = $label ?? ucfirst(str_replace('_', ' ', $key));
    }

    public static function make(string $key, ?string $label = null): static
    {
        return new static($key, $label);
    }

    public function sortable(bool $sortable = true): static
    {
        $this->sortable = $sortable;
        return $this;
    }

    public function searchable(bool $searchable = true): static
    {
        $this->searchable = $searchable;
        return $this;
    }

    public function align(string $align): static
    {
        $this->align = $align;
        return $this;
    }

    public function alignCenter(): static
    {
        return $this->align('center');
    }

    public function alignLeft(): static
    {
        return $this->align('left');
    }

    public function width(string $width): static
    {
        $this->width = $width;
        return $this;
    }

    public function format(string|\Closure $callback): static
    {
        if ($callback instanceof \Closure) {
            $this->formatCallback = $callback;
        }
        return $this;
    }

    public function subtitle(string|Closure $subtitle): static
    {
        if ($subtitle instanceof Closure) {
            $this->subtitleCallback = $subtitle;
        } else {
            $this->subtitle = $subtitle;
        }
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

    public function isSortable(): bool
    {
        return $this->sortable;
    }

    public function isSearchable(): bool
    {
        return $this->searchable;
    }

    public function getAlign(): string
    {
        return $this->align;
    }

    public function getWidth(): ?string
    {
        return $this->width;
    }

    public function getValue(mixed $row): mixed
    {
        $val = data_get($row, $this->key);

        if ($this->formatCallback) {
            return ($this->formatCallback)($val, $row);
        }

        return $val;
    }

    public function getSubtitle(mixed $row): ?string
    {
        if ($this->subtitleCallback) {
            return ($this->subtitleCallback)($row);
        }

        return $this->subtitle;
    }

    /**
     * Render HTML string for cell.
     */
    abstract public function renderCell(mixed $row): string;
}
