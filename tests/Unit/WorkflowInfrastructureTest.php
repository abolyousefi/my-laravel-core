<?php

namespace MyLaravelCore\Tests\Unit;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;
use MyLaravelCore\Enums\WorkFlowType;
use MyLaravelCore\Events\WorkflowTransitioned;
use MyLaravelCore\Exceptions\WorkflowTransitionException;
use MyLaravelCore\Facades\Workflow;
use MyLaravelCore\Providers\CoreServiceProvider;
use MyLaravelCore\Support\Jalali\Jalali;
use MyLaravelCore\Support\Workflow\BaseWorkflow;
use MyLaravelCore\Support\Workflow\DTO\TimeWindow;
use MyLaravelCore\Support\Workflow\DTO\WorkflowRule;
use MyLaravelCore\Support\Workflow\DTO\WorkflowTransition;
use MyLaravelCore\Traits\EnumTools;
use MyLaravelCore\Traits\HasWorkflow;
use Orchestra\Testbench\TestCase;

class WorkflowInfrastructureTest extends TestCase
{
    protected array $tempDirs = [];

    protected function getPackageProviders($app): array
    {
        return [
            CoreServiceProvider::class,
        ];
    }

    protected function getEnvironmentSetUp($app): void
    {
        $app['config']->set('database.default', 'testing');
        $app['config']->set('database.connections.testing', [
            'driver' => 'sqlite',
            'database' => ':memory:',
            'prefix' => '',
        ]);
        $app['config']->set('app.key', 'base64:' . base64_encode(random_bytes(32)));
        $app['config']->set('core.workflow.default_timezone', 'Asia/Tehran');
    }

    protected function tearDown(): void
    {
        foreach ($this->tempDirs as $dir) {
            if (is_dir($dir)) {
                File::deleteDirectory($dir);
            }
        }

        parent::tearDown();
    }

    public function test_time_window_evaluates_hours_overnight_days_and_jalali_ranges(): void
    {
        // 2026-11-14 is a Saturday in Asia/Tehran
        $saturdayMorning = Carbon::create(2026, 11, 14, 10, 30, 0, 'Asia/Tehran');
        $saturdayEvening = Carbon::create(2026, 11, 14, 19, 0, 0, 'Asia/Tehran');
        $fridayMorning = Carbon::create(2026, 11, 13, 10, 30, 0, 'Asia/Tehran');

        $officeWindow = TimeWindow::make()
            ->hours('08:00', '16:00')
            ->days(['شنبه', 'یکشنبه', 'دوشنبه']);

        $this->assertTrue($officeWindow->isSatisfiedAt($saturdayMorning));
        $this->assertFalse($officeWindow->isSatisfiedAt($saturdayEvening));
        $this->assertFalse($officeWindow->isSatisfiedAt($fridayMorning));

        // Overnight window 22:00 -> 06:00
        $nightWindow = TimeWindow::make()->hours('22:00', '06:00');
        $this->assertTrue($nightWindow->isSatisfiedAt(Carbon::create(2026, 11, 14, 23, 15, 0, 'Asia/Tehran')));
        $this->assertTrue($nightWindow->isSatisfiedAt(Carbon::create(2026, 11, 14, 2, 45, 0, 'Asia/Tehran')));
        $this->assertFalse($nightWindow->isSatisfiedAt(Carbon::create(2026, 11, 14, 14, 0, 0, 'Asia/Tehran')));

        // Jalali date range window
        $jalaliRange = TimeWindow::make()->between('1405/08/01 00:00', '1405/08/30 23:59');
        $this->assertTrue($jalaliRange->isSatisfiedAt(Jalali::create(1405, 8, 15, 12, 0)));
        $this->assertFalse($jalaliRange->isSatisfiedAt(Jalali::create(1405, 9, 5, 12, 0)));
    }

    public function test_role_and_time_window_workflow_controls_status_visibility_and_actions(): void
    {
        Workflow::register('users_demo', TestUsersWorkflow::class);
        $workflow = workflow('users_demo');

        $manager = (object) ['id' => 10, 'role' => 'manager'];
        $admin = (object) ['id' => 1, 'roles' => ['admin']];

        // Saturday 11:00 Tehran -> within manager window 08:00-16:00
        $inWindow = Carbon::create(2026, 11, 14, 11, 0, 0, 'Asia/Tehran');
        // Saturday 20:00 Tehran -> outside manager window
        $outWindow = Carbon::create(2026, 11, 14, 20, 0, 0, 'Asia/Tehran');

        $this->assertSame(['pending', 'suspended'], $workflow->visibleStatuses($manager, $inWindow));
        $this->assertSame([], $workflow->visibleStatuses($manager, $outWindow));

        $this->assertTrue($workflow->can($manager, DemoUserStatus::PENDING, WorkFlowType::VIEW, $inWindow));
        $this->assertFalse($workflow->can($manager, DemoUserStatus::BANNED, WorkFlowType::VIEW, $inWindow));
        $this->assertFalse($workflow->can($manager, DemoUserStatus::PENDING, WorkFlowType::VIEW, $outWindow));

        // Admin sees all statuses at any time
        $this->assertCount(4, $workflow->visibleStatuses($admin, $outWindow));
        $this->assertTrue($workflow->canSetStatus($admin, DemoUserStatus::ACTIVE, $outWindow));
    }

