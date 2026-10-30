<?php

namespace MyLaravelCore\Controllers;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use MyLaravelCore\Traits\ApiResponseTrait;

abstract class ApiController extends Controller
{
    use AuthorizesRequests, ValidatesRequests, ApiResponseTrait;

    /**
     * Respond with paginated collection.
     */
    protected function respondWithPagination(LengthAwarePaginator $paginator, string $message = 'Data retrieved successfully.'): JsonResponse
    {
        return $this->successResponse($paginator->items(), $message, 200, [
            'pagination' => [
                'total' => $paginator->total(),
                'count' => $paginator->count(),
                'per_page' => $paginator->perPage(),
                'current_page' => $paginator->currentPage(),
                'total_pages' => $paginator->lastPage(),
            ],
        ]);
    }

    /**
     * Respond with resource created (201).
     */
    protected function respondCreated(mixed $data = null, string $message = 'Resource created successfully.'): JsonResponse
    {
        return $this->createdResponse($data, $message);
    }

    /**
     * Respond with not found (404).
     */
    protected function respondNotFound(string $message = 'Resource not found.'): JsonResponse
    {
        return $this->notFoundResponse($message);
    }

    /**
     * Respond with unauthorized (401).
     */
    protected function respondUnauthorized(string $message = 'Unauthorized access.'): JsonResponse
    {
        return $this->unauthorizedResponse($message);
    }

    /**
     * Respond with forbidden (403).
     */
    protected function respondForbidden(string $message = 'Access forbidden.'): JsonResponse
    {
        return $this->forbiddenResponse($message);
    }

    /**
     * Respond with validation error (422).
     */
    protected function respondValidationError(mixed $errors, string $message = 'The given data was invalid.'): JsonResponse
    {
        return $this->validationErrorResponse($errors, $message);
    }
}
