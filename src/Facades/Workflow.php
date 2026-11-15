<?php

namespace MyLaravelCore\Facades;

use Illuminate\Support\Facades\Facade;
use MyLaravelCore\Support\Workflow\WorkflowManager;

/**
 * @method static WorkflowManager register(string|\MyLaravelCore\Support\Workflow\BaseWorkflow $nameOrWorkflow, string|\MyLaravelCore\Support\Workflow\BaseWorkflow|null $workflow = null)
 * @method static \MyLaravelCore\Support\Workflow\BaseWorkflow for(string $nameOrClass)
 * @method static bool has(string $nameOrClass)
 * @method static array all()
 *
 * @see WorkflowManager
 */
class Workflow extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return WorkflowManager::class;
    }
}
