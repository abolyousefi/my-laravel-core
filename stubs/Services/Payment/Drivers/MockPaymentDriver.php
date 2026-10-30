<?php

namespace MyLaravelCore\Services\Payment\Drivers;

/**
 * Stub definition for MockPaymentDriver.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class MockPaymentDriver extends \MyLaravelCore\Services\Payment\Drivers\AbstractPaymentDriver implements \MyLaravelCore\Contracts\PaymentGatewayInterface
{
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
