<?php

namespace MyLaravelCore\Services\Sms\Drivers;

/**
 * Stub definition for LogSmsDriver.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class LogSmsDriver implements \MyLaravelCore\Contracts\SmsDriverInterface
{
    /**
     * Constructor signature.
     */
    public function __construct(public array $config = []) {
        // Protected implementation
    }

    /**
     * send signature.
     */
    public function send(
        array|string $receptor,
        string $message,
        ?string $sender = null
    ): array {
        // Protected implementation
    }

    /**
     * sendPattern signature.
     */
    public function sendPattern(
        string $receptor,
        string $template,
        array $tokens = []
    ): array {
        // Protected implementation
    }

}
