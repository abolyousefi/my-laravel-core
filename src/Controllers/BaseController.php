<?php

namespace MyLaravelCore\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\View;
use MyLaravelCore\Services\ApiResponse;
use MyLaravelCore\Services\Payment\PaymentManager;
use MyLaravelCore\Services\Sms\SmsManager;
use MyLaravelCore\Services\UploaderService;
use MyLaravelCore\Traits\ApiResponseTrait;

abstract class BaseController extends Controller
{
    use AuthorizesRequests, ValidatesRequests, ApiResponseTrait;

    /**
     * Breadcrumbs items for current request.
     *
     * @var array<array{title: string, url: ?string, icon: ?string}>
     */
    protected array $breadcrumbs = [];

    /**
     * Page title.
     */
    protected string $pageTitle = '';

    public function __construct()
    {
        // Share breadcrumbs and page title with views
        View::composer('*', function ($view) {
            $view->with('breadcrumbs', $this->breadcrumbs);
            $view->with('pageTitle', $this->pageTitle);
        });
    }

    /**
     * Add breadcrumb step.
     */
    protected function addBreadcrumb(string $title, ?string $url = null, ?string $icon = null): static
    {
        $this->breadcrumbs[] = [
            'title' => $title,
            'url' => $url,
            'icon' => $icon,
        ];

        return $this;
    }

    /**
     * Set the page title.
     */
    protected function setTitle(string $title): static
    {
        $this->pageTitle = $title;
        return $this;
    }

    /**
     * Share variables globally with views.
     */
    protected function share(string|array $key, mixed $value = null): static
    {
        View::share($key, $value);
        return $this;
    }

    /**
     * Flash a success message to session.
     */
    protected function flashSuccess(string $message): static
    {
        session()->flash('success', $message);
        return $this;
    }

    /**
     * Flash an error message to session.
     */
    protected function flashError(string $message): static
    {
        session()->flash('error', $message);
        return $this;
    }

    /**
     * Flash a warning message to session.
     */
    protected function flashWarning(string $message): static
    {
        session()->flash('warning', $message);
        return $this;
    }

    /**
     * Flash an info message to session.
     */
    protected function flashInfo(string $message): static
    {
        session()->flash('info', $message);
        return $this;
    }

    /**
     * Get Uploader service instance.
     */
    protected function uploader(): UploaderService
    {
        return app(UploaderService::class);
    }

    /**
     * Get Payment manager instance.
     */
    protected function payment(): PaymentManager
    {
        return app(PaymentManager::class);
    }

    /**
     * Get SMS manager instance.
     */
    protected function sms(): SmsManager
    {
        return app(SmsManager::class);
    }
}
