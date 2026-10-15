<?php

namespace MyLaravelCore\Contracts;

interface SmsDriverInterface
{
    /**
     * Send normal SMS to one or multiple recipients.
     *
     * @param string|array<string> $receptor
     * @param string $message
     * @param string|null $sender
     * @return array{success: bool, message_id: string|null, status: string, raw_response: mixed}
     */
    public function send(string|array $receptor, string $message, ?string $sender = null): array;

    /**
     * Send OTP / verification SMS using provider template/pattern.
     *
     * @param string $receptor
     * @param string $template
     * @param array<string, mixed> $tokens
     * @return array{success: bool, message_id: string|null, status: string, raw_response: mixed}
     */
    public function sendPattern(string $receptor, string $template, array $tokens = []): array;
}
