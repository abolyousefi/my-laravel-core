<?php

namespace MyLaravelCore\Tests\Unit;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use MyLaravelCore\Enums\AbolFrameComponent;
use MyLaravelCore\Enums\ConfirmationStatus;
use MyLaravelCore\Enums\IsActive;
use MyLaravelCore\Enums\IsDeleted;
use MyLaravelCore\Enums\UserLoginType;
use MyLaravelCore\Exceptions\InvalidJalaliDateException;
use MyLaravelCore\Facades\AbolFrame;
use MyLaravelCore\Facades\BladeLayout;
use MyLaravelCore\Facades\DataProvider;
use MyLaravelCore\Facades\FormValidator;
use MyLaravelCore\Providers\CoreServiceProvider;
use MyLaravelCore\Rules\AddressStringRule;
use MyLaravelCore\Rules\CodeRule;
use MyLaravelCore\Rules\Geo\PointWithinBoundary;
use MyLaravelCore\Rules\Geo\ValidGeometry;
use MyLaravelCore\Rules\Geo\ValidPoint;
use MyLaravelCore\Rules\Geo\ValidUtmPoint;
use MyLaravelCore\Rules\NormalizedStringRule;
use MyLaravelCore\Rules\NumberSeparatorRule;
use MyLaravelCore\Rules\PersianNameRule;
use MyLaravelCore\Support\DeleteDependency\DTO\DeleteDependency;
use MyLaravelCore\Support\Geo\GeometryValidator;
use MyLaravelCore\Support\Jalali\Jalali;
use MyLaravelCore\Support\Menu\MenuGroup;
use MyLaravelCore\Support\Menu\MenuSubgroup;
use Orchestra\Testbench\TestCase;

class AbolFrameInfrastructureTest extends TestCase
{
    protected function getPackageProviders($app): array
    {
        return [
            CoreServiceProvider::class,
        ];
    }

    public function test_php_formatting_and_mask_helpers(): void
    {
        $this->assertSame('123-456', stringMaskFormatter('XXX-XXX', '123456'));
        $this->assertSame('1,250,000', numberSeparator(1250000));
        $this->assertSame('دو میلیون و پانصد هزار', spellNumber(2500000));
        $this->assertSame('دو میلیون و پانصد هزار تومان', spellNumber(2500000, 'تومان'));
        $this->assertSame('منفی چهل و پنج', spellNumber(-45));
        $this->assertSame('صفر', spellNumber(0));
        $this->assertSame('15 KB', formatBytes(15360));
        $this->assertSame('15 کیلوبایت', formatBytes(15360, 2, true));
        $this->assertSame('5 MB', formatFileSize(5242880));
        $this->assertSame(10240, parseSize('10M'));
        $this->assertSame('.jpg,.png,.pdf', convertExtensionsToDotFormat('jpg,png,pdf'));
        $this->assertSame('x-component-created_at_range', makeDatetimeRangePickerID(null, 'created_at_range', null));
    }

    public function test_enum_tools_and_user_login_bitmask(): void
    {
        $this->assertSame(['PENDING', 'CONFIRMED', 'NOT_CONFIRMED'], ConfirmationStatus::names());
        $this->assertSame([0, 1, 2], ConfirmationStatus::values());
        $this->assertTrue(IsActive::YES->asBool());
        $this->assertFalse(IsActive::NO->asBool());
        $this->assertSame(1, IsDeleted::YES->value);
        $this->assertSame('abolframe-app', AbolFrameComponent::APP->value);

        $mask = UserLoginType::composeLoginTypeMask([UserLoginType::PASSWORD, UserLoginType::OTP_EMAIL]);
        $this->assertSame(5, $mask);

        $parsed = UserLoginType::parseLoginTypeMask($mask);
        $this->assertSame([UserLoginType::PASSWORD, UserLoginType::OTP_EMAIL], $parsed);
    }

    public function test_jalali_and_hijri_dates(): void
    {
        $j = Jalali::parse('1403/05/14 13:30:00');
        $this->assertSame('1403/05/14', $j->formatDate());
        $this->assertSame('1403-05-14', $j->format('Y-m-d'));
        $this->assertSame('مرداد', $j->monthName());

        // Leap year clamping: 1403 is leap (Esfand has 30 days), 1404 is not (29 days)
        $leapEnd = Jalali::create(1403, 12, 30);
        $nextYear = $leapEnd->copy()->addYear();
        $this->assertSame('1404/12/29', $nextYear->formatDate());

        // Invalid Jalali date must throw InvalidJalaliDateException
        $this->expectException(InvalidJalaliDateException::class);
        Jalali::create(1402, 12, 30);
    }

    public function test_data_provider_and_delete_dependency_dto(): void
    {
        $options = DataProvider::source(ConfirmationStatus::class)->formatComponentOptions();
        $this->assertCount(3, $options);

        $dep = DeleteDependency::relation('products')->label('محصولات');
        $this->assertSame('relation', $dep->getType());
        $this->assertSame('products', $dep->getRelationName());
    }

