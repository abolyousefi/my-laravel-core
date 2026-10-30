<?php

namespace MyLaravelCore\Services\Payment\Drivers;

/**
 * Stub definition for ZarinpalDriver.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class ZarinpalDriver extends \MyLaravelCore\Services\Payment\Drivers\AbstractPaymentDriver implements \MyLaravelCore\Contracts\PaymentGatewayInterface
{
    /**
     * Constructor signature.
     */
    public function __construct(array $config = []) {
        // Protected implementation
    }

    /**
     * request signature.
     */
    public function request(): array {
        // Protected implementation
    }

    /**
     * verify signature.
     */
    public function verify(string $authority, int|float|null $expectedAmount = null): array {
        // Protected implementation
    }

}
