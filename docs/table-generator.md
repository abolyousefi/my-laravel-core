# مستندات سازنده جدول (Table Generator)

## ساخت جدول جدید با دستور Artisan
```bash
php artisan core:table ProductTable --model=Product --title="مدیریت محصولات"
```

این دستور یک کلاس در `app/Tables/ProductTable.php` تولید می‌کند.

---

## ساختار کلاس جدول

```php
namespace App\Tables;

use MyLaravelCore\Tables\BaseTable;
use MyLaravelCore\Tables\Columns\TextColumn;
use MyLaravelCore\Tables\Columns\BadgeColumn;
use MyLaravelCore\Tables\Columns\CurrencyColumn;
use MyLaravelCore\Tables\Columns\DateColumn;
use MyLaravelCore\Tables\Columns\ImageColumn;
use MyLaravelCore\Tables\Columns\ToggleColumn;
use MyLaravelCore\Tables\Columns\ActionColumn;
use MyLaravelCore\Tables\Filters\SelectFilter;
use MyLaravelCore\Tables\Filters\DateRangeFilter;
use MyLaravelCore\Tables\Actions\TableAction;
use App\Models\Product;

class ProductTable extends BaseTable
{
    protected ?string $model = Product::class;
    protected string $title = 'مدیریت محصولات فروشگاه';
    protected ?string $icon = 'fa-boxes-stacked';
    protected int $perPage = 15;

    public function columns(): array
    {
        return [
            ImageColumn::make('image', 'تصویر')->rounded('circle')->height(45),
            TextColumn::make('name', 'نام محصول')->searchable()->sortable()->copyable(),
            CurrencyColumn::make('price', 'قیمت')->toman()->sortable()->showWords(),
            BadgeColumn::make('status', 'وضعیت')->map([
                'active' => ['label' => 'موجود', 'variant' => 'success'],
                'draft' => ['label' => 'پیش‌نویس', 'variant' => 'secondary'],
                'out_of_stock' => ['label' => 'ناموجود', 'variant' => 'danger'],
            ]),
            ToggleColumn::make('is_featured', 'ویژه')->endpoint('/admin/products/toggle'),
            DateColumn::make('created_at', 'تاریخ ثبت')->jalali()->timeAgo()->sortable(),
            ActionColumn::make('عملیات')->actions([
                TableAction::make('edit', 'ویرایش')->icon('fa-edit')->url(fn($p) => route('admin.products.edit', $p)),
                TableAction::make('delete', 'حذف')->icon('fa-trash')->variant('danger')->confirm('آیا مطمئن هستید؟'),
            ]),
        ];
    }

    public function filters(): array
    {
        return [
            SelectFilter::make('status', 'وضعیت موجودی')->options([
                'active' => 'موجود در انبار',
                'out_of_stock' => 'ناموجود',
            ]),
            DateRangeFilter::make('created_at', 'بازه زمانی ثبت'),
        ];
    }

    public function bulkActions(): array
    {
        return [
            TableAction::make('bulk_delete', 'حذف دسته‌جمعی')->icon('fa-trash')->variant('danger')->confirm('آیا مطمئن هستید؟'),
        ];
    }
}
```

---

## استفاده در کنترلر و فایل Blade

### در کنترلر:
```php
public function index()
{
    $table = \App\Tables\ProductTable::make();
    return view('admin.products.index', compact('table'));
}
```

### در فایل Blade:
```blade
<x-default-layout title="محصولات">
    <x-table-view :table="$table" />
</x-default-layout>
```
یا مستقیماً:
```blade
{!! $table->render() !!}
```
