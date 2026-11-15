<?php

namespace MyLaravelCore\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static bool check(\Illuminate\Database\Eloquent\Model $model)
 * @method static string|null message(\Illuminate\Database\Eloquent\Model $model, ?\MyLaravelCore\Enums\DeleteDependencyMode $mode = null)
 * @method static \MyLaravelCore\Support\DeleteDependency\Services\DestroyService destroy(?string $modelClass = null)
 * @see \MyLaravelCore\Support\DeleteDependency\DeleteProtection
 */
class DeleteProtection extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return \MyLaravelCore\Support\DeleteDependency\DeleteProtection::class;
    }
}
