<?php

namespace MyLaravelCore\Traits;

use Illuminate\Http\JsonResponse;
use MyLaravelCore\Services\ApiResponse;

trait ApiResponseTrait
{
    /**
     * Return successful JSON response.
     */
    protected function success(mixed $data = null, string $message = 'Operation successful.', int $statusCode = 200, array $meta = []): JsonResponse
    {
        return app(ApiResponse::class)->success($data, $message, $statusCode, $meta);
    }

    /**
     * Return created (201) JSON response.
     */
    protected function created(mixed $data = null, string $message = 'Resource created successfully.'): JsonResponse
    {
        return app(ApiResponse::class)->created($data, $message);
    }

    /**
     * Return error JSON response.
     */
    protected function error(string $message = 'An error occurred.', int $statusCode = 400, mixed $errors = null): JsonResponse
    {
        return app(ApiResponse::class)->error($message, $statusCode, $errors);
    }

    /**
     * Return paginated data JSON response.
     */
    protected function paginated(mixed $paginator, string $message = 'Data retrieved successfully.'): JsonResponse
    {
        return app(ApiResponse::class)->paginated($paginator, $message);
    }

    /**
     * Return not found (404) response.
     */
    protected function notFound(string $message = 'Resource not found.'): JsonResponse
    {
        return app(ApiResponse::class)->notFound($message);
    }

    /**
     * Return unauthorized (401) response.
     */
    protected function unauthorized(string $message = 'Unauthorized action.'): JsonResponse
    {
        return app(ApiResponse::class)->unauthorized($message);
    }

    /**
     * Return forbidden (403) response.
     */
    protected function forbidden(string $message = 'Access forbidden.'): JsonResponse
    {
        return app(ApiResponse::class)->forbidden($message);
    }

    /**
     * Return validation error (422) response.
     */
    protected function validationError(mixed $errors, string $message = 'Validation failed.'): JsonResponse
    {
        return app(ApiResponse::class)->validationError($errors, $message);
    }
}
