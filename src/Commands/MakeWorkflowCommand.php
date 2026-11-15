<?php

namespace MyLaravelCore\Commands;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Str;

class MakeWorkflowCommand extends Command
{
    protected $signature = 'core:workflow
        {domain? : نام فارسی یا انگلیسی بخش (مثال: خرید، کاربران، Purchase، User)}
        {--en= : نام انگلیسی استاندارد برای کلاس‌ها (مثال: Purchase)}
        {--statuses= : لیست وضعیت‌ها با کاما (مثال: draft,pending,approved یا draft:پیش‌نویس,approved:تاییدشده)}
        {--roles=manager,supervisor,admin : نقش‌های پیش‌فرض مجاز در قوانین گردش کار}
        {--hours=08:00-16:00 : بازه زمانی پیش‌فرض برای مشاهده و تغییر وضعیت توسط نقش مدیر}
        {--module= : نام ماژول در صورت استفاده از ساختار ماژولار}
        {--base-path= : مسیر پایه جایگزین برای تولید فایل‌ها (اختیاری)}
        {--with-migration : ساخت مایگریشن جدول ثبت تاریخچه تغییرات وضعیت (workflow_logs)}
        {--with-crud : ساخت کامل Model (با HasWorkflow)، Migration، Request، BaseTable و Controller}
        {--force : بازنویسی فایل‌های موجود}';

    protected $description = 'تولید خودکار گردش کار، وضعیت‌ها (Status Enum)، قوانین دسترسی نقش و بازه زمانی در ابول فریم (AbolFrame)';

