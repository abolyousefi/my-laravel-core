<?php

namespace MyLaravelCore\Services\Sms\Drivers;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use MyLaravelCore\Contracts\SmsDriverInterface;

class LogSmsDriver implements SmsDriverInterface
{
    public function __construct(protected array $config = [])
    {
    }

    public function send(string|array $receptor, string $message, ?string $sender = null): array
    {
        $receptors = is_array($receptor) ? implode(',', $receptor) : $receptor;
        $messageId = 'LOG_' . Str::random(12);

        Log::channel($this->config['channel'] ?? 'stack')->info("[Core SMS] Message sent to {$receptors}: {$message}");

        return [
            'success' => true,
            'message_id' => $messageId,
            'status' => 'sent',
            'raw_response' => [
                'receptor' => $receptors,
                'message' => $message,
                'sender' => $sender,
            ],
        ];
    }

    public function sendPattern(string $receptor, string $template, array $tokens = []): array
    {
        $messageId = 'LOG_PATTERN_' . Str::random(12);
        $tokenStr = json_encode($tokens, JSON_UNESCAPED_UNICODE);

        Log::channel($this->config['channel'] ?? 'stack')->info("[Core SMS Pattern] Template {$template} sent to {$receptor} with tokens: {$tokenStr}");

        return [
            'success' => true,
            'message_id' => $messageId,
            'status' => 'sent',
            'raw_response' => [
                'receptor' => $receptor,
                'template' => $template,
                'tokens' => $tokens,
            ],
        ];
    }
}
