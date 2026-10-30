<?php

namespace MyLaravelCore\Tests\Unit;

use MyLaravelCore\Tables\BaseTable;
use MyLaravelCore\Tables\Columns\BadgeColumn;
use MyLaravelCore\Tables\Columns\CurrencyColumn;
use MyLaravelCore\Tables\Columns\DateColumn;
use MyLaravelCore\Tables\Columns\TextColumn;
use MyLaravelCore\Tables\Filters\SelectFilter;
use PHPUnit\Framework\TestCase;

class DummyTable extends BaseTable
{
    public function columns(): array
    {
        return [
            TextColumn::make('id', '#')->sortable(),
            TextColumn::make('name', 'نام')->searchable()->copyable(),
            CurrencyColumn::make('price', 'قیمت')->toman(),
            BadgeColumn::make('status', 'وضعیت')->map([
                'active' => ['label' => 'فعال', 'variant' => 'success'],
            ]),
            DateColumn::make('created_at', 'تاریخ')->jalali(),
        ];
    }

    public function filters(): array
    {
        return [
            SelectFilter::make('status', 'وضعیت')->options([
                'active' => 'فعال',
            ]),
        ];
    }
}

class TableGeneratorTest extends TestCase
{
    public function test_table_columns_and_filters_definition(): void
    {
        $table = new DummyTable();

        $cols = $table->columns();
        $this->assertCount(5, $cols);
        $this->assertEquals('name', $cols[1]->getKey());
        $this->assertTrue($cols[1]->isSearchable());
        $this->assertTrue($cols[0]->isSortable());

        $filters = $table->filters();
        $this->assertCount(1, $filters);
        $this->assertEquals('status', $filters[0]->getKey());
    }

    public function test_columns_cell_rendering(): void
    {
        $row = (object) [
            'id' => 1,
            'name' => 'تست محصول',
            'price' => 50000,
            'status' => 'active',
            'created_at' => '2026-10-30 12:00:00',
        ];

        $table = new DummyTable();
        $cols = $table->columns();

        $renderedText = $cols[1]->renderCell($row);
        $this->assertStringContainsString('تست محصول', $renderedText);
        $this->assertStringContainsString('data-core-copy', $renderedText);

        $renderedCurrency = $cols[2]->renderCell($row);
        $this->assertStringContainsString('تومان', $renderedCurrency);

        $renderedBadge = $cols[3]->renderCell($row);
        $this->assertStringContainsString('badge bg-success', $renderedBadge);
        $this->assertStringContainsString('فعال', $renderedBadge);
    }
}