    /**
     * Built-in Persian/English domain presets with realistic statuses & labels.
     *
     * @var array<string, array{en: string, fa: string, statuses: array<int, array{name: string, value: string, label: string, variant: string, icon: string}>}>
     */
    protected const PRESETS = [
        'خرید' => [
            'en' => 'Purchase',
            'fa' => 'خرید',
            'statuses' => [
                ['name' => 'DRAFT', 'value' => 'draft', 'label' => 'پیش‌نویس', 'variant' => 'secondary', 'icon' => 'ti-file-pencil'],
                ['name' => 'SUBMITTED', 'value' => 'submitted', 'label' => 'ثبت‌شده', 'variant' => 'info', 'icon' => 'ti-send'],
                ['name' => 'PENDING_MANAGER', 'value' => 'pending_manager', 'label' => 'در انتظار تایید مدیر', 'variant' => 'warning', 'icon' => 'ti-clock'],
                ['name' => 'FINANCE_APPROVED', 'value' => 'finance_approved', 'label' => 'تایید مالی', 'variant' => 'primary', 'icon' => 'ti-cash'],
                ['name' => 'PROCURING', 'value' => 'procuring', 'label' => 'در حال تامین و خرید', 'variant' => 'info', 'icon' => 'ti-shopping-cart'],
                ['name' => 'COMPLETED', 'value' => 'completed', 'label' => 'تکمیل و تحویل‌شده', 'variant' => 'success', 'icon' => 'ti-circle-check'],
                ['name' => 'REJECTED', 'value' => 'rejected', 'label' => 'رد شده', 'variant' => 'danger', 'icon' => 'ti-circle-x'],
            ],
        ],
        'کاربران' => [
            'en' => 'User',
            'fa' => 'کاربران',
            'statuses' => [
                ['name' => 'PENDING', 'value' => 'pending', 'label' => 'در انتظار بررسی', 'variant' => 'warning', 'icon' => 'ti-clock'],
                ['name' => 'ACTIVE', 'value' => 'active', 'label' => 'فعال', 'variant' => 'success', 'icon' => 'ti-user-check'],
                ['name' => 'SUSPENDED', 'value' => 'suspended', 'label' => 'معلق', 'variant' => 'warning', 'icon' => 'ti-user-pause'],
                ['name' => 'BANNED', 'value' => 'banned', 'label' => 'مسدود', 'variant' => 'danger', 'icon' => 'ti-user-off'],
                ['name' => 'ARCHIVED', 'value' => 'archived', 'label' => 'آرشیو شده', 'variant' => 'secondary', 'icon' => 'ti-archive'],
            ],
        ],
        'کاربر' => 'کاربران',
        'سفارش' => [
            'en' => 'Order',
            'fa' => 'سفارش',
            'statuses' => [
                ['name' => 'PENDING', 'value' => 'pending', 'label' => 'در انتظار تایید', 'variant' => 'warning', 'icon' => 'ti-clock'],
                ['name' => 'CONFIRMED', 'value' => 'confirmed', 'label' => 'تایید شده', 'variant' => 'info', 'icon' => 'ti-check'],
                ['name' => 'PREPARING', 'value' => 'preparing', 'label' => 'در حال آماده‌سازی', 'variant' => 'primary', 'icon' => 'ti-package'],
                ['name' => 'SHIPPED', 'value' => 'shipped', 'label' => 'ارسال شده', 'variant' => 'info', 'icon' => 'ti-truck'],
                ['name' => 'DELIVERED', 'value' => 'delivered', 'label' => 'تحویل داده شده', 'variant' => 'success', 'icon' => 'ti-circle-check'],
                ['name' => 'CANCELLED', 'value' => 'cancelled', 'label' => 'لغو شده', 'variant' => 'danger', 'icon' => 'ti-x'],
            ],
        ],
        'سفارشات' => 'سفارش',
        'تیکت' => [
            'en' => 'Ticket',
            'fa' => 'تیکت پشتیبانی',
            'statuses' => [
                ['name' => 'OPEN', 'value' => 'open', 'label' => 'باز', 'variant' => 'info', 'icon' => 'ti-message'],
                ['name' => 'IN_PROGRESS', 'value' => 'in_progress', 'label' => 'در حال بررسی', 'variant' => 'warning', 'icon' => 'ti-loader'],
                ['name' => 'WAITING_USER', 'value' => 'waiting_user', 'label' => 'در انتظار پاسخ کاربر', 'variant' => 'primary', 'icon' => 'ti-user-question'],
                ['name' => 'RESOLVED', 'value' => 'resolved', 'label' => 'حل شده', 'variant' => 'success', 'icon' => 'ti-circle-check'],
                ['name' => 'CLOSED', 'value' => 'closed', 'label' => 'بسته شده', 'variant' => 'secondary', 'icon' => 'ti-lock'],
            ],
        ],
        'پشتیبانی' => 'تیکت',
        'مرخصی' => [
            'en' => 'Leave',
            'fa' => 'مرخصی',
            'statuses' => [
                ['name' => 'SUBMITTED', 'value' => 'submitted', 'label' => 'ثبت شده', 'variant' => 'info', 'icon' => 'ti-send'],
                ['name' => 'MANAGER_REVIEW', 'value' => 'manager_review', 'label' => 'در انتظار بررسی مدیر', 'variant' => 'warning', 'icon' => 'ti-clock'],
                ['name' => 'APPROVED', 'value' => 'approved', 'label' => 'تایید شده', 'variant' => 'success', 'icon' => 'ti-circle-check'],
                ['name' => 'REJECTED', 'value' => 'rejected', 'label' => 'رد شده', 'variant' => 'danger', 'icon' => 'ti-circle-x'],
            ],
        ],
        'فاکتور' => [
            'en' => 'Invoice',
            'fa' => 'فاکتور',
            'statuses' => [
                ['name' => 'DRAFT', 'value' => 'draft', 'label' => 'پیش‌نویس', 'variant' => 'secondary', 'icon' => 'ti-file'],
                ['name' => 'ISSUED', 'value' => 'issued', 'label' => 'صادر شده', 'variant' => 'info', 'icon' => 'ti-file-invoice'],
                ['name' => 'PAID', 'value' => 'paid', 'label' => 'پرداخت شده', 'variant' => 'success', 'icon' => 'ti-cash'],
                ['name' => 'OVERDUE', 'value' => 'overdue', 'label' => 'سررسید گذشته', 'variant' => 'warning', 'icon' => 'ti-alert-triangle'],
                ['name' => 'CANCELLED', 'value' => 'cancelled', 'label' => 'ابطال شده', 'variant' => 'danger', 'icon' => 'ti-ban'],
            ],
        ],
        'قرارداد' => [
            'en' => 'Contract',
            'fa' => 'قرارداد',
            'statuses' => [
                ['name' => 'DRAFT', 'value' => 'draft', 'label' => 'پیش‌نویس', 'variant' => 'secondary', 'icon' => 'ti-file-pencil'],
                ['name' => 'LEGAL_REVIEW', 'value' => 'legal_review', 'label' => 'بررسی حقوقی', 'variant' => 'warning', 'icon' => 'ti-scale'],
                ['name' => 'ACTIVE', 'value' => 'active', 'label' => 'جاری و فعال', 'variant' => 'success', 'icon' => 'ti-file-check'],
                ['name' => 'EXPIRED', 'value' => 'expired', 'label' => 'منقضی شده', 'variant' => 'secondary', 'icon' => 'ti-calendar-off'],
                ['name' => 'TERMINATED', 'value' => 'terminated', 'label' => 'فسخ شده', 'variant' => 'danger', 'icon' => 'ti-file-x'],
            ],
        ],
        'درخواست' => [
            'en' => 'Request',
            'fa' => 'درخواست',
            'statuses' => [
                ['name' => 'DRAFT', 'value' => 'draft', 'label' => 'پیش‌نویس', 'variant' => 'secondary', 'icon' => 'ti-file-pencil'],
                ['name' => 'PENDING', 'value' => 'pending', 'label' => 'در انتظار بررسی', 'variant' => 'warning', 'icon' => 'ti-clock'],
                ['name' => 'APPROVED', 'value' => 'approved', 'label' => 'تایید شده', 'variant' => 'success', 'icon' => 'ti-circle-check'],
                ['name' => 'REJECTED', 'value' => 'rejected', 'label' => 'رد شده', 'variant' => 'danger', 'icon' => 'ti-circle-x'],
            ],
        ],
        'پرداخت' => [
            'en' => 'Payment',
            'fa' => 'پرداخت',
            'statuses' => [
                ['name' => 'INITIATED', 'value' => 'initiated', 'label' => 'شروع شده', 'variant' => 'secondary', 'icon' => 'ti-credit-card'],
                ['name' => 'PENDING', 'value' => 'pending', 'label' => 'در انتظار تایید بانک', 'variant' => 'warning', 'icon' => 'ti-clock'],
                ['name' => 'PAID', 'value' => 'paid', 'label' => 'موفق و پرداخت شده', 'variant' => 'success', 'icon' => 'ti-circle-check'],
                ['name' => 'FAILED', 'value' => 'failed', 'label' => 'ناموفق', 'variant' => 'danger', 'icon' => 'ti-x'],
                ['name' => 'REFUNDED', 'value' => 'refunded', 'label' => 'مسترد شده', 'variant' => 'info', 'icon' => 'ti-arrow-back-up'],
            ],
        ],
        'محصول' => [
            'en' => 'Product',
            'fa' => 'محصول',
            'statuses' => [
                ['name' => 'DRAFT', 'value' => 'draft', 'label' => 'پیش‌نویس', 'variant' => 'secondary', 'icon' => 'ti-file-pencil'],
                ['name' => 'REVIEW', 'value' => 'review', 'label' => 'در صف بازبینی', 'variant' => 'warning', 'icon' => 'ti-eye'],
                ['name' => 'PUBLISHED', 'value' => 'published', 'label' => 'منتشر شده', 'variant' => 'success', 'icon' => 'ti-check'],
                ['name' => 'ARCHIVED', 'value' => 'archived', 'label' => 'بایگانی شده', 'variant' => 'secondary', 'icon' => 'ti-archive'],
            ],
        ],
        'پروژه' => [
            'en' => 'Project',
            'fa' => 'پروژه',
            'statuses' => [
                ['name' => 'PLANNING', 'value' => 'planning', 'label' => 'برنامه‌ریزی', 'variant' => 'info', 'icon' => 'ti-compass'],
                ['name' => 'IN_PROGRESS', 'value' => 'in_progress', 'label' => 'در حال اجرا', 'variant' => 'primary', 'icon' => 'ti-settings'],
                ['name' => 'ON_HOLD', 'value' => 'on_hold', 'label' => 'متوقف شده', 'variant' => 'warning', 'icon' => 'ti-player-pause'],
                ['name' => 'COMPLETED', 'value' => 'completed', 'label' => 'تکمیل شده', 'variant' => 'success', 'icon' => 'ti-circle-check'],
            ],
        ],
    ];

