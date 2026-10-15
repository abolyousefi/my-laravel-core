<?php

namespace MyLaravelCore\Tests\Unit;

use MyLaravelCore\Components\Design\Card;
use MyLaravelCore\Components\Design\Table;
use PHPUnit\Framework\TestCase;

class TableComponentTest extends TestCase
{
    public function test_card_component_can_be_instantiated_with_rich_options(): void
    {
        $card = new Card(
            title: 'تست کارت',
            subtitle: 'توضیحات تست',
            icon: 'fa-star',
            badge: 'جدید',
            badgeVariant: 'success',
            hover: true,
            shadow: 'md',
            padding: 4,
            bordered: false,
            rounded: '4'
        );

        $this->assertEquals('تست کارت', $card->title);
        $this->assertEquals('توضیحات تست', $card->subtitle);
        $this->assertEquals('fa-star', $card->icon);
        $this->assertEquals('جدید', $card->badge);
        $this->assertTrue($card->hover);
    }

    public function test_table_component_can_resolve_nested_attributes(): void
    {
        $table = new Table(
            columns: [
                ['key' => 'id', 'label' => '#'],
                ['key' => 'title', 'label' => 'عنوان'],
                ['key' => 'category.title', 'label' => 'دسته'],
            ],
            rows: [
                ['id' => 1, 'title' => 'کیک شکلاتی', 'category' => ['title' => 'کیک‌ها']],
            ]
        );

        $row = $table->rows[0];
        $this->assertEquals(1, $table->resolveValue($row, 'id'));
        $this->assertEquals('کیک شکلاتی', $table->resolveValue($row, 'title'));
        $this->assertEquals('کیک‌ها', $table->resolveValue($row, 'category.title'));
    }
}
