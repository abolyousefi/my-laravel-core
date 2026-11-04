<?php

namespace MyLaravelCore\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

trait HasAuditSupport
{
    public function index(Request $request, mixed $entity): JsonResponse
    {
        return response()->json([
            'code' => 1,
            'message' => null,
            'data' => [],
            'meta' => [
                'pagination' => [
                    'page' => (int) $request->query('page', 1),
                    'pageSize' => (int) $request->query('per_page', 20),
                    'pageCount' => 0,
                    'total' => 0,
                ],
            ],
        ])->header('Cache-Control', 'private, no-store');
    }

    public function show(Request $request, mixed $entity, mixed $log): JsonResponse
    {
        return response()->json([
            'code' => 1,
            'message' => null,
            'data' => [
                'event' => [],
                'old_values' => [],
                'new_values' => [],
            ],
        ])->header('Cache-Control', 'private, no-store');
    }
}