    public function __construct(protected Filesystem $files)
    {
        parent::__construct();
        $this->setAliases(['make:workflow', 'make:core-workflow']);
    }

    public function handle(): int
    {
        $domainInput = $this->argument('domain');
        if (! $domainInput && $this->input->isInteractive()) {
            $domainInput = (string) $this->ask('نام بخش یا موجودیت را وارد کنید (مثال: خرید، کاربران، Purchase، Order)');
        }

        if (empty(trim((string) $domainInput))) {
            $this->components->error('لطفاً نام بخش (domain) را وارد کنید. مثال: php artisan core:workflow خرید');
            return self::FAILURE;
        }

        $resolved = $this->resolveDomainMetadata(trim((string) $domainInput));
        $statuses = $this->resolveStatuses($resolved['statuses']);
        [$hoursFrom, $hoursTo] = $this->parseHoursOption((string) $this->option('hours'));
        $roles = $this->parseRolesOption((string) $this->option('roles'));

        $module = $this->option('module') ? Str::studly((string) $this->option('module')) : null;
        $force = (bool) $this->option('force');

        $ctx = [
            'studly' => $resolved['en'],
            'camel' => Str::camel($resolved['en']),
            'snake' => Str::snake($resolved['en']),
            'pluralSnake' => Str::snake(Str::pluralStudly($resolved['en'])),
            'faTitle' => $resolved['fa'],
            'statuses' => $statuses,
            'hoursFrom' => $hoursFrom,
            'hoursTo' => $hoursTo,
            'roles' => $roles,
            'module' => $module,
            'namespaceBase' => $module ? "Modules\\{$module}" : 'App',
        ];

        $this->components->info("در حال ساخت گردش کار و وضعیت‌های بخش «{$ctx['faTitle']}» ({$ctx['studly']})...");

        $generated = [];

        $enumPath = $this->targetPath($module, "Enums/{$ctx['studly']}Status.php");
        if ($this->writeStub($enumPath, $this->buildStatusEnumStub($ctx), $force)) {
            $generated[] = $enumPath;
        }

        $workflowPath = $this->targetPath($module, "Workflows/{$ctx['studly']}Workflow.php");
        if ($this->writeStub($workflowPath, $this->buildWorkflowClassStub($ctx), $force)) {
            $generated[] = $workflowPath;
        }

        $servicePath = $this->targetPath($module, "Services/{$ctx['studly']}WorkflowService.php");
        if ($this->writeStub($servicePath, $this->buildWorkflowServiceStub($ctx), $force)) {
            $generated[] = $servicePath;
        }

        if ($this->option('with-migration') || $this->option('with-crud')) {
            $logMigrationPath = $this->migrationPath($module, "create_{$ctx['snake']}_workflow_logs_table.php");
            if ($this->writeStub($logMigrationPath, $this->buildWorkflowLogsMigrationStub($ctx), $force)) {
                $generated[] = $logMigrationPath;
            }
        }

        if ($this->option('with-crud')) {
            $crudPaths = $this->generateCrudArtifacts($ctx, $module, $force);
            $generated = array_merge($generated, $crudPaths);
        }

        $this->newLine();
        foreach ($generated as $file) {
            $this->components->twoColumnDetail('<fg=green>ایجاد/به‌روزرسانی</>', $file);
        }

        $this->newLine();
        $this->components->info('نحوه استفاده در پروژه:');
        $this->line("  1) ثبت در config/core.php یا AppServiceProvider:");
        $this->line("     <fg=cyan>\\MyLaravelCore\\Facades\\Workflow::register('{$ctx['snake']}', \\{$ctx['namespaceBase']}\\Workflows\\{$ctx['studly']}Workflow::class);</>");
        $this->line("  2) اتصال به مدل با Trait:");
        $this->line("     <fg=cyan>use \\MyLaravelCore\\Traits\\HasWorkflow;</>");
        $this->line("     <fg=cyan>protected string \$workflowClass = \\{$ctx['namespaceBase']}\\Workflows\\{$ctx['studly']}Workflow::class;</>");
        $this->line("  3) فیلتر خودکار بر اساس نقش و تایم مجاز در کوئری:");
        $this->line("     <fg=cyan>{$ctx['studly']}::visibleForWorkflow(\$user)->paginate();</>");
        $this->line("  4) تغییر وضعیت کنترل‌شده با بررسی نقش، بازه زمانی و گراف گردش کار:");
        $this->line("     <fg=cyan>\$model->transitionTo({$ctx['studly']}Status::" . ($statuses[1]['name'] ?? $statuses[0]['name']) . ", \$user, 'تایید مرحله');</>");

        return self::SUCCESS;
    }

