<?php

namespace MyLaravelCore\Contracts;

/**
 * Stub definition for PaymentGatewayInterface.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
interface PaymentGatewayInterface
{
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
