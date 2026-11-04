<?php

namespace MyLaravelCore\Support\Generators\Filter;

use Closure;

class Filter
{
    protected string $id;
    protected string $title = '';
    protected string $placeholder = '';
    protected array $items = [];
    protected bool|Closure $visibility = true;
    protected mixed $selected = null;
    protected array $onlyTabs = [];
    protected array $exceptTabs = [];
    protected ?string $dependOnParentID = null;
    protected ?string $dependOnRoute = null;

    public function __construct(string $id)
    {
        $this->id = $id;
    }

    public static function make(string $id): self
    {
        return new self($id);
    }

    public function title(string $title): self
    {
        $this->title = $title;
        return $this;
    }

    public function placeholder(string $placeholder): self
    {
        $this->placeholder = $placeholder;
        return $this;
    }

    public function items(array $items): self
    {
        $this->items = $items;
        return $this;
    }

    public function visibility(bool|Closure $visibility): self
    {
        $this->visibility = $visibility;
        return $this;
    }

    public function selected(mixed $selected): self
    {
        $this->selected = $selected;
        return $this;
    }

    public function only(array $tabs): self
    {
        $this->onlyTabs = $tabs;
        return $this;
    }

    public function except(array $tabs): self
    {
        $this->exceptTabs = $tabs;
        return $this;
    }

    public function dependOnParentID(string $parentId): self
    {
        $this->dependOnParentID = $parentId;
        return $this;
    }

    public function dependOnRoute(string $route): self
    {
        $this->dependOnRoute = $route;
        return $this;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getItems(): array
    {
        return $this->items;
    }

    public function isVisible(): bool
    {
        return is_callable($this->visibility) ? (bool) ($this->visibility)() : $this->visibility;
    }
}