    /**
     * @return array{en: string, fa: string, statuses: array<int, array{name: string, value: string, label: string, variant: string, icon: string}>}
     */
    protected function resolveDomainMetadata(string $domainInput): array
    {
        $normalized = trim($domainInput);
        $explicitEn = $this->option('en') ? Str::studly((string) $this->option('en')) : null;

        // Direct Persian preset match
        if (isset(self::PRESETS[$normalized])) {
            $preset = self::PRESETS[$normalized];
            if (is_string($preset)) {
                $preset = self::PRESETS[$preset];
            }

            return [
                'en' => $explicitEn ?: $preset['en'],
                'fa' => $preset['fa'],
                'statuses' => $preset['statuses'],
            ];
        }

        // Case-insensitive match against English preset name or plural
        $studlyCandidate = Str::studly($normalized);
        $singularCandidate = Str::singular($studlyCandidate);

        foreach (self::PRESETS as $preset) {
            if (is_string($preset)) {
                continue;
            }
            if (
                strcasecmp($preset['en'], $studlyCandidate) === 0 ||
                strcasecmp($preset['en'], $singularCandidate) === 0
            ) {
                return [
                    'en' => $explicitEn ?: $preset['en'],
                    'fa' => $preset['fa'],
                    'statuses' => $preset['statuses'],
                ];
            }
        }

        // Non-ASCII custom Persian domain without preset
        $isAscii = preg_match('/^[A-Za-z0-9_\-\s]+$/', $normalized) === 1;
        $enName = $explicitEn;

        if (! $enName) {
            if ($isAscii) {
                $enName = Str::studly(Str::singular($normalized));
            } elseif ($this->input->isInteractive()) {
                $asked = (string) $this->ask("نام انگلیسی کلاس‌ها برای «{$normalized}» را وارد کنید (مثال: CustomItem)", 'CustomWorkflow');
                $enName = Str::studly($asked ?: 'CustomWorkflow');
            } else {
                $slug = Str::slug($normalized);
                $enName = $slug !== '' ? Str::studly($slug) : 'CustomDomain';
            }
        }

        $faTitle = $isAscii ? $enName : $normalized;

        return [
            'en' => $enName,
            'fa' => $faTitle,
            'statuses' => [
                ['name' => 'DRAFT', 'value' => 'draft', 'label' => 'پیش‌نویس', 'variant' => 'secondary', 'icon' => 'ti-file-pencil'],
                ['name' => 'PENDING', 'value' => 'pending', 'label' => 'در انتظار بررسی', 'variant' => 'warning', 'icon' => 'ti-clock'],
                ['name' => 'APPROVED', 'value' => 'approved', 'label' => 'تایید شده', 'variant' => 'success', 'icon' => 'ti-circle-check'],
                ['name' => 'REJECTED', 'value' => 'rejected', 'label' => 'رد شده', 'variant' => 'danger', 'icon' => 'ti-circle-x'],
                ['name' => 'COMPLETED', 'value' => 'completed', 'label' => 'تکمیل شده', 'variant' => 'primary', 'icon' => 'ti-flag-check'],
            ],
        ];
    }

    /**
     * @param array<int, array{name: string, value: string, label: string, variant: string, icon: string}> $defaultStatuses
     * @return array<int, array{name: string, value: string, label: string, variant: string, icon: string}>
     */
    protected function resolveStatuses(array $defaultStatuses): array
    {
        $raw = trim((string) $this->option('statuses'));
        if ($raw === '') {
            return $defaultStatuses;
        }

        $variants = ['secondary', 'warning', 'info', 'primary', 'success', 'danger'];
        $parsed = [];

        foreach (explode(',', $raw) as $index => $chunk) {
            $chunk = trim($chunk);
            if ($chunk === '') {
                continue;
            }

            if (str_contains($chunk, ':')) {
                [$key, $label] = array_map('trim', explode(':', $chunk, 2));
            } else {
                $key = $chunk;
                $label = Str::headline($chunk);
            }

            $snake = Str::snake($key);
            if ($snake === '') {
                $snake = 'status_' . ($index + 1);
            }

            $variant = match (true) {
                str_contains($snake, 'reject') || str_contains($snake, 'cancel') || str_contains($snake, 'ban') || str_contains($snake, 'fail') => 'danger',
                str_contains($snake, 'approv') || str_contains($snake, 'complet') || str_contains($snake, 'active') || str_contains($snake, 'paid') => 'success',
                str_contains($snake, 'pend') || str_contains($snake, 'wait') || str_contains($snake, 'review') || str_contains($snake, 'suspend') => 'warning',
                default => $variants[$index % count($variants)],
            };

            $parsed[] = [
                'name' => strtoupper($snake),
                'value' => $snake,
                'label' => $label,
                'variant' => $variant,
                'icon' => 'ti-circle-dot',
            ];
        }

        return ! empty($parsed) ? $parsed : $defaultStatuses;
    }

