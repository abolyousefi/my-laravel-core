<?php

namespace MyLaravelCore\Support\Generators\Section;

use Illuminate\Support\Facades\Route;
use MyLaravelCore\Facades\BladeLayout;

abstract class BaseSection
{
    abstract public function sections(): array;

    public function title(): string
    {
        return 'جزئیات';
    }

    public function routeParameters(): array
    {
        return [];
    }

    public function defaultTab(): ?string
    {
        return null;
    }

    protected function extensionDefinitions(): array
    {
        return [];
    }

    public function __get(string $name): mixed
    {
        return BladeLayout::data($name);
    }

    public function render(): string
    {
        $sharedParams = $this->routeParameters();
        $currentRoute = Route::currentRouteName();
        $itemsHtml = '';

        foreach ($this->sections() as $sec) {
            if (!$sec instanceof Section || !$sec->isVisible()) {
                continue;
            }

            $rName = $sec->getRouteName();
            $params = array_merge($sharedParams, $sec->getRouteParameters());
            $href = ($rName && Route::has($rName)) ? route($rName, $params) : '#';
            $isActive = ($rName && ($currentRoute === $rName || in_array($currentRoute, $sec->getChildRoutes(), true))) ? ' active' : '';
            $isDisabled = $sec->isDisabled() ? ' disabled' : '';
            $iconHtml = $sec->getIcon() ? '<i class="' . e($sec->getIcon()) . ' me-2"></i>' : '';
            $badgeVal = $sec->getBadgeValue();
            $badgeHtml = $badgeVal !== null ? '<span class="badge bg-primary ms-auto">' . e((string) $badgeVal) . '</span>' : '';

            $itemsHtml .= sprintf(
                '<a href="%s" class="list-group-item list-group-item-action d-flex align-items-center%s%s">%s<span>%s</span>%s</a>',
                e($href),
                $isActive,
                $isDisabled,
                $iconHtml,
                e($sec->getLabel()),
                $badgeHtml
            );
        }

        if ($itemsHtml === '') {
            return '';
        }

        return '<div class="card x-section-generator mb-3"><div class="card-header fw-bold">'
            . e($this->title())
            . '</div><div class="list-group list-group-flush">'
            . $itemsHtml
            . '</div></div>';
    }
}