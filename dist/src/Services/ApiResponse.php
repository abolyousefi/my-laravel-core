<?php

namespace MyLaravelCore\Services;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\JsonResponse;

class ApiResponse
{
    /**
     * Send success JSON response.
     */
    public function success(mixed $data = null, string $message = 'Operation successful.', int $statusCode = 200, array $meta = []): JsonResponse
    {
        $payload = [
            'success' => true,
            'message' => $message,
            'data' => $data,
        ];

        if (!empty($meta)) {
            $payload['meta'] = $meta;
        }

        return new JsonResponse($payload, $statusCode);
    }

    /**
     * Send created (201) response.
     */
    public function created(mixed $data = null, string $message = 'Resource created successfully.'): JsonResponse
    {
        return $this->success($data, $message, 201);
    }

    /**
     * Send error JSON response.
     */
    public function error(string $message = 'An error occurred.', int $statusCode = 400, mixed $errors = null): JsonResponse
    {
        $payload = [
            'success' => false,
            'message' => $message,
            'data' => null,
        ];

        if ($errors !== null) {
            $payload['errors'] = $errors;
        }

        return new JsonResponse($payload, $statusCode);
    }

    /**
     * Send paginated JSON response.
     */
    public function paginated(mixed $paginator, string $message = 'Data retrieved successfully.'): JsonResponse
    {
        if ($paginator instanceof LengthAwarePaginator) {
            $data = $paginator->items();
            $meta = [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
                'has_more_pages' => $paginator->hasMorePages(),
            ];
        } else {
            $data = $paginator;
            $meta = [];
        }

        return $this->success($data, $message, 200, $meta);
    }

    /**
     * 404 Not Found response.
     */
    public function notFound(string $message = 'Resource not found.'): JsonResponse
    {
        return $this->error($message, 404);
    }

    /**
     * 401 Unauthorized response.
     */
    public function unauthorized(string $message = 'Unauthorized action.'): JsonResponse
    {
        return $this->error($message, 401);
    }

    /**
     * 403 Forbidden response.
     */
    public function forbidden(string $message = 'Access forbidden.'): JsonResponse
    {
        return $this->error($message, 403);
    }

    /**
     * 422 Unprocessable Entity (Validation failed).
     */
    public function validationError(mixed $errors, string $message = 'Validation failed.'): JsonResponse
    {
        return $this->error($message, 422, $errors);
    }
}
