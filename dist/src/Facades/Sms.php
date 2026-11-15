<?php

namespace MyLaravelCore\Facades;

use Illuminate\Support\Facades\Facade;
use MyLaravelCore\Services\Sms\SmsManager;

class Sms extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return SmsManager::class;
    }
}
