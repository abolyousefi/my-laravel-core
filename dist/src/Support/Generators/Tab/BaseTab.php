<?php

namespace MyLaravelCore\Support\Generators\Tab;

use Illuminate\Support\Facades\Route;
use MyLaravelCore\Facades\BladeLayout;

abstract class BaseTab
{
    protected bool $renderingDisabled = false;
    protected bool $bySection = false;
    protected string $mode = 'default';

    abstract public function tabs(): array;

    public function routeParameters(): array
    {
        return [];
    }

    public function disableRendering(bool $state = true): self
    {
        $this->renderingDisabled = $state;
        return $this;
    }

    public function layoutBySection(bool $state = true): self
    {
        $this->bySection = $state;
        return $this;
    }

    public function layoutMode(string $mode): self
    {
        $this->mode = $mode;
        return $this;
    }

    public function __get(string $name): mixed
    {
        return BladeLayout::data($name);
    }

    public function render(): string
    {
        $sharedParams = $this->routeParameters();
        $currentRoute = Route::currentRouteName();
        $html = '<ul class="nav nav-tabs mb-3 x-tab-generator" data-layout-mode="' . e($this->mode) . '">';

        foreach ($this->tabs() as $tab) {
            if (!$tab instanceof Tab) {
                continue;
            }
            if ($tab->getPermission() && function_exists('authorizer') && !authorizer()->canAccess($tab->getPermission())) {
                continue;
            }

            $params = array_merge($sharedParams, $tab->getRouteParameters());
            $rName = $tab->getRouteName();
            $href = ($rName && Route::has($rName)) ? route($rName, $params) : '#';
            $isActive = ($rName && $currentRoute === $rName) ? ' active' : '';
            $isDisabled = $tab->isDisabled() ? ' disabled' : '';

            $html .= sprintf(
                '<li class="nav-item"><a class="nav-link%s%s" href="%s">%s</a></li>',
                $isActive,
                $isDisabled,
                e($href),
                e($tab->getTitle())
            );
        }

        $html .= '</ul>';
        return $html;
    }
}