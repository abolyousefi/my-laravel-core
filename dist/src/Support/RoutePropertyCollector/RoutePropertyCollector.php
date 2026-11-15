<?php

namespace MyLaravelCore\Support\RoutePropertyCollector;

use Closure;
use Illuminate\Routing\Route as IlluminateRoute;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use MyLaravelCore\Support\Menu\MenuGroup;
use MyLaravelCore\Support\Menu\MenuSubgroup;

class RoutePropertyCollector
{
    /**
     * Metadata keyed by route object spl_object_id or route name.
     *
     * @var array<string, array<string, mixed>>
     */
    protected array $metadataByName = [];

    /**
     * Metadata attached before ->name() was chained, keyed by spl_object_id.
     *
     * @var array<int, array<string, mixed>>
     */
    protected array $pendingByObject = [];

    /**
     * Registered menu builder callbacks via AbolFrame::menu().
     *
     * @var array<int, Closure>
     */
    protected array $menuCallbacks = [];

    protected bool $filterSidebarOnly = false;

    public function setRouteMeta(IlluminateRoute $route, string $key, mixed $value): void
    {
        $id = spl_object_id($route);
        $this->pendingByObject[$id][$key] = $value;

        $name = $route->getName();
        if ($name) {
            $this->metadataByName[$name] = array_merge(
                $this->metadataByName[$name] ?? [],
                $this->pendingByObject[$id]
            );
        }
    }

    public function syncFromRouteCollection(): void
    {
        foreach (Route::getRoutes()->getRoutes() as $route) {
            $id = spl_object_id($route);
            $name = $route->getName();
            if ($name && isset($this->pendingByObject[$id])) {
                $this->metadataByName[$name] = array_merge(
                    $this->metadataByName[$name] ?? [],
                    $this->pendingByObject[$id]
                );
            }
        }
    }

    public function registerMenuCallback(Closure $callback): void
    {
        $this->menuCallbacks[] = $callback;
    }

    /**
     * @return array<string, MenuGroup|MenuSubgroup>
     */
    public function getRegisteredMenus(): array
    {
        $menus = [];
        foreach ($this->menuCallbacks as $cb) {
            $items = (array) $cb();
            foreach ($items as $item) {
                if ($item instanceof MenuGroup || $item instanceof MenuSubgroup) {
                    $menus[$item->getName()] = $item;
                    if ($item instanceof MenuGroup) {
                        foreach ($item->getSubMenus() as $sub) {
                            if ($sub instanceof MenuSubgroup || $sub instanceof MenuGroup) {
                                $menus[$sub->getName()] = $sub;
                            }
                        }
                    }
                }
            }
        }
        return $menus;
    }

    public function getRouteMeta(string $routeName): array
    {
        $this->syncFromRouteCollection();
        return $this->metadataByName[$routeName] ?? [];
    }

    public function getPageTitle(?string $routeName = null): string
    {
        $this->syncFromRouteCollection();
        $routeName = $routeName ?? Route::currentRouteName();
        if (!$routeName) {
            return (string) config('app.name', '');
        }

        if (isset($this->metadataByName[$routeName]['title'])) {
            return __((string) $this->metadataByName[$routeName]['title']);
        }

        $menus = $this->getRegisteredMenus();
        if (isset($menus[$routeName])) {
            return __($menus[$routeName]->getTitle());
        }

        $titles = (array) config('core.route_titles', []);
        if (isset($titles[$routeName])) {
            return __($titles[$routeName]);
        }

        return $routeName;
    }

    public function onlySidebar(): self
    {
        $clone = clone $this;
        $clone->filterSidebarOnly = true;
        return $clone;
    }

    public function getRoutes(): array
    {
        $this->syncFromRouteCollection();
        $out = [];

        foreach ($this->metadataByName as $name => $meta) {
            if (!empty($meta['skip_indexing'])) {
                continue;
            }
            if ($this->filterSidebarOnly && empty($meta['show_in_sidebar'])) {
                continue;
            }

            $out[$name] = array_merge([
                'name' => isset($meta['title']) ? __((string) $meta['title']) : $name,
                'slug' => $name,
                'show_in_sidebar' => (bool) ($meta['show_in_sidebar'] ?? false),
                'icon' => $meta['icon'] ?? null,
                'sort' => $meta['sort'] ?? 100,
                'permissions' => $meta['permission'] ?? $name,
                'subcategories' => [],
            ], $meta);

            if (isset($meta['dynamic_routes']) && is_callable($meta['dynamic_routes'])) {
                $out[$name]['subcategories'] = (array) call_user_func($meta['dynamic_routes']);
            }
        }

        return $out;
    }

    public function breadcrumb(?string $routeName = null): array
    {
        $this->syncFromRouteCollection();
        $routeName = $routeName ?? Route::currentRouteName();
        if (!$routeName) {
            return [];
        }

        $menus = $this->getRegisteredMenus();
        $parts = explode('.', $routeName);
        $crumbs = [];
        $acc = [];
        $level = 1;

        foreach ($parts as $idx => $part) {
            $acc[] = $part;
            $prefix = implode('.', $acc);
            $isLast = ($idx === count($parts) - 1);

            if ($isLast && isset($this->metadataByName[$routeName])) {
                $meta = $this->metadataByName[$routeName];
                $crumbs[] = [
                    'level' => $level++,
                    'name' => isset($meta['title']) ? __((string) $meta['title']) : $routeName,
                    'slug' => $routeName,
                    'show_in_sidebar' => (bool) ($meta['show_in_sidebar'] ?? false),
                    'visibility' => true,
                ];
            } elseif (isset($menus[$prefix])) {
                $crumbs[] = [
                    'level' => $level++,
                    'name' => __($menus[$prefix]->getTitle()),
                    'slug' => $prefix,
                    'show_in_sidebar' => true,
                    'visibility' => true,
                ];
            }
        }

        return $crumbs;
    }

    public function isChildOf(string $childRoute, string $parentPrefix): bool
    {
        $this->syncFromRouteCollection();
        $meta = $this->metadataByName[$childRoute] ?? [];
        if (($meta['parent_route'] ?? null) === $parentPrefix) {
            return true;
        }
        return str_starts_with($childRoute, rtrim($parentPrefix, '.') . '.');
    }

    public function isParentOf(string $parentPrefix, string $childRoute): bool
    {
        return $this->isChildOf($childRoute, $parentPrefix);
    }

    public function forgetCachedTitles(): void
    {
        Cache::forget('abolframe_route_titles');
    }

    public function forgetCachedBreadcrumb(): void
    {
        Cache::forget('abolframe_route_breadcrumbs');
    }

    public function hasCachedTitle(string $routeName): bool
    {
        $cached = Cache::get('abolframe_route_titles', []);
        return isset($cached[$routeName]);
    }
}