<?php

namespace MyLaravelCore\Support\DeleteDependency;

use Illuminate\Database\Eloquent\Model;
use MyLaravelCore\Enums\DeleteDependencyMode;
use MyLaravelCore\Support\DeleteDependency\Services\DestroyService;

class DeleteProtection
{
    /**
     * Check if a model can be deleted (returns true when NO blocking dependencies exist).
     */
    public function check(Model $model): bool
    {
        if (method_exists($model, 'hasDependencies')) {
            return !$model->hasDependencies();
        }

        return true;
    }

    /**
     * Get the delete error message for a model (or null if deletable).
     */
    public function message(Model $model, ?DeleteDependencyMode $mode = null): ?string
    {
        if (method_exists($model, 'getDeleteErrorMessage')) {
            return $model->getDeleteErrorMessage($mode);
        }

        return null;
    }

    /**
     * Start a protected batch or single destroy operation.
     */
    public function destroy(?string $modelClass = null): DestroyService
    {
        return new DestroyService($modelClass);
    }
}
