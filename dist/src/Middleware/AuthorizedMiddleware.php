<?php

namespace MyLaravelCore\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthorizedMiddleware
{
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        if (!Auth::check()) {
            if ($request->expectsJson()) {
                return response()->json(['status' => false, 'message' => 'احراز هویت انجام نشده است.'], 401);
            }
            abort(401);
        }

        return $next($request);
    }
}