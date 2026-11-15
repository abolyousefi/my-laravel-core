<?php

namespace MyLaravelCore\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static \MyLaravelCore\Support\Generators\Audit\AuditManager config(\MyLaravelCore\Support\Generators\Audit\BaseAudit|string $audit)
 * @see \MyLaravelCore\Support\Generators\Audit\AuditManager
 */
class Audit extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return \MyLaravelCore\Support\Generators\Audit\AuditManager::class;
    }
}