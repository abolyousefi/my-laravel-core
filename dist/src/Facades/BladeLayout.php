<?php

namespace MyLaravelCore\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static mixed table(string|object|null $class = null)
 * @method static mixed tab(string|object|null $class = null, string $name = 'default')
 * @method static mixed section(string|object|null $class = null)
 * @method static mixed banner(string|object|null $class = null)
 * @method static mixed filter(string|object|null $class = null)
 * @method static mixed audit(string|object|null $class = null)
 * @method static bool exists(string $type, string $name = 'default')
 * @method static mixed data(array|string|null $key = null, mixed $value = null)
 * @method static void setTableFilters(string $table, ?string $routeName = null, array $filters = [])
 * @method static void clearTableFilters(string $table, ?string $routeName = null)
 * @method static void addAdditionalBlades(string|array $views)
 * @method static void clearAdditionalBlades()
 * @method static \MyLaravelCore\Support\BladeLayout\NavbarBadgeManager navbarBadges()
 * @method static \MyLaravelCore\Support\BladeLayout\NavbarSubtitleManager navbarUserMenuSubtitleManager()
 * @see \MyLaravelCore\Support\BladeLayout\BladeLayoutManager
 */
class BladeLayout extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return \MyLaravelCore\Support\BladeLayout\BladeLayoutManager::class;
    }
}