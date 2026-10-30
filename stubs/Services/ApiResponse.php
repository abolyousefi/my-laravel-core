<?php

namespace MyLaravelCore\Services;

/**
 * Stub definition for ApiResponse.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class ApiResponse
{
    /**
     * success signature.
     */
    public function success(
        mixed $data = null,
        string $message = 'Operation successful.',
        int $statusCode = 200,
        array $meta = []
    ): Illuminate\Http\JsonResponse {
        // Protected implementation
    }

    /**
     * created signature.
     */
    public function created(mixed $data = null, string $message = 'Resource created successfully.'): Illuminate\Http\JsonResponse {
        // Protected implementation
    }

    /**
     * error signature.
     */
    public function error(
        string $message = 'An error occurred.',
        int $statusCode = 400,
        mixed $errors = null
    ): Illuminate\Http\JsonResponse {
        // Protected implementation
    }

    /**
     * paginated signature.
     */
    public function paginated(mixed $paginator, string $message = 'Data retrieved successfully.'): Illuminate\Http\JsonResponse {
        // Protected implementation
    }

    /**
     * notFound signature.
     */
    public function notFound(string $message = 'Resource not found.'): Illuminate\Http\JsonResponse {
        // Protected implementation
    }

    /**
     * unauthorized signature.
     */
    public function unauthorized(string $message = 'Unauthorized action.'): Illuminate\Http\JsonResponse {
        // Protected implementation
    }

    /**
     * forbidden signature.
     */
    public function forbidden(string $message = 'Access forbidden.'): Illuminate\Http\JsonResponse {
        // Protected implementation
    }

    /**
     * validationError signature.
     */
    public function validationError(mixed $errors, string $message = 'Validation failed.'): Illuminate\Http\JsonResponse {
        // Protected implementation
    }

}
