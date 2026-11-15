<?php

namespace MyLaravelCore\Traits;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Exceptions\PostTooLargeException;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Exceptions\InvalidSignatureException;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Validation\UnauthorizedException;
use Illuminate\Validation\ValidationException;
use MyLaravelCore\Enums\SystemMessage;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

trait ExceptionHandler
{
    /**
     * Render an exception into an HTTP response for Web or API.
     */
    public function renderUnifiedException(Request $request, Throwable $e): Response
    {
        // Pass through AJAX form-validation requests untouched
        if ($request->has('abolframe_form-validation') || $request->header('X-AbolFrame-Form-Validation')) {
            return parent::render($request, $e);
        }

        if ($request->expectsJson() || $request->is('api/*')) {
            return $this->renderAPIRequest($request, $e);
        }

        return $this->renderWebRequest($request, $e);
    }

    /**
     * Render API exception response mapped to SystemMessage codes.
     */
    protected function renderAPIRequest(Request $request, Throwable $e): JsonResponse
    {
        [$code, $status, $message, $errors] = match (true) {
            $e instanceof NotFoundHttpException => [
                SystemMessage::PAGE_NOT_FOUND, 404, $e->getMessage() ?: 'صفحه مورد نظر یافت نشد.', []
            ],
            $e instanceof ModelNotFoundException,
            $e instanceof MethodNotAllowedHttpException => [
                SystemMessage::DATA_NOT_FOUND, 404, $e->getMessage() ?: 'اطلاعات مورد نظر یافت نشد.', []
            ],
            $e instanceof ValidationException => [
                SystemMessage::BAD_DATA, 422, $e->getMessage(), $e->errors()
            ],
            $e instanceof AuthorizationException => [
                SystemMessage::FAIL, 403, $e->getMessage() ?: 'شما مجوز انجام این عملیات را ندارید.', []
            ],
            $e instanceof AuthenticationException,
            $e instanceof UnauthorizedException => [
                SystemMessage::FAIL, 401, $e->getMessage() ?: 'احراز هویت انجام نشده است.', []
            ],
            $e instanceof ThrottleRequestsException => [
                SystemMessage::FAIL, 429, 'تعداد درخواست‌ها بیش از حد مجاز است.', []
            ],
            $e instanceof PostTooLargeException => [
                SystemMessage::FAIL, 413, 'حجم اطلاعات ارسالی بیش از حد مجاز است.', []
            ],
            $e instanceof TokenMismatchException,
            $e instanceof InvalidSignatureException => [
                SystemMessage::FAIL, 400, $e->getMessage() ?: 'درخواست نامعتبر است.', []
            ],
            $e instanceof FileNotFoundException => [
                SystemMessage::FAIL, 404, 'فایل مورد نظر یافت نشد.', []
            ],
            default => [
                SystemMessage::INTERNAL_ERROR,
                500,
                config('app.debug') ? $e->getMessage() : 'Server Error',
                []
            ],
        };

        return response()->json([
            'status' => false,
            'code' => $code->value,
            'code_name' => $code->name,
            'message' => $message,
            'errors' => $errors,
        ], $status);
    }

    /**
     * Render Web exception response.
     */
    protected function renderWebRequest(Request $request, Throwable $e): Response
    {
        if ($e instanceof NotFoundHttpException || $e instanceof ModelNotFoundException) {
            if (view()->exists('panel-kit-error::404')) {
                return response()->view('panel-kit-error::404', ['exception' => $e], 404);
            }
            abort(404);
        }

        if ($e instanceof AuthorizationException) {
            if (view()->exists('panel-kit-error::403')) {
                return response()->view('panel-kit-error::403', ['exception' => $e], 403);
            }
        }

        if (!config('app.debug') && view()->exists('panel-kit-error::500')) {
            return response()->view('panel-kit-error::500', ['exception' => $e], 500);
        }

        return parent::render($request, $e);
    }
}
