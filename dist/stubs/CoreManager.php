<?php

namespace MyLaravelCore;

/**
 * Stub definition for CoreManager.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class CoreManager
{
    /**
     * uploader signature.
     */
    public function uploader(): MyLaravelCore\Contracts\UploaderInterface {
        // Protected implementation
    }

    /**
     * payment signature.
     */
    public function payment(?string $gateway = null): MyLaravelCore\Contracts\PaymentGatewayInterface {
        // Protected implementation
    }

    /**
     * sms signature.
     */
    public function sms(?string $driver = null): MyLaravelCore\Contracts\SmsDriverInterface {
        // Protected implementation
    }

    /**
     * api signature.
     */
    public function api(): MyLaravelCore\Services\ApiResponse {
        // Protected implementation
    }

    /**
     * jdate signature.
     */
    public function jdate(
        string $format = 'Y/m/d H:i',
        mixed $timestamp = null,
        bool $persianDigits = true
    ): string {
        // Protected implementation
    }

    /**
     * toman signature.
     */
    public function toman(mixed $amount, bool $persianDigits = true): string {
        // Protected implementation
    }

    /**
     * rial signature.
     */
    public function rial(mixed $amount, bool $persianDigits = true): string {
        // Protected implementation
    }

    /**
     * persianDigits signature.
     */
    public function persianDigits(mixed $value): string {
        // Protected implementation
    }

    /**
     * englishDigits signature.
     */
    public function englishDigits(mixed $value): string {
        // Protected implementation
    }

}
