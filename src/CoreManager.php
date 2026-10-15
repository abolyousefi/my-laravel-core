<?php

namespace MyLaravelCore;

use MyLaravelCore\Contracts\PaymentGatewayInterface;
use MyLaravelCore\Contracts\SmsDriverInterface;
use MyLaravelCore\Contracts\UploaderInterface;
use MyLaravelCore\Services\ApiResponse;
use MyLaravelCore\Services\Payment\PaymentManager;
use MyLaravelCore\Services\Sms\SmsManager;
use MyLaravelCore\Services\UploaderService;

class CoreManager
{
    public function uploader(): UploaderInterface
    {
        return app(UploaderService::class);
    }

    public function payment(?string $gateway = null): PaymentGatewayInterface
    {
        return app(PaymentManager::class)->via($gateway);
    }

    public function sms(?string $driver = null): SmsDriverInterface
    {
        return app(SmsManager::class)->via($driver);
    }

    public function api(): ApiResponse
    {
        return app(ApiResponse::class);
    }

    public function jdate(string $format = 'Y/m/d H:i', mixed $timestamp = null, bool $persianDigits = true): string
    {
        return jdate($format, $timestamp, $persianDigits);
    }

    public function toman(mixed $amount, bool $persianDigits = true): string
    {
        return toman($amount, $persianDigits);
    }

    public function rial(mixed $amount, bool $persianDigits = true): string
    {
        return rial($amount, $persianDigits);
    }

    public function persianDigits(mixed $value): string
    {
        return persian_digits($value);
    }

    public function englishDigits(mixed $value): string
    {
        return english_digits($value);
    }
}
