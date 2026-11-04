<?php

namespace MyLaravelCore\Providers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use MyLaravelCore\CoreManager;
use MyLaravelCore\Middleware\AuthorizedMiddleware;
use MyLaravelCore\Services\ApiResponse;
use MyLaravelCore\Services\Payment\PaymentManager;
use MyLaravelCore\Services\Sms\SmsManager;
use MyLaravelCore\Services\UploaderService;
use MyLaravelCore\Support\Auth\Authenticator;
use MyLaravelCore\Support\Auth\Authorizer;
use MyLaravelCore\Support\BladeLayout\BladeLayoutManager;
use MyLaravelCore\Support\BooleanScopes\BooleanScopeRegistrar;
use MyLaravelCore\Support\DataProvider\DataProvider;
use MyLaravelCore\Support\DeleteDependency\DeleteProtection;
use MyLaravelCore\Support\FileManager\FileManager;
use MyLaravelCore\Support\Generators\Audit\AuditManager;
use MyLaravelCore\Support\Localization\Localization;
use MyLaravelCore\Support\RoutePropertyCollector\RouteMacroRegistrar;
use MyLaravelCore\Support\RoutePropertyCollector\RoutePropertyCollector;
use MyLaravelCore\Support\Validation\JalaliValidationRegistrar;

