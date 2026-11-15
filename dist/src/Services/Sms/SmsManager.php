<?php

namespace MyLaravelCore\Services\Sms;

use InvalidArgumentException;
use MyLaravelCore\Contracts\SmsDriverInterface;
use MyLaravelCore\Services\Sms\Drivers\KavenegarDriver;
use MyLaravelCore\Services\Sms\Drivers\LogSmsDriver;

class SmsManager
{
    protected array $drivers = [];

    /**
     * Get SMS driver instance.
     */
    public function via(?string $name = null): SmsDriverInterface
    {
        $name = $name ?: config('core.sms.default', 'log');

        if (!isset($this->drivers[$name])) {
            $this->drivers[$name] = $this->createDriver($name);
        }

        return $this->drivers[$name];
    }

    /**
     * Create driver instance.
     */
    protected function createDriver(string $name): SmsDriverInterface
    {
        $config = config("core.sms.providers.{$name}", []);

        return match ($name) {
            'kavenegar' => new KavenegarDriver($config),
            'log' => new LogSmsDriver($config),
            default => throw new InvalidArgumentException("Unsupported SMS driver: {$name}"),
        };
    }

    /**
     * Forward calls to default driver.
     */
    public function __call(string $method, array $parameters): mixed
    {
        return $this->via()->{$method}(...$parameters);
    }
}
