<?php

namespace MyLaravelCore\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static \MyLaravelCore\Support\DataProvider\DataProvider source(mixed $source)
 * @see \MyLaravelCore\Support\DataProvider\DataProvider
 */
class DataProvider extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return \MyLaravelCore\Support\DataProvider\DataProvider::class;
    }
}