class CoreServiceProvider extends ServiceProvider
{
    /**
     * Components mapping: component-alias => Class
     *
     * @var array<string, class-string>
     */
    protected array $components = [
        // Form Components
        'text-input' => \MyLaravelCore\Components\Form\TextInput::class,
        'textarea' => \MyLaravelCore\Components\Form\Textarea::class,
        'number-input' => \MyLaravelCore\Components\Form\NumberInput::class,
        'select-input' => \MyLaravelCore\Components\Form\SelectInput::class,
        'checkbox' => \MyLaravelCore\Components\Form\Checkbox::class,
        'checkbox-group' => \MyLaravelCore\Components\Form\CheckboxGroup::class,
        'radio-group' => \MyLaravelCore\Components\Form\RadioGroup::class,
        'datetime-picker' => \MyLaravelCore\Components\Form\DatetimePicker::class,
        'datetime-range-picker' => \MyLaravelCore\Components\Form\DatetimeRangePicker::class,
        'editor' => \MyLaravelCore\Components\Form\Editor::class,
        'file-picker' => \MyLaravelCore\Components\Form\FilePicker::class,
        'icon-picker' => \MyLaravelCore\Components\Form\IconPicker::class,
        'item-collector' => \MyLaravelCore\Components\Form\ItemCollector::class,
        'tag-collector' => \MyLaravelCore\Components\Form\TagCollector::class,
        'tag-input' => \MyLaravelCore\Components\Form\TagInput::class,
        'nested-selects' => \MyLaravelCore\Components\Form\NestedSelects::class,
        'reset-button' => \MyLaravelCore\Components\Form\ResetButton::class,

        // Design Components
        'alert' => \MyLaravelCore\Components\Design\Alert::class,
        'badge' => \MyLaravelCore\Components\Design\Badge::class,
        'banner' => \MyLaravelCore\Components\Design\Banner::class,
        'button' => \MyLaravelCore\Components\Design\Button::class,
        'dropdown-button' => \MyLaravelCore\Components\Design\DropdownButton::class,
        'card' => \MyLaravelCore\Components\Design\Card::class,
        'data-card' => \MyLaravelCore\Components\Design\DataCard::class,
        'data-display' => \MyLaravelCore\Components\Design\DataDisplay::class,
        'data-item' => \MyLaravelCore\Components\Design\DataItem::class,
        'table' => \MyLaravelCore\Components\Design\Table::class,
        'data-table' => \MyLaravelCore\Components\Design\Table::class,
        'table-view' => \MyLaravelCore\Components\Design\TableView::class,
        'file' => \MyLaravelCore\Components\Design\FileView::class,
        'icon' => \MyLaravelCore\Components\Design\Icon::class,
        'image' => \MyLaravelCore\Components\Design\ImageView::class,
        'link' => \MyLaravelCore\Components\Design\Link::class,
        'modal' => \MyLaravelCore\Components\Design\Modal::class,
        'timeline' => \MyLaravelCore\Components\Design\Timeline::class,
        'timeline.item' => \MyLaravelCore\Components\Design\TimelineItem::class,
        'timeline-item' => \MyLaravelCore\Components\Design\TimelineItem::class,
        'tooltip' => \MyLaravelCore\Components\Design\Tooltip::class,
        'accordion' => \MyLaravelCore\Components\Design\Accordion::class,
        'accordion.item' => \MyLaravelCore\Components\Design\AccordionItem::class,
        'accordion-item' => \MyLaravelCore\Components\Design\AccordionItem::class,

        // Layout Components
        'default-layout' => \MyLaravelCore\Components\Layout\DefaultLayout::class,
        'layout' => \MyLaravelCore\Components\Layout\DefaultLayout::class,
    ];

    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__ . '/../../config/core.php', 'core');

        $this->app->singleton(CoreManager::class, fn () => new CoreManager());
        $this->app->singleton(ApiResponse::class, fn () => new ApiResponse());
        $this->app->singleton(UploaderService::class, fn () => new UploaderService());
        $this->app->singleton(PaymentManager::class, fn () => new PaymentManager());
        $this->app->singleton(SmsManager::class, fn () => new SmsManager());
        $this->app->singleton(Authenticator::class, fn () => new Authenticator());
        $this->app->singleton(Authorizer::class, fn () => new Authorizer());
        $this->app->singleton(Localization::class, fn () => new Localization());
        $this->app->singleton(FileManager::class, fn () => new FileManager());
        $this->app->singleton(DataProvider::class, fn () => new DataProvider());
        $this->app->singleton(DeleteProtection::class, fn () => new DeleteProtection());
        $this->app->singleton(RoutePropertyCollector::class, fn () => new RoutePropertyCollector());
        $this->app->singleton(BladeLayoutManager::class, fn () => new BladeLayoutManager());
        $this->app->singleton(AuditManager::class, fn () => new AuditManager());

        $this->app->alias(CoreManager::class, 'core');
        $this->app->alias(CoreManager::class, 'abolframe');
    }

    public function boot(): void
    {
        BooleanScopeRegistrar::register();
        RouteMacroRegistrar::register();
        JalaliValidationRegistrar::register();
        $this->registerRedirectMacros();
        $this->registerMiddlewareAliases();

        $this->loadViewsFrom(__DIR__ . '/../../resources/views', 'core');

        $this->registerBladeComponents();
        $this->registerBladeDirectives();
        $this->registerPublishing();
        $this->registerCommands();
        $this->registerWorkbenchDocsRoute();
    }

    protected function registerRedirectMacros(): void
    {
        if (!RedirectResponse::hasMacro('withFlash')) {
            RedirectResponse::macro('withFlash', function (string $message, string $type = 'success') {
                /** @var RedirectResponse $this */
                return $this->with($type, $message)->with('flash_message', [
                    'message' => $message,
                    'type' => $type,
                ]);
            });
        }
    }

    protected function registerMiddlewareAliases(): void
    {
        if ($this->app->bound('router')) {
            /** @var Router $router */
            $router = $this->app->make('router');
            $router->aliasMiddleware('authorized', AuthorizedMiddleware::class);
        }
    }

    protected function registerWorkbenchDocsRoute(): void
    {
        if (defined('TESTBENCH_WORKING_PATH') || str_contains(base_path(), 'testbench-core')) {
            \Illuminate\Support\Facades\Route::get('/', function () {
                $docsFile = realpath(__DIR__ . '/../../docs/index.html');
                if ($docsFile && file_exists($docsFile)) {
                    return response()->file($docsFile, [
                        'Content-Type' => 'text/html; charset=UTF-8',
                    ]);
                }
                return 'AbolFrame Documentation';
            });
        }
    }

    protected function registerBladeComponents(): void
    {
        $prefix = config('core.ui.prefix', '');
        $dualPrefix = config('core.ui.dual_prefix', true);

        foreach ($this->components as $alias => $class) {
            Blade::component($class, $alias, $prefix);

            if ($dualPrefix && $prefix !== 'core') {
                Blade::component($class, $alias, 'core');
            }
        }
    }

    protected function registerBladeDirectives(): void
    {
        Blade::directive('persianDigits', function ($expression) {
            return "<?php echo persian_digits($expression); ?>";
        });

        Blade::directive('jdate', function ($expression) {
            return "<?php echo jdate($expression); ?>";
        });

        Blade::directive('toman', function ($expression) {
            return "<?php echo toman($expression); ?>";
        });

        Blade::directive('rial', function ($expression) {
            return "<?php echo rial($expression); ?>";
        });

        Blade::directive('title', function ($expression) {
            $arg = trim($expression) !== '' ? $expression : 'null';
            return "<?php echo e(getPageTitle($arg)); ?>";
        });

        Blade::if('canAccess', function (string|array $permissions, bool $onlyOne = true) {
            return authorizer()->canAccess($permissions, $onlyOne);
        });

        Blade::directive('coreStyles', function () {
            return '<?php echo \'<link rel="stylesheet" href="\' . core_asset(\'css/core.css\') . \'">\'; ?>';
        });

        Blade::directive('coreScripts', function () {
            return '<?php echo \'<script src="\' . core_asset(\'js/core.js\') . \'"></script>\'; ?>';
        });
    }

    protected function registerPublishing(): void
    {
        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/../../config/core.php' => config_path('core.php'),
            ], 'core-config');

            $this->publishes([
                __DIR__ . '/../../resources/views' => resource_path('views/vendor/core'),
            ], 'core-views');

            $this->publishes([
                __DIR__ . '/../../resources/assets' => public_path('vendor/core'),
            ], 'core-assets');
        }
    }

    protected function registerCommands(): void
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                \MyLaravelCore\Commands\InstallCommand::class,
                \MyLaravelCore\Commands\IdeHelperCommand::class,
                \MyLaravelCore\Commands\DocsServeCommand::class,
                \MyLaravelCore\Commands\StubsCommand::class,
                \MyLaravelCore\Commands\ProtectCommand::class,
                \MyLaravelCore\Commands\MakeTableCommand::class,
                \MyLaravelCore\Commands\MakeCrudCommand::class,
                \MyLaravelCore\Commands\MakeServiceCommand::class,
                \MyLaravelCore\Commands\MakeTraitCommand::class,
            ]);
        }
    }
}
