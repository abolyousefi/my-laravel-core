<?php

namespace MyLaravelCore\Support\RoutePropertyCollector;

use Closure;
use Illuminate\Routing\Route;

class RouteMacroRegistrar
{
    public static function register(): void
    {
        $macros = [
            'title' => fn (string $title) => RouteMacroRegistrar::put($this, 'title', $title),
            'showInSidebar' => fn (bool $show = true) => RouteMacroRegistrar::put($this, 'show_in_sidebar', $show),
            'icon' => fn (string $icon) => RouteMacroRegistrar::put($this, 'icon', $icon),
            'badge' => fn (mixed $value, string $variant = 'primary') => RouteMacroRegistrar::put($this, 'badge', ['value' => $value, 'variant' => $variant]),
            'permission' => fn (string|array $permission) => RouteMacroRegistrar::put($this, 'permission', $permission),
            'visibility' => fn (bool|Closure $visible) => RouteMacroRegistrar::put($this, 'visibility', $visible),
            'sort' => fn (int $sort) => RouteMacroRegistrar::put($this, 'sort', $sort),
            'parentRoute' => fn (string $parentRoute) => RouteMacroRegistrar::put($this, 'parent_route', $parentRoute),
            'appendRoutes' => fn (array $routes) => RouteMacroRegistrar::put($this, 'append_routes', $routes),
            'appendDynamicRoutes' => fn (Closure $callback) => RouteMacroRegistrar::put($this, 'dynamic_routes', $callback),
            'skipIndexing' => fn (bool $skip = true) => RouteMacroRegistrar::put($this, 'skip_indexing', $skip),
            'withoutPermission' => fn () => RouteMacroRegistrar::put($this, 'without_permission', true),
        ];

        foreach ($macros as $name => $closure) {
            if (!Route::hasMacro($name)) {
                Route::macro($name, $closure);
            }
        }
    }

    public static function put(Route $route, string $key, mixed $value): Route
    {
        app(RoutePropertyCollector::class)->setRouteMeta($route, $key, $value);
        return $route;
    }
}