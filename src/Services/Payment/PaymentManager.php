<?php

namespace MyLaravelCore\Services\Payment;

use InvalidArgumentException;
use MyLaravelCore\Contracts\PaymentGatewayInterface;
use MyLaravelCore\Services\Payment\Drivers\MockPaymentDriver;
use MyLaravelCore\Services\Payment\Drivers\ZarinpalDriver;

class PaymentManager
{
    protected array $drivers = [];

    /**
     * Get a payment gateway instance.
     */
    public function via(?string $name = null): PaymentGatewayInterface
    {
        $name = $name ?: config('core.payment.default', 'mock');

        if (!isset($this->drivers[$name])) {
            $this->drivers[$name] = $this->createDriver($name);
        }

        return $this->drivers[$name];
    }

    /**
     * Create driver instance.
     */
    protected function createDriver(string $name): PaymentGatewayInterface
    {
        $config = config("core.payment.gateways.{$name}", []);

        return match ($name) {
            'zarinpal' => new ZarinpalDriver($config),
            'mock' => new MockPaymentDriver($config),
            default => throw new InvalidArgumentException("Unsupported payment gateway: {$name}"),
        };
    }

    /**
     * Dynamically forward calls to the default gateway.
     */
    public function __call(string $method, array $parameters): mixed
    {
        return $this->via()->{$method}(...$parameters);
    }
}
