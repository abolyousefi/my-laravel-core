<?php

namespace MyLaravelCore\Tests\Unit;

use MyLaravelCore\Services\ApiResponse;
use PHPUnit\Framework\TestCase;

class ApiResponseTest extends TestCase
{
    public function test_api_response_methods(): void
    {
        $api = new ApiResponse();

        $successResponse = $api->success(['id' => 1], 'Ok', 200);
        $this->assertEquals(200, $successResponse->getStatusCode());
        $data = json_decode($successResponse->getContent(), true);
        $this->assertTrue($data['success']);
        $this->assertEquals('Ok', $data['message']);
        $this->assertEquals(['id' => 1], $data['data']);

        $errorResponse = $api->error('Failed', 400, ['field' => 'Invalid']);
        $this->assertEquals(400, $errorResponse->getStatusCode());
        $errData = json_decode($errorResponse->getContent(), true);
        $this->assertFalse($errData['success']);
        $this->assertEquals('Failed', $errData['message']);
        $this->assertEquals(['field' => 'Invalid'], $errData['errors']);

        $notFound = $api->notFound('Item not found');
        $this->assertEquals(404, $notFound->getStatusCode());

        $unauthorized = $api->unauthorized();
        $this->assertEquals(401, $unauthorized->getStatusCode());

        $validation = $api->validationError(['title' => 'Required']);
        $this->assertEquals(422, $validation->getStatusCode());
    }
}
