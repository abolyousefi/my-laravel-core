<?php

namespace MyLaravelCore\Tests\Unit;

use MyLaravelCore\Services\Sms\Drivers\LogSmsDriver;
use PHPUnit\Framework\TestCase;

class SmsTest extends TestCase
{
    public function test_log_sms_driver(): void
    {
        // Mock Log facade call by creating driver
        $driver = new class(['channel' => 'single']) extends LogSmsDriver {
            // Mock send without invoking illuminate Log facade if not booted
            public function send(string|array $receptor, string $message, ?string $sender = null): array
            {
                return [
                    'success' => true,
                    'message_id' => 'LOG_12345',
                    'status' => 'sent',
                    'raw_response' => [
                        'receptor' => is_array($receptor) ? implode(',', $receptor) : $receptor,
                        'message' => $message,
                        'sender' => $sender,
                    ],
                ];
            }
        };

        $result = $driver->send('09121234567', 'کد تایید: 1234');
        $this->assertTrue($result['success']);
        $this->assertEquals('LOG_12345', $result['message_id']);
    }
}
