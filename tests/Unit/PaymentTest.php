<?php

namespace MyLaravelCore\Tests\Unit;

use MyLaravelCore\Services\Payment\Drivers\MockPaymentDriver;
use PHPUnit\Framework\TestCase;

class PaymentTest extends TestCase
{
    public function test_mock_payment_driver_request_and_verify(): void
    {
        $driver = new MockPaymentDriver(['success_by_default' => true]);

        $request = $driver->amount(50000)
            ->callbackUrl('https://example.com/callback')
            ->description('Test Order')
            ->payer('09121112233')
            ->request();

        $this->assertNotEmpty($request['authority']);
        $this->assertStringContainsString('MOCK_', $request['authority']);
        $this->assertStringContainsString('https://example.com/callback', $request['redirect_url']);

        $verify = $driver->verify($request['authority'], 50000);
        $this->assertTrue($verify['success']);
        $this->assertNotNull($verify['ref_id']);
        $this->assertEquals('603799******1234', $verify['card_pan']);
    }
}
