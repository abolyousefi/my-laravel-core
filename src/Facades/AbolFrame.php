<?php

namespace MyLaravelCore\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static void menu(\Closure $callback)
 * @method static string|null getModel(string $key, mixed $component = null)
 * @see \MyLaravelCore\CoreManager
 */
class AbolFrame extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return \MyLaravelCore\CoreManager::class;
    }
}