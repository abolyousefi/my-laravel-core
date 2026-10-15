<?php

namespace MyLaravelCore\Tests\Unit;

use MyLaravelCore\Traits\HasStatus;
use PHPUnit\Framework\TestCase;

class TraitsTest extends TestCase
{
    public function test_has_status_methods(): void
    {
        $dummy = new class {
            use HasStatus;
            public $status = 1;
            public function save() { return true; }
        };

        $this->assertTrue($dummy->isActive());
        $this->assertTrue($dummy->isStatus(1));

        $dummy->deactivate();
        $this->assertEquals(0, $dummy->status);
        $this->assertFalse($dummy->isActive());

        $dummy->activate();
        $this->assertEquals(1, $dummy->status);
        $this->assertTrue($dummy->isActive());
    }
}