    /**
     * @return array{0: string, 1: string}
     */
    protected function parseHoursOption(string $raw): array
    {
        $clean = function_exists('english_digits') ? english_digits(trim($raw)) : trim($raw);
        if (preg_match('/^(\d{1,2}:\d{2})\s*[-–]\s*(\d{1,2}:\d{2})$/', $clean, $m)) {
            return [$m[1], $m[2]];
        }

        return ['08:00', '16:00'];
    }

    /**
     * @return array<int, string>
     */
    protected function parseRolesOption(string $raw): array
    {
        $items = array_values(array_filter(array_map('trim', explode(',', $raw))));

        return ! empty($items) ? $items : ['manager', 'supervisor', 'admin'];
    }

    protected function targetPath(?string $module, string $relative): string
    {
        $customBase = $this->option('base-path') ? rtrim((string) $this->option('base-path'), '/\\') : null;

        if ($customBase !== null) {
            return $module
                ? "{$customBase}/Modules/{$module}/app/{$relative}"
                : "{$customBase}/app/{$relative}";
        }

        if ($module) {
            return base_path("Modules/{$module}/app/{$relative}");
        }

        return app_path($relative);
    }

    protected function migrationPath(?string $module, string $filename): string
    {
        $prefix = date('Y_m_d_His') . '_';
        $customBase = $this->option('base-path') ? rtrim((string) $this->option('base-path'), '/\\') : null;

        if ($customBase !== null) {
            return $module
                ? "{$customBase}/Modules/{$module}/database/migrations/{$prefix}{$filename}"
                : "{$customBase}/database/migrations/{$prefix}{$filename}";
        }

        if ($module) {
            return base_path("Modules/{$module}/database/migrations/{$prefix}{$filename}");
        }

        return database_path("migrations/{$prefix}{$filename}");
    }

    protected function writeStub(string $path, string $content, bool $force): bool
    {
        if ($this->files->exists($path) && ! $force) {
            $this->components->warn("فایل از قبل وجود دارد (برای بازنویسی از --force استفاده کنید): {$path}");
            return false;
        }

        $this->files->ensureDirectoryExists(dirname($path));
        $this->files->put($path, $content);

        return true;
    }

    protected function generateCrudArtifacts(array $ctx, ?string $module, bool $force): array
    {
        $generated = [];

        $modelPath = $this->targetPath($module, "Models/{$ctx['studly']}.php");
        if ($this->writeStub($modelPath, $this->buildModelStub($ctx), $force)) {
            $generated[] = $modelPath;
        }

        $migrationPath = $this->migrationPath($module, "create_{$ctx['pluralSnake']}_table.php");
        if ($this->writeStub($migrationPath, $this->buildEntityMigrationStub($ctx), $force)) {
            $generated[] = $migrationPath;
        }

        $storeRequestPath = $this->targetPath($module, "Http/Requests/{$ctx['studly']}/Store{$ctx['studly']}Request.php");
        if ($this->writeStub($storeRequestPath, $this->buildStoreRequestStub($ctx), $force)) {
            $generated[] = $storeRequestPath;
        }

        $tablePath = $this->targetPath($module, "Tables/{$ctx['studly']}Table.php");
        if ($this->writeStub($tablePath, $this->buildTableStub($ctx), $force)) {
            $generated[] = $tablePath;
        }

        $controllerPath = $this->targetPath($module, "Http/Controllers/{$ctx['studly']}Controller.php");
        if ($this->writeStub($controllerPath, $this->buildControllerStub($ctx), $force)) {
            $generated[] = $controllerPath;
        }

        return $generated;
    }

    protected function buildStatusEnumStub(array $ctx): string
    {
        $ns = "{$ctx['namespaceBase']}\\Enums";
        $class = "{$ctx['studly']}Status";

        $cases = [];
        $labels = [];
        $variants = [];
        $icons = [];

        foreach ($ctx['statuses'] as $status) {
            $cases[] = "    case {$status['name']} = '{$status['value']}';";
            $labels[] = "            self::{$status['name']} => '{$status['label']}',";
            $variants[] = "            self::{$status['name']} => '{$status['variant']}',";
            $icons[] = "            self::{$status['name']} => '{$status['icon']}',";
        }

        $casesStr = implode("\n", $cases);
        $labelsStr = implode("\n", $labels);
        $variantsStr = implode("\n", $variants);
        $iconsStr = implode("\n", $icons);

        return <<<PHP
<?php

namespace {$ns};

use MyLaravelCore\Traits\EnumTools;

enum {$class}: string
{
    use EnumTools;

{$casesStr}

    public function label(?string \$moduleName = null, ?string \$prefix = null): string
    {
        return match (\$this) {
{$labelsStr}
        };
    }

    public function badgeVariant(): string
    {
        return match (\$this) {
{$variantsStr}
        };
    }

    public function icon(): string
    {
        return match (\$this) {
{$iconsStr}
        };
    }
}
PHP;
    }

