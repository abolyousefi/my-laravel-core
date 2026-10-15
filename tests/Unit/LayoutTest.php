<?php

namespace MyLaravelCore\Tests\Unit;

use MyLaravelCore\Components\Layout\DefaultLayout;
use PHPUnit\Framework\TestCase;

class LayoutTest extends TestCase
{
    public function test_default_layout_properties(): void
    {
        $layout = new DefaultLayout(
            title: 'داشبورد مدیریت',
            dir: 'rtl',
            navbar: true,
            sidebar: true,
            container: 'container-fluid',
            footer: false,
            alerts: true,
            brand: 'فروشگاه تستی'
        );

        $this->assertEquals('داشبورد مدیریت', $layout->title);
        $this->assertEquals('rtl', $layout->dir);
        $this->assertTrue($layout->navbar);
        $this->assertTrue($layout->sidebar);
        $this->assertEquals('container-fluid', $layout->container);
        $this->assertFalse($layout->footer);
        $this->assertTrue($layout->alerts);
        $this->assertEquals('فروشگاه تستی', $layout->brand);
    }
}
