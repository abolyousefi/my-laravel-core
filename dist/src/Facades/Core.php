<?php

namespace MyLaravelCore\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static \MyLaravelCore\Contracts\UploaderInterface uploader()
 * @method static \MyLaravelCore\Contracts\PaymentGatewayInterface payment(?string $gateway = null)
 * @method static \MyLaravelCore\Contracts\SmsDriverInterface sms(?string $driver = null)
 * @method static \MyLaravelCore\Services\ApiResponse api()
 * @method static string jdate(string $format = 'Y/m/d H:i', mixed $timestamp = null, bool $persianDigits = true)
 * @method static string toman(mixed $amount, bool $persianDigits = true)
 * @method static string rial(mixed $amount, bool $persianDigits = true)
 * @method static string persianDigits(mixed $value)
 * @method static string englishDigits(mixed $value)
 *
 * @see \MyLaravelCore\CoreManager
 */
class Core extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return \MyLaravelCore\CoreManager::class;
    }
}
