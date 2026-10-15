<?php

namespace MyLaravelCore\Services\Payment\Drivers;

use Illuminate\Support\Str;

class MockPaymentDriver extends AbstractPaymentDriver
{
    public function request(): array
    {
        $authority = 'MOCK_' . Str::upper(Str::random(16));
        $redirectUrl = $this->callbackUrl . (str_contains($this->callbackUrl, '?') ? '&' : '?') . 'Authority=' . $authority . '&Status=OK';

        return [
            'authority' => $authority,
            'redirect_url' => $redirectUrl,
            'raw_response' => [
                'status' => 'success',
                'mock' => true,
                'amount' => $this->amount,
            ],
        ];
    }

    public function verify(string $authority, int|float|null $expectedAmount = null): array
    {
        $success = $this->config['success_by_default'] ?? true;
        $refId = $success ? 'REF_' . rand(10000000, 99999999) : null;

        return [
            'success' => $success,
            'ref_id' => $refId,
            'message' => $success ? 'پرداخت آزمایشی با موفقیت انجام شد.' : 'تراکنش توسط کاربر لغو گردید.',
            'card_pan' => $success ? '603799******1234' : null,
            'raw_response' => [
                'authority' => $authority,
                'amount' => $expectedAmount ?? $this->amount,
                'mock' => true,
            ],
        ];
    }
}
