<?php

namespace MyLaravelCore\Support\Generators\Section;

use Closure;

class Section
{
    protected string $id;
    protected string $label = '';
    protected ?string $routeName = null;
    protected array $routeParameters = [];
    protected array $childRoutes = [];
    protected ?string $icon = null;
    protected mixed $badge = null;
    protected bool|Closure $visibility = true;
    protected ?string $permission = null;
    protected bool|Closure $disabled = false;
    protected ?string $disabledTooltip = null;
    protected ?string $tooltip = null;
    protected ?string $tab = null;

    public function __construct(string $id)
    {
        $this->id = $id;
    }

    public static function make(string $id): self
    {
        return new self($id);
    }

    public function label(string $label): self
    {
        $this->label = $label;
        return $this;
    }

    public function routeName(string $routeName): self
    {
        $this->routeName = $routeName;
        return $this;
    }

    public function routeParameters(array $params): self
    {
        $this->routeParameters = $params;
        return $this;
    }

    public function childRoutes(array $routes): self
    {
        $this->childRoutes = $routes;
        return $this;
    }

    public function icon(?string $icon): self
    {
        $this->icon = $icon;
        return $this;
    }

    public function badge(int|string|callable|null $badge): self
    {
        $this->badge = $badge;
        return $this;
    }

    public function visibility(bool|Closure $visibility): self
    {
        $this->visibility = $visibility;
        return $this;
    }

    public function permission(?string $permission): self
    {
        $this->permission = $permission;
        return $this;
    }

    public function activate(): self
    {
        return $this;
    }

    public function disabled(bool|Closure|null $disabled = true): self
    {
        $this->disabled = $disabled ?? false;
        return $this;
    }

    public function disabledTooltip(?string $tooltip): self
    {
        $this->disabledTooltip = $tooltip;
        return $this;
    }

    public function tooltip(?string $tooltip): self
    {
        $this->tooltip = $tooltip;
        return $this;
    }

    public function tab(string $tabId): self
    {
        $this->tab = $tabId;
        return $this;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getLabel(): string
    {
        return $this->label;
    }

    public function getRouteName(): ?string
    {
        return $this->routeName;
    }

    public function getRouteParameters(): array
    {
        return $this->routeParameters;
    }

    public function getChildRoutes(): array
    {
        return $this->childRoutes;
    }

    public function getIcon(): ?string
    {
        return $this->icon;
    }

    public function getBadgeValue(): int|string|null
    {
        return is_callable($this->badge) ? ($this->badge)() : $this->badge;
    }

    public function isVisible(): bool
    {
        return is_callable($this->visibility) ? (bool) ($this->visibility)() : $this->visibility;
    }

    public function isDisabled(): bool
    {
        return is_callable($this->disabled) ? (bool) ($this->disabled)() : $this->disabled;
    }
}