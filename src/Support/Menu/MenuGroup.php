<?php

namespace MyLaravelCore\Support\Menu;

class MenuGroup
{
    protected string $name = '';
    protected string $title = '';
    protected int $sort = 100;
    protected ?string $icon = null;
    protected ?string $route = null;
    protected mixed $badgeValue = null;
    protected string $badgeStyle = 'primary';
    protected array $subMenus = [];

    public static function make(): self
    {
        return new self();
    }

    public function name(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function title(string $title): self
    {
        $this->title = $title;
        return $this;
    }

    public function sort(int $sort): self
    {
        $this->sort = $sort;
        return $this;
    }

    public function icon(string $icon): self
    {
        $this->icon = $icon;
        return $this;
    }

    public function route(string $route): self
    {
        $this->route = $route;
        return $this;
    }

    public function badge(mixed $value, string $style = 'primary', array $args = []): self
    {
        $this->badgeValue = is_callable($value) ? $value(...$args) : $value;
        $this->badgeStyle = $style;
        return $this;
    }

    public function subMenu(array $subMenus): self
    {
        $this->subMenus = $subMenus;
        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getSort(): int
    {
        return $this->sort;
    }

    public function getIcon(): ?string
    {
        return $this->icon;
    }

    public function getRoute(): ?string
    {
        return $this->route;
    }

    public function getSubMenus(): array
    {
        return $this->subMenus;
    }
}