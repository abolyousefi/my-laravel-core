<?php

namespace MyLaravelCore\Services\Payment\Drivers;

use Illuminate\Support\Facades\Http;
use RuntimeException;

class ZarinpalDriver extends AbstractPaymentDriver
{
    protected string $baseUrl;
    protected string $gateUrl;

    public function __construct(array $config = [])
    {
        parent::__construct($config);
        $sandbox = $config['sandbox'] ?? false;
        $this->baseUrl = $sandbox ? 'https://sandbox.zarinpal.com/pg/v4/payment/' : 'https://api.zarinpal.com/pg/v4/payment/';
        $this->gateUrl = $sandbox ? 'https://sandbox.zarinpal.com/pg/StartPay/' : 'https://www.zarinpal.com/pg/StartPay/';
    }

    public function request(): array
    {
        $merchantId = $this->config['merchant_id'] ?? '';
        $currency = config('core.payment.currency', 'IRT');
        // Zarinpal v4 expects amount in Rial (IRR) or Toman (IRT)
        $payload = [
            'merchant_id' => $merchantId,
            'amount' => (int) $this->amount,
            'currency' => $currency,
            'description' => $this->description ?: 'Payment Request',
            'callback_url' => $this->callbackUrl,
            'metadata' => array_filter([
                'mobile' => $this->mobile,
                'email' => $this->email,
            ]),
        ];

        $response = Http::asJson()->post($this->baseUrl . 'request.json', $payload);
        $result = $response->json();

        if (isset($result['data']['code']) && $result['data']['code'] == 100) {
            $authority = $result['data']['authority'];
            return [
                'authority' => $authority,
                'redirect_url' => $this->gateUrl . $authority,
                'raw_response' => $result,
            ];
        }

        $errorMsg = $result['errors']['message'] ?? 'خطا در ارتباط با درگاه زرین‌پال.';
        throw new RuntimeException($errorMsg);
    }

    public function verify(string $authority, int|float|null $expectedAmount = null): array
    {
        $merchantId = $this->config['merchant_id'] ?? '';
        $amount = (int) ($expectedAmount ?? $this->amount);

        $payload = [
            'merchant_id' => $merchantId,
            'amount' => $amount,
            'authority' => $authority,
        ];

        $response = Http::asJson()->post($this->baseUrl . 'verify.json', $payload);
        $result = $response->json();

        $code = $result['data']['code'] ?? null;
        $success = in_array($code, [100, 101]);

        return [
            'success' => $success,
            'ref_id' => isset($result['data']['ref_id']) ? (string) $result['data']['ref_id'] : null,
            'message' => $success ? 'تراکنش با موفقیت تأیید شد.' : ($result['errors']['message'] ?? 'پرداخت ناموفق بود.'),
            'card_pan' => $result['data']['card_pan'] ?? null,
            'raw_response' => $result,
        ];
    }
}