    protected function buildWorkflowClassStub(array $ctx): string
    {
        $ns = "{$ctx['namespaceBase']}\\Workflows";
        $enumNs = "{$ctx['namespaceBase']}\\Enums\\{$ctx['studly']}Status";
        $enumShort = "{$ctx['studly']}Status";
        $class = "{$ctx['studly']}Workflow";
        $statuses = $ctx['statuses'];

        $firstCase = $statuses[0]['name'];
        $secondCase = $statuses[1]['name'] ?? $firstCase;
        $lastCase = $statuses[count($statuses) - 1]['name'];

        $managerRole = $ctx['roles'][0] ?? 'manager';
        $supervisorRole = $ctx['roles'][1] ?? $managerRole;
        $adminRole = $ctx['roles'][2] ?? 'admin';

        // Build manager viewable statuses (first ~3 actionable/intermediate statuses)
        $managerViewCases = array_slice($statuses, 0, min(3, count($statuses)));
        $managerViewList = implode(', ', array_map(fn ($s) => "{$enumShort}::{$s['name']}", $managerViewCases));

        // Build consecutive transition edges
        $transitionLines = [];
        for ($i = 0; $i < count($statuses) - 1; $i++) {
            $from = $statuses[$i];
            $to = $statuses[$i + 1];

            // Skip auto-chaining terminal negative status linearly onto previous positive terminal if >= 3 statuses
            if ($i === count($statuses) - 2 && count($statuses) >= 4 && in_array($to['variant'], ['danger', 'secondary'], true)) {
                continue;
            }

            $requiresNote = in_array($to['variant'], ['danger', 'warning'], true) ? "\n                ->requiresNote()" : '';

            $transitionLines[] = <<<EDGE
            WorkflowTransition::make({$enumShort}::{$from['name']}, {$enumShort}::{$to['name']})
                ->roles(['{$managerRole}', '{$supervisorRole}', '{$adminRole}'])
                ->hours('{$ctx['hoursFrom']}', '{$ctx['hoursTo']}')
                ->label('انتقال به {$to['label']}')
                ->variant('{$to['variant']}'){$requiresNote},
EDGE;
        }

        // Also add rejection/cancel path from middle status to last status if last is danger
        if (count($statuses) >= 3 && $statuses[count($statuses) - 1]['variant'] === 'danger') {
            $mid = $statuses[min(1, count($statuses) - 2)];
            $reject = $statuses[count($statuses) - 1];
            $transitionLines[] = <<<EDGE
            WorkflowTransition::make([{$enumShort}::{$firstCase}, {$enumShort}::{$mid['name']}], {$enumShort}::{$reject['name']})
                ->roles(['{$managerRole}', '{$adminRole}'])
                ->hours('{$ctx['hoursFrom']}', '{$ctx['hoursTo']}')
                ->label('{$reject['label']}')
                ->variant('danger')
                ->requiresNote(),
EDGE;
        }

        $transitionsStr = implode("\n\n", $transitionLines);

        return <<<PHP
<?php

namespace {$ns};

use {$enumNs};
use MyLaravelCore\Enums\WorkFlowType;
use MyLaravelCore\Support\Workflow\BaseWorkflow;
use MyLaravelCore\Support\Workflow\DTO\TimeWindow;
use MyLaravelCore\Support\Workflow\DTO\WorkflowRule;
use MyLaravelCore\Support\Workflow\DTO\WorkflowTransition;
use UnitEnum;

class {$class} extends BaseWorkflow
{
    public function name(): string
    {
        return '{$ctx['snake']}';
    }

    public function title(): string
    {
        return 'گردش کار {$ctx['faTitle']}';
    }

    public function statusEnum(): ?string
    {
        return {$enumShort}::class;
    }

    public function initialStatus(): string|int|UnitEnum|null
    {
        return {$enumShort}::{$firstCase};
    }

    /**
     * قوانین دسترسی نقش‌ها به وضعیت‌ها در بازه‌های زمانی مشخص.
     *
     * @return array<int, WorkflowRule>
     */
    public function rules(): array
    {
        return [
            // مدیر در ساعات کاری مشخص می‌تواند وضعیت‌های مشخص‌شده را ببیند و تغییر دهد
            WorkflowRule::make()
                ->roles(['{$managerRole}', 'مدیر'])
                ->statuses([{$managerViewList}])
                ->allow([WorkFlowType::VIEW, WorkFlowType::CHANGE])
                ->during(
                    TimeWindow::make()
                        ->hours('{$ctx['hoursFrom']}', '{$ctx['hoursTo']}')
                        ->days(['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه'])
                        ->label('ساعات اداری مدیریت {$ctx['faTitle']}')
                )
                ->description('مشاهده و مدیریت وضعیت‌های منتخب {$ctx['faTitle']} توسط مدیر در بازه زمانی مجاز'),

            // سرپرست امکان ثبت/تنظیم وضعیت میانی در ساعات کاری را دارد
            WorkflowRule::make()
                ->roles(['{$supervisorRole}'])
                ->statuses([{$enumShort}::{$secondCase}, {$enumShort}::{$lastCase}])
                ->allow([WorkFlowType::VIEW, WorkFlowType::SET])
                ->hours('{$ctx['hoursFrom']}', '{$ctx['hoursTo']}')
                ->description('مشاهده و تنظیم وضعیت {$ctx['faTitle']} توسط سرپرست'),

            // مدیر کل (Admin) دسترسی کامل بدون محدودیت زمانی به تمام وضعیت‌ها دارد
            WorkflowRule::make()
                ->roles(['{$adminRole}', 'super_admin'])
                ->statuses({$enumShort}::cases())
                ->allActions()
                ->description('دسترسی کامل ادمین به تمام وضعیت‌های {$ctx['faTitle']}'),
        ];
    }

    /**
     * انتقال‌های مجاز وضعیت‌ها در گردش کار {$ctx['faTitle']}.
     *
     * @return array<int, WorkflowTransition>
     */
    public function transitions(): array
    {
        return [
{$transitionsStr}
        ];
    }
}
PHP;
    }

