<?php

namespace MyLaravelCore\Services\Payment\Drivers;

/**
 * Stub definition for AbstractPaymentDriver.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
abstract class AbstractPaymentDriver implements \MyLaravelCore\Contracts\PaymentGatewayInterface
{
    /**
     * Constructor signature.
     */
    public function __construct(array $config = []) {
        // Protected implementation
    }

    /**
     * amount signature.
     */
    public function amount(int|float $amount): static {
        // Protected implementation
    }

    /**
     * callbackUrl signature.
     */
    public function callbackUrl(string $url): static {
        // Protected implementation
    }

    /**
     * description signature.
     */
    public function description(string $description): static {
        // Protected implementation
    }

    /**
     * payer signature.
     */
    public function payer(string $mobile, ?string $email = null): static {
        // Protected implementation
    }

}