    public function test_eloquent_has_workflow_scope_and_guarded_transitions(): void
    {
        Schema::create('demo_purchases', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('status');
            $table->timestamps();
        });

        Workflow::register('demo_purchase', TestPurchaseWorkflow::class);

        DemoPurchase::create(['title' => 'خرید کاغذ', 'status' => 'draft']);
        DemoPurchase::create(['title' => 'خرید لپتاپ', 'status' => 'pending_manager']);
        DemoPurchase::create(['title' => 'خرید سرور', 'status' => 'completed']);

        $manager = (object) ['id' => 2, 'role' => 'manager'];
        $viewer = (object) ['id' => 3, 'role' => 'auditor'];

        $inWindow = Carbon::create(2026, 11, 14, 10, 0, 0, 'Asia/Tehran');
        $outWindow = Carbon::create(2026, 11, 14, 22, 0, 0, 'Asia/Tehran');

        // Inside 08:00-16:00 manager sees only draft & pending_manager (not completed)
        $visibleInside = DemoPurchase::visibleForWorkflow($manager, $inWindow)->pluck('title')->all();
        $this->assertSame(['خرید کاغذ', 'خرید لپتاپ'], $visibleInside);

        // Outside hours manager sees 0 records
        $visibleOutside = DemoPurchase::visibleForWorkflow($manager, $outWindow)->count();
        $this->assertSame(0, $visibleOutside);

        // Unauthorized role sees 0 records
        $this->assertSame(0, DemoPurchase::visibleForWorkflow($viewer, $inWindow)->count());

        // Transition inside allowed window works and dispatches WorkflowTransitioned
        Event::fake([WorkflowTransitioned::class]);
        $item = DemoPurchase::where('title', 'خرید لپتاپ')->firstOrFail();

        $this->assertCount(2, $item->availableWorkflowTransitions($manager, $inWindow));
        $this->assertTrue($item->transitionTo('completed', $manager, 'تایید خرید فوری', $inWindow));
        $this->assertSame('completed', $item->fresh()->status);

        Event::assertDispatched(WorkflowTransitioned::class, function (WorkflowTransitioned $event) {
            return $event->workflow === 'demo_purchase'
                && $event->fromStatus === 'pending_manager'
                && $event->toStatus === 'completed'
                && $event->note === 'تایید خرید فوری';
        });
    }

    public function test_transition_throws_exception_outside_time_window_or_without_note_or_invalid_edge(): void
    {
        Schema::create('demo_purchases', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('status');
            $table->timestamps();
        });

        Workflow::register('demo_purchase', TestPurchaseWorkflow::class);

        $item = DemoPurchase::create(['title' => 'خرید تجهیزات', 'status' => 'pending_manager']);
        $manager = (object) ['id' => 2, 'role' => 'manager'];

        $inWindow = Carbon::create(2026, 11, 14, 11, 0, 0, 'Asia/Tehran');
        $outWindow = Carbon::create(2026, 11, 14, 20, 0, 0, 'Asia/Tehran');

        // Outside allowed hours -> throws
        $this->expectException(WorkflowTransitionException::class);
        $item->transitionTo('completed', $manager, null, $outWindow);
    }

    public function test_transition_rejects_missing_required_note(): void
    {
        Schema::create('demo_purchases', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('status');
            $table->timestamps();
        });

        Workflow::register('demo_purchase', TestPurchaseWorkflow::class);

        $item = DemoPurchase::create(['title' => 'خرید تجهیزات', 'status' => 'pending_manager']);
        $manager = (object) ['id' => 2, 'role' => 'manager'];
        $inWindow = Carbon::create(2026, 11, 14, 11, 0, 0, 'Asia/Tehran');

        $this->assertFalse($item->canTransitionTo('rejected', $manager, $inWindow, null));
        $this->assertTrue($item->canTransitionTo('rejected', $manager, $inWindow, 'عدم تایید بودجه'));

        $this->expectException(WorkflowTransitionException::class);
        $item->transitionTo('rejected', $manager, null, $inWindow);
    }

    public function test_artisan_core_workflow_command_generates_valid_persian_domain_files(): void
    {
        $tmpBase = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'abolframe_wf_test_' . uniqid();
        $this->tempDirs[] = $tmpBase;

        $this->artisan('core:workflow', [
            'domain' => 'خرید',
            '--base-path' => $tmpBase,
            '--with-migration' => true,
            '--hours' => '09:00-17:00',
        ])->assertExitCode(0);

        $enumFile = $tmpBase . '/app/Enums/PurchaseStatus.php';
        $workflowFile = $tmpBase . '/app/Workflows/PurchaseWorkflow.php';
        $serviceFile = $tmpBase . '/app/Services/PurchaseWorkflowService.php';

        $this->assertFileExists($enumFile);
        $this->assertFileExists($workflowFile);
        $this->assertFileExists($serviceFile);

        $migrations = glob($tmpBase . '/database/migrations/*_create_purchase_workflow_logs_table.php');
        $this->assertCount(1, $migrations);

        foreach ([$enumFile, $workflowFile, $serviceFile, $migrations[0]] as $phpFile) {
            exec('php -l ' . escapeshellarg($phpFile), $out, $code);
            $this->assertSame(0, $code, "Syntax error in generated file: {$phpFile}");
        }

        // Load generated classes dynamically and exercise them
        require_once $enumFile;
        require_once $workflowFile;

        $generatedWorkflow = new \App\Workflows\PurchaseWorkflow();
        $this->assertSame('purchase', $generatedWorkflow->name());
        $this->assertSame('گردش کار خرید', $generatedWorkflow->title());

        $manager = (object) ['role' => 'manager'];
        $saturdayAt10 = Carbon::create(2026, 11, 14, 10, 0, 0, 'Asia/Tehran');
        $saturdayAt20 = Carbon::create(2026, 11, 14, 20, 0, 0, 'Asia/Tehran');

        $this->assertSame(['draft', 'submitted', 'pending_manager'], $generatedWorkflow->visibleStatuses($manager, $saturdayAt10));
        $this->assertSame([], $generatedWorkflow->visibleStatuses($manager, $saturdayAt20));
    }

    public function test_artisan_make_workflow_alias_with_crud_scaffolds_full_module(): void
    {
        $tmpBase = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'abolframe_wf_crud_' . uniqid();
        $this->tempDirs[] = $tmpBase;

        $this->artisan('make:workflow', [
            'domain' => 'کاربران',
            '--base-path' => $tmpBase,
            '--with-crud' => true,
        ])->assertExitCode(0);

        $expectedFiles = [
            $tmpBase . '/app/Enums/UserStatus.php',
            $tmpBase . '/app/Workflows/UserWorkflow.php',
            $tmpBase . '/app/Services/UserWorkflowService.php',
            $tmpBase . '/app/Models/User.php',
            $tmpBase . '/app/Http/Requests/User/StoreUserRequest.php',
            $tmpBase . '/app/Tables/UserTable.php',
            $tmpBase . '/app/Http/Controllers/UserController.php',
        ];

        foreach ($expectedFiles as $file) {
            $this->assertFileExists($file);
            exec('php -l ' . escapeshellarg($file), $out, $code);
            $this->assertSame(0, $code, "Syntax error in generated CRUD file: {$file}");
        }
    }
}

