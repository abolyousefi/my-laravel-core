<?php

namespace MyLaravelCore\Support\Generators\Tab;

use Closure;

class Tab
{
    protected string $id;
    protected ?string $routeName = null;
    protected array $routeParameters = [];
    protected string $title = '';
    protected ?string $subTitle = null;
    protected ?string $tooltip = null;
    protected bool|Closure $disabled = false;
    protected ?string $disabledTooltip = null;
    protected ?string $permission = null;
    protected ?string $icon = null;

    public function __construct(string $id)
    {
        $this->id = $id;
    }

    public static function make(string $id): self
    {
        return new self($id);
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

    public function title(string $title): self
    {
        $this->title = $title;
        return $this;
    }

    public function subTitle(?string $subTitle): self
    {
        $this->subTitle = $subTitle;
        return $this;
    }

    public function tooltip(?string $tooltip): self
    {
        $this->tooltip = $tooltip;
        return $this;
    }

    public function disabled(bool|Closure $disabled = true): self
    {
        $this->disabled = $disabled;
        return $this;
    }

    public function disabledTooltip(?string $tooltip): self
    {
        $this->disabledTooltip = $tooltip;
        return $this;
    }

    public function permission(?string $permission): self
    {
        $this->permission = $permission;
        return $this;
    }

    public function icon(?string $icon): self
    {
        $this->icon = $icon;
        return $this;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getRouteName(): ?string
    {
        return $this->routeName;
    }

    public function getRouteParameters(): array
    {
        return $this->routeParameters;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getSubTitle(): ?string
    {
        return $this->subTitle;
    }

    public function isDisabled(): bool
    {
        return is_callable($this->disabled) ? (bool) ($this->disabled)() : $this->disabled;
    }

    public function getPermission(): ?string
    {
        return $this->permission;
    }
}