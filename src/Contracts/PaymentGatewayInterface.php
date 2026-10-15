<?php

namespace MyLaravelCore\Contracts;

interface PaymentGatewayInterface
{
    /**
     * Set payment amount (in Iranian Rial or Toman according to config).
     */
    public function amount(int|float $amount): static;

    /**
     * Set callback URL after gateway redirect.
     */
    public function callbackUrl(string $url): static;

    /**
     * Set payment description.
     */
    public function description(string $description): static;

    /**
     * Set payer mobile or email.
     */
    public function payer(string $mobile, ?string $email = null): static;

    /**
     * Request a payment token / authority and get the redirect URL.
     *
     * @return array{authority: string, redirect_url: string, raw_response: mixed}
     */
    public function request(): array;

    /**
     * Verify payment upon return from the gateway.
     *
     * @param string $authority
     * @param int|float|null $expectedAmount
     * @return array{success: bool, ref_id: string|null, message: string, card_pan: string|null, raw_response: mixed}
     */
    public function verify(string $authority, int|float|null $expectedAmount = null): array;
}