    public function test_validation_rules_jalali_and_geospatial(): void
    {
        $v1 = Validator::make(
            [
                'code' => 'bank_01-a',
                'title' => 'بانک ملی ایران',
                'address' => 'تهران خیابان فردوسی پلاک 12',
                'max_size' => 5000,
                'body' => '<p>متن آزمایشی</p>',
                'start_date' => '1403/05/14',
                'location' => '35.6892,51.3890',
                'utm' => ['x' => 535000, 'y' => 3950000, 'z' => 39],
            ],
            [
                'code' => ['required', new CodeRule()],
                'title' => ['required', new PersianNameRule()],
                'address' => ['required', new AddressStringRule()],
                'max_size' => ['required', new NumberSeparatorRule(max: 10000)],
                'body' => ['required', new NormalizedStringRule(max: 100, isEditor: true)],
                'start_date' => ['required', 'force_remote', 'jalali_date_after:1403/01/01,Y/m/d'],
                'location' => ['required', new ValidPoint()],
                'utm' => ['required', new ValidUtmPoint()],
            ]
        );
        $this->assertFalse($v1->fails());

        // Invalid address (only digits) & invalid Jalali date comparison
        $v2 = Validator::make(
            [
                'address' => '12345',
                'start_date' => '1402/11/10',
            ],
            [
                'address' => [new AddressStringRule()],
                'start_date' => ['jalali_date_after:1403/01/01,Y/m/d'],
            ]
        );
        $this->assertTrue($v2->fails());

        // GeometryValidator & PointWithinBoundary
        $square = [
            ['lat' => 35.7000, 'lng' => 51.4000],
            ['lat' => 35.7000, 'lng' => 51.4100],
            ['lat' => 35.7100, 'lng' => 51.4100],
            ['lat' => 35.7100, 'lng' => 51.4000],
            ['lat' => 35.7000, 'lng' => 51.4000],
        ];
        $geoResult = GeometryValidator::default()->validate($square);
        $this->assertTrue($geoResult->isValid());

        $insideValidator = Validator::make(
            ['pt' => ['lat' => 35.7050, 'lng' => 51.4050]],
            ['pt' => [new PointWithinBoundary($square), new ValidPoint()]]
        );
        $this->assertFalse($insideValidator->fails());

        $validGeoRule = Validator::make(['area' => $square], ['area' => [new ValidGeometry()]]);
        $this->assertFalse($validGeoRule->fails());

        $script = FormValidator::formRequest('FakeRequestClass', '#create-bank');
        $this->assertStringContainsString('#create-bank', $script);
    }

    public function test_route_property_collector_menu_and_blade_layout(): void
    {
        Route::get('/admin/banks', fn () => 'banks')
            ->name('admin.basic.banks.index')
            ->title('لیست بانک ها')
            ->showInSidebar()
            ->icon('fa-building-columns')
            ->sort(10);

        AbolFrame::menu(fn () => [
            MenuGroup::make()->name('admin.basic')->title('اطلاعات پایه')
                ->subMenu([
                    MenuSubgroup::make()->name('admin.basic.banks')->title('بانک ها'),
                ]),
        ]);

        $this->assertSame('لیست بانک ها', getPageTitle('admin.basic.banks.index'));
        $this->assertTrue(routePropertyCollector()->isChildOf('admin.basic.banks.index', 'admin.basic'));

        $crumbs = routePropertyCollector()->breadcrumb('admin.basic.banks.index');
        $this->assertNotEmpty($crumbs);

        BladeLayout::data('custom_key', 'custom_val');
        $this->assertSame('custom_val', bladeLayout()->data('custom_key'));
    }

    public function test_form_ui_components_map_and_select_controller(): void
    {
        // Map coordinate helpers & BaseMap
        $latLng = new \MyLaravelCore\Support\Map\DTO\LatLongPoint(35.6892, 51.3890);
        $utm = $latLng->toUtmPoint();
        $this->assertSame(39, $utm->getZ());
        $roundTrip = $utm->toLatLongPoint();
        $this->assertEqualsWithDelta(35.6892, $roundTrip->getLatitude(), 0.01);
        $this->assertEqualsWithDelta(51.3890, $roundTrip->getLongitude(), 0.01);

        // itemCollectorRules
        $rules = itemCollectorRules('items', ['title' => ['required', 'string'], 'qty' => ['required', 'integer']]);
        $this->assertArrayHasKey('items.*.title', $rules);
        $this->assertArrayHasKey('items.*.qty', $rules);

        // Blade rendering of newly added Form & UI components
        $renderedForm = \Illuminate\Support\Facades\Blade::render(
            '<x-switch-input name="active" label="فعال" :checked="true" />' .
            '<x-email-input name="email" label="ایمیل" />' .
            '<x-url-input name="website" label="وب سایت" />' .
            '<x-password-input name="pass" label="رمز" />' .
            '<x-plate-input name="plate" label="پلاک" />' .
            '<x-color-input name="color" label="رنگ" />' .
            '<x-slug-input name="slug" label="اسلاگ" source="title" />' .
            '<x-search-input name="q" label="جستجو" />' .
            '<x-map name="loc" label="نقشه" />'
        );

        $this->assertStringContainsString('data-component="switch-input"', $renderedForm);
        $this->assertStringContainsString('data-component="plate-input"', $renderedForm);
        $this->assertStringContainsString('data-component="color-input"', $renderedForm);
        $this->assertStringContainsString('data-component="slug-input"', $renderedForm);
        $this->assertStringContainsString('data-component="map"', $renderedForm);

        $renderedUi = \Illuminate\Support\Facades\Blade::render(
            '<x-stat-card title="کاربران" value="150" trend="+12%" />' .
            '<x-progress-bar :value="70" label="پیشرفت" />' .
            '<x-stepper :currentStep="2" :steps="[\'گام اول\', \'گام دوم\']" />' .
            '<x-confirmation-modal id="del_modal" title="حذف" />' .
            '<x-audit-log :audits="[]" />'
        );

        $this->assertStringContainsString('data-component="stat-card"', $renderedUi);
        $this->assertStringContainsString('data-component="progress-bar"', $renderedUi);
        $this->assertStringContainsString('data-component="stepper"', $renderedUi);
        $this->assertStringContainsString('data-component="confirmation-modal"', $renderedUi);
        $this->assertStringContainsString('data-component="audit-log"', $renderedUi);
    }
}