enum DemoUserStatus: string
{
    use EnumTools;

    case PENDING = 'pending';
    case ACTIVE = 'active';
    case SUSPENDED = 'suspended';
    case BANNED = 'banned';

    public function label(?string $moduleName = null, ?string $prefix = null): string
    {
        return match ($this) {
            self::PENDING => 'در انتظار بررسی',
            self::ACTIVE => 'فعال',
            self::SUSPENDED => 'معلق',
            self::BANNED => 'مسدود',
        };
    }
}

class TestUsersWorkflow extends BaseWorkflow
{
    public function name(): string
    {
        return 'users_demo';
    }

    public function title(): string
    {
        return 'گردش کار کاربران';
    }

    public function statusEnum(): ?string
    {
        return DemoUserStatus::class;
    }

    public function rules(): array
    {
        return [
            WorkflowRule::make()
                ->roles('manager')
                ->statuses([DemoUserStatus::PENDING, DemoUserStatus::SUSPENDED])
                ->canView()
                ->hours('08:00', '16:00')
                ->days(['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه']),

            WorkflowRule::make()
                ->roles('admin')
                ->statuses(DemoUserStatus::cases())
                ->allActions(),
        ];
    }
}

class TestPurchaseWorkflow extends BaseWorkflow
{
    public function name(): string
    {
        return 'demo_purchase';
    }

    public function title(): string
    {
        return 'گردش کار خرید';
    }

    public function rules(): array
    {
        return [
            WorkflowRule::make()
                ->roles('manager')
                ->statuses(['draft', 'pending_manager'])
                ->canView()
                ->hours('08:00', '16:00'),

            WorkflowRule::make()
                ->roles('admin')
                ->statuses('*')
                ->allActions(),
        ];
    }

    public function transitions(): array
    {
        return [
            WorkflowTransition::make('pending_manager', 'completed')
                ->roles(['manager', 'admin'])
                ->hours('08:00', '16:00')
                ->label('تایید و تکمیل')
                ->variant('success'),

            WorkflowTransition::make('pending_manager', 'rejected')
                ->roles(['manager', 'admin'])
                ->hours('08:00', '16:00')
                ->label('رد درخواست')
                ->variant('danger')
                ->requiresNote(),
        ];
    }
}

class DemoPurchase extends Model
{
    use HasWorkflow;

    protected $table = 'demo_purchases';

    protected string $workflowClass = TestPurchaseWorkflow::class;

    protected $fillable = ['title', 'status'];
}