    protected function buildWorkflowServiceStub(array $ctx): string
    {
        $ns = "{$ctx['namespaceBase']}\\Services";
        $enumNs = "{$ctx['namespaceBase']}\\Enums\\{$ctx['studly']}Status";
        $wfNs = "{$ctx['namespaceBase']}\\Workflows\\{$ctx['studly']}Workflow";
        $enumShort = "{$ctx['studly']}Status";
        $wfShort = "{$ctx['studly']}Workflow";
        $class = "{$ctx['studly']}WorkflowService";

        return <<<PHP
<?php

namespace {$ns};

use {$enumNs};
use {$wfNs};
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use MyLaravelCore\Support\Workflow\DTO\WorkflowTransition;

class {$class}
{
    public function __construct(protected {$wfShort} \$workflow)
    {
    }

    public function workflow(): {$wfShort}
    {
        return \$this->workflow;
    }

    /**
     * فیلتر کردن رکوردها مطابق نقش و بازه زمانی کاربر فعلی.
     */
    public function scopeVisible(Builder \$query, mixed \$user = null, mixed \$at = null): Builder
    {
        \$actor = \$user ?? authUser();

        return \$this->workflow->applyVisibleScope(\$query, \$actor, \$at);
    }

    /**
     * دریافت وضعیت‌هایی که کاربر در این لحظه (یا زمان دلخواه) مجاز به مشاهده آن‌ها است.
     *
     * @return array<int, string|int>
     */
    public function visibleStatuses(mixed \$user = null, mixed \$at = null): array
    {
        return \$this->workflow->visibleStatuses(\$user ?? authUser(), \$at);
    }

    /**
     * دریافت انتقال‌های مجاز فعلی برای نمایش دکمه‌ها در رابط کاربری.
     *
     * @return array<int, WorkflowTransition>
     */
    public function availableTransitions(Model \$model, mixed \$user = null, mixed \$at = null): array
    {
        return \$this->workflow->availableTransitions(\$user ?? authUser(), \$model, \$at);
    }

    /**
     * تغییر وضعیت رکورد با بررسی کامل نقش، بازه زمانی و گراف گردش کار.
     */
    public function transitionTo(
        Model \$model,
        {$enumShort}|string \$toStatus,
        mixed \$user = null,
        ?string \$note = null,
        mixed \$at = null
    ): bool {
        return \$this->workflow->executeTransition(\$model, \$toStatus, \$user ?? authUser(), \$note, \$at);
    }

    public function diagram(): array
    {
        return \$this->workflow->toDiagramArray();
    }
}
PHP;
    }

    protected function buildWorkflowLogsMigrationStub(array $ctx): string
    {
        $logTable = "{$ctx['snake']}_workflow_logs";

        return <<<PHP
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('{$logTable}', function (Blueprint \$table) {
            \$table->id();
            \$table->unsignedBigInteger('{$ctx['snake']}_id')->index();
            \$table->unsignedBigInteger('actor_id')->nullable()->index();
            \$table->string('actor_role')->nullable();
            \$table->string('from_status')->nullable();
            \$table->string('to_status');
            \$table->text('note')->nullable();
            \$table->timestamp('transitioned_at')->useCurrent();
            \$table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('{$logTable}');
    }
};
PHP;
    }

    protected function buildModelStub(array $ctx): string
    {
        $ns = "{$ctx['namespaceBase']}\\Models";
        $enumNs = "{$ctx['namespaceBase']}\\Enums\\{$ctx['studly']}Status";
        $wfNs = "{$ctx['namespaceBase']}\\Workflows\\{$ctx['studly']}Workflow";

        return <<<PHP
<?php

namespace {$ns};

use {$enumNs};
use {$wfNs};
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use MyLaravelCore\Traits\CustomFilterable;
use MyLaravelCore\Traits\HasAuditSupport;
use MyLaravelCore\Traits\HasDeleteDependency;
use MyLaravelCore\Traits\HasUuid;
use MyLaravelCore\Traits\HasWorkflow;
use MyLaravelCore\Traits\UserActivityTracking;

class {$ctx['studly']} extends Model
{
    use SoftDeletes;
    use HasUuid;
    use HasWorkflow;
    use HasDeleteDependency;
    use CustomFilterable;
    use HasAuditSupport;
    use UserActivityTracking;

    protected \$table = '{$ctx['pluralSnake']}';

    protected string \$workflowClass = {$ctx['studly']}Workflow::class;

    protected \$fillable = [
        'uuid',
        'title',
        'description',
        'status',
    ];

    protected \$attributes = [
        'status' => '{$ctx['statuses'][0]['value']}',
    ];

    protected \$casts = [
        'status' => {$ctx['studly']}Status::class,
    ];
}
PHP;
    }

