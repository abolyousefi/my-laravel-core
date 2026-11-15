<?php

namespace MyLaravelCore\Facades;

use Illuminate\Support\Facades\Facade;
use MyLaravelCore\Services\Payment\PaymentManager;

class Payment extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return PaymentManager::class;
    }
}
