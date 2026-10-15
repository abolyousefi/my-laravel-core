<?php

namespace MyLaravelCore\Providers;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use MyLaravelCore\CoreManager;
use MyLaravelCore\Services\ApiResponse;
use MyLaravelCore\Services\Payment\PaymentManager;
use MyLaravelCore\Services\Sms\SmsManager;
use MyLaravelCore\Services\UploaderService;

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

        // Design Components
        'alert' => \MyLaravelCore\Components\Design\Alert::class,
        'badge' => \MyLaravelCore\Components\Design\Badge::class,
        'banner' => \MyLaravelCore\Components\Design\Banner::class,
        'button' => \MyLaravelCore\Components\Design\Button::class,
        'dropdown-button' => \MyLaravelCore\Components\Design\DropdownButton::class,
        'card' => \MyLaravelCore\Components\Design\Card::class,
        'data-card' => \MyLaravelCore\Components\Design\DataCard::class,
        'table' => \MyLaravelCore\Components\Design\Table::class,
        'data-table' => \MyLaravelCore\Components\Design\Table::class,
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

        $this->app->alias(CoreManager::class, 'core');
    }

    public function boot(): void
    {
        $this->loadViewsFrom(__DIR__ . '/../../resources/views', 'core');

        $this->registerBladeComponents();
        $this->registerBladeDirectives();
        $this->registerPublishing();
        $this->registerCommands();
        $this->registerWorkbenchDocsRoute();
    }

    /**
     * If running in standalone package workbench/testbench, route '/' to the documentation site.
     */
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
                return 'My Laravel Core Documentation';
            });
        }
    }

    /**
     * Register UI components with standard and dual prefix.
     */
    protected function registerBladeComponents(): void
    {
        $prefix = config('core.ui.prefix', '');
        $dualPrefix = config('core.ui.dual_prefix', true);

        foreach ($this->components as $alias => $class) {
            // Register under configured prefix (e.g. <x-text-input> when prefix is '')
            Blade::component($class, $alias, $prefix);

            // If dual prefix is enabled, also register with 'core' prefix (<x-core-text-input>)
            if ($dualPrefix && $prefix !== 'core') {
                Blade::component($class, $alias, 'core');
            }
        }
    }

    /**
     * Register useful Blade helper directives.
     */
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

        Blade::directive('coreStyles', function () {
            return '<?php echo \'<link rel="stylesheet" href="\' . core_asset(\'css/core.css\') . \'">\'; ?>';
        });

        Blade::directive('coreScripts', function () {
            return '<?php echo \'<script src="\' . core_asset(\'js/core.js\') . \'"></script>\'; ?>';
        });
    }

    /**
     * Register publishing configuration, views, and assets.
     */
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

    /**
     * Register Artisan commands.
     */
    protected function registerCommands(): void
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                \MyLaravelCore\Commands\InstallCommand::class,
                \MyLaravelCore\Commands\IdeHelperCommand::class,
                \MyLaravelCore\Commands\DocsServeCommand::class,
                \MyLaravelCore\Commands\MakeCrudCommand::class,
                \MyLaravelCore\Commands\MakeServiceCommand::class,
                \MyLaravelCore\Commands\MakeTraitCommand::class,
            ]);
        }
    }
}
