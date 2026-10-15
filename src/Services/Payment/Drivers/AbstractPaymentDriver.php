<?php

namespace MyLaravelCore\Services\Payment\Drivers;

use MyLaravelCore\Contracts\PaymentGatewayInterface;

abstract class AbstractPaymentDriver implements PaymentGatewayInterface
{
    protected int|float $amount = 0;
    protected string $callbackUrl = '';
    protected string $description = '';
    protected ?string $mobile = null;
    protected ?string $email = null;
    protected array $config = [];

    public function __construct(array $config = [])
    {
        $this->config = $config;
    }

    public function amount(int|float $amount): static
    {
        $this->amount = $amount;
        return $this;
    }

    public function callbackUrl(string $url): static
    {
        $this->callbackUrl = $url;
        return $this;
    }

    public function description(string $description): static
    {
        $this->description = $description;
        return $this;
    }

    public function payer(string $mobile, ?string $email = null): static
    {
        $this->mobile = clean_mobile($mobile);
        $this->email = $email;
        return $this;
    }
}
