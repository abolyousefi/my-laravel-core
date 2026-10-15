<?php

namespace MyLaravelCore\Services\Sms\Drivers;

use Illuminate\Support\Facades\Http;
use MyLaravelCore\Contracts\SmsDriverInterface;

class KavenegarDriver implements SmsDriverInterface
{
    protected string $apiKey;
    protected string $sender;
    protected string $baseUrl;

    public function __construct(protected array $config = [])
    {
        $this->apiKey = $config['api_key'] ?? '';
        $this->sender = $config['sender'] ?? '';
        $this->baseUrl = "https://api.kavenegar.com/v1/{$this->apiKey}/";
    }

    public function send(string|array $receptor, string $message, ?string $sender = null): array
    {
        $receptors = is_array($receptor) ? implode(',', array_map('clean_mobile', $receptor)) : clean_mobile($receptor);
        $sender = $sender ?: $this->sender;

        $response = Http::asForm()->post($this->baseUrl . 'sms/send.json', [
            'receptor' => $receptors,
            'sender' => $sender,
            'message' => $message,
        ]);

        $result = $response->json();
        $status = $result['return']['status'] ?? 0;
        $success = ($status === 200);

        return [
            'success' => $success,
            'message_id' => isset($result['entries'][0]['messageid']) ? (string) $result['entries'][0]['messageid'] : null,
            'status' => $result['return']['message'] ?? 'unknown',
            'raw_response' => $result,
        ];
    }

    public function sendPattern(string $receptor, string $template, array $tokens = []): array
    {
        $params = [
            'receptor' => clean_mobile($receptor),
            'template' => $template,
            'token' => $tokens['token'] ?? ($tokens[0] ?? ''),
        ];

        if (isset($tokens['token2']) || isset($tokens[1])) {
            $params['token2'] = $tokens['token2'] ?? $tokens[1];
        }
        if (isset($tokens['token3']) || isset($tokens[2])) {
            $params['token3'] = $tokens['token3'] ?? $tokens[2];
        }
        if (isset($tokens['token10'])) {
            $params['token10'] = $tokens['token10'];
        }
        if (isset($tokens['token20'])) {
            $params['token20'] = $tokens['token20'];
        }

        $response = Http::asForm()->post($this->baseUrl . 'verify/lookup.json', $params);
        $result = $response->json();
        $status = $result['return']['status'] ?? 0;
        $success = ($status === 200);

        return [
            'success' => $success,
            'message_id' => isset($result['entries'][0]['messageid']) ? (string) $result['entries'][0]['messageid'] : null,
            'status' => $result['return']['message'] ?? 'unknown',
            'raw_response' => $result,
        ];
    }
}