    protected function buildEntityMigrationStub(array $ctx): string
    {
        $defaultStatus = $ctx['statuses'][0]['value'];

        return <<<PHP
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('{$ctx['pluralSnake']}', function (Blueprint \$table) {
            \$table->id();
            \$table->uuid('uuid')->unique();
            \$table->string('title');
            \$table->text('description')->nullable();
            \$table->string('status')->default('{$defaultStatus}')->index();
            \$table->unsignedBigInteger('created_by')->nullable();
            \$table->unsignedBigInteger('updated_by')->nullable();
            \$table->timestamps();
            \$table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('{$ctx['pluralSnake']}');
    }
};
PHP;
    }

    protected function buildStoreRequestStub(array $ctx): string
    {
        $ns = "{$ctx['namespaceBase']}\\Http\\Requests\\{$ctx['studly']}";
        $enumNs = "{$ctx['namespaceBase']}\\Enums\\{$ctx['studly']}Status";

        return <<<PHP
<?php

namespace {$ns};

use {$enumNs};
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class Store{$ctx['studly']}Request extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['nullable', Rule::in({$ctx['studly']}Status::values())],
        ];
    }
}
PHP;
    }

    protected function buildTableStub(array $ctx): string
    {
        $ns = "{$ctx['namespaceBase']}\\Tables";
        $enumNs = "{$ctx['namespaceBase']}\\Enums\\{$ctx['studly']}Status";

        $variantMap = [];
        $labelMap = [];
        foreach ($ctx['statuses'] as $s) {
            $variantMap[] = "'{$s['value']}' => '{$s['variant']}'";
            $labelMap[] = "'{$s['value']}' => '{$s['label']}'";
        }
        $variantsPhp = '[' . implode(', ', $variantMap) . ']';
        $labelsPhp = '[' . implode(', ', $labelMap) . ']';

        return <<<PHP
<?php

namespace {$ns};

use {$enumNs};
use MyLaravelCore\Tables\BaseTable;
use MyLaravelCore\Tables\Columns\BadgeColumn;
use MyLaravelCore\Tables\Columns\DateColumn;
use MyLaravelCore\Tables\Columns\TextColumn;

class {$ctx['studly']}Table extends BaseTable
{
    public function columns(): array
    {
        return [
            TextColumn::make('id', 'شناسه')->sortable(),
            TextColumn::make('title', 'عنوان')->searchable()->sortable(),
            BadgeColumn::make('status', 'وضعیت')
                ->colors({$variantsPhp})
                ->labels({$labelsPhp})
                ->sortable(),
            DateColumn::make('created_at', 'تاریخ ثبت')->jalali(),
        ];
    }
}
PHP;
    }

    protected function buildControllerStub(array $ctx): string
    {
        $ns = "{$ctx['namespaceBase']}\\Http\\Controllers";
        $modelNs = "{$ctx['namespaceBase']}\\Models\\{$ctx['studly']}";
        $requestNs = "{$ctx['namespaceBase']}\\Http\\Requests\\{$ctx['studly']}\\Store{$ctx['studly']}Request";
        $serviceNs = "{$ctx['namespaceBase']}\\Services\\{$ctx['studly']}WorkflowService";
        $tableNs = "{$ctx['namespaceBase']}\\Tables\\{$ctx['studly']}Table";

        return <<<PHP
<?php

namespace {$ns};

use {$modelNs};
use {$requestNs};
use {$serviceNs};
use {$tableNs};
use BackedEnum;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use MyLaravelCore\Exceptions\WorkflowTransitionException;

class {$ctx['studly']}Controller extends Controller
{
    public function __construct(protected {$ctx['studly']}WorkflowService \$workflowService)
    {
    }

    public function index(Request \$request)
    {
        \$records = \$this->workflowService
            ->scopeVisible({$ctx['studly']}::query(), \$request->user())
            ->latest()
            ->paginate(15);

        \$table = {$ctx['studly']}Table::make(\$records);

        return view('{$ctx['pluralSnake']}.index', compact('records', 'table'));
    }

    public function store(Store{$ctx['studly']}Request \$request): RedirectResponse
    {
        \$data = \$request->validated();
        \$initial = \$this->workflowService->workflow()->initialStatus();
        \$data['status'] ??= \$initial instanceof BackedEnum ? \$initial->value : \$initial;

        {$ctx['studly']}::create(\$data);

        return back()->withFlash('آیتم {$ctx['faTitle']} با موفقیت ثبت شد.', 'success');
    }

    public function transition(Request \$request, {$ctx['studly']} \${$ctx['camel']}): RedirectResponse
    {
        \$validated = \$request->validate([
            'status' => ['required', 'string'],
            'note' => ['nullable', 'string', 'max:1000'],
        ]);

        try {
            \$this->workflowService->transitionTo(
                model: \${$ctx['camel']},
                toStatus: \$validated['status'],
                user: \$request->user(),
                note: \$validated['note'] ?? null,
            );

            return back()->withFlash('وضعیت با موفقیت به‌روزرسانی شد.', 'success');
        } catch (WorkflowTransitionException \$e) {
            return back()->withFlash(\$e->getMessage(), 'error');
        }
    }
}
PHP;
    }
}
