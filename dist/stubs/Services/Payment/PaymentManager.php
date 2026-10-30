<?php

namespace MyLaravelCore\Services\Payment;

/**
 * Stub definition for PaymentManager.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class PaymentManager
{
    /**
     * via signature.
     */
    public function via(?string $name = null): MyLaravelCore\Contracts\PaymentGatewayInterface {
        // Protected implementation
    }

    /**
     * __call signature.
     */
    public function __call(string $method, array $parameters): mixed {
        // Protected implementation
    }

}
