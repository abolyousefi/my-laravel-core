<?php

namespace MyLaravelCore\Contracts;

/**
 * Stub definition for SmsDriverInterface.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
interface SmsDriverInterface
{
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
