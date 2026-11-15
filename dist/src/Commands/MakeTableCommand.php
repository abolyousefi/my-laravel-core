<?php

namespace MyLaravelCore\Commands;

use Illuminate\Console\Command;

class MakeTableCommand extends Command
{
    protected $signature = 'core:table 
                            {name : Name of the table class (e.g. UserTable, ProductTable)} 
                            {--model= : The associated Eloquent Model class}
                            {--title= : Custom table title in Persian}';
    protected $description = 'Create a new enterprise declarative Table generator class';

    public function handle(): int
    {
        $name = trim($this->argument('name'));
        if (!str_ends_with($name, 'Table')) {
            $name .= 'Table';
        }

        $model = $this->option('model') ? trim($this->option('model')) : str_replace('Table', '', $name);
        $title = $this->option('title') ?: ('مدیریت ' . $model);

        $targetDir = app_path('Tables');
        if (str_contains(base_path(), 'testbench-core')) {
            $targetDir = getcwd() . '/app/Tables';
        }

        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0755, true);
        }

        $filePath = $targetDir . '/' . $name . '.php';

        if (file_exists($filePath)) {
            $this->error("Table class [{$name}] already exists at [{$filePath}]");
            return self::FAILURE;
        }

        $content = <<<PHP
<?php

namespace App\Tables;

use MyLaravelCore\Tables\BaseTable;
use MyLaravelCore\Tables\Columns\TextColumn;
use MyLaravelCore\Tables\Columns\BadgeColumn;
use MyLaravelCore\Tables\Columns\CurrencyColumn;
use MyLaravelCore\Tables\Columns\DateColumn;
use MyLaravelCore\Tables\Columns\ImageColumn;
use MyLaravelCore\Tables\Columns\ActionColumn;
use MyLaravelCore\Tables\Columns\ToggleColumn;
use MyLaravelCore\Tables\Filters\SelectFilter;
use MyLaravelCore\Tables\Filters\DateRangeFilter;
use MyLaravelCore\Tables\Actions\TableAction;
use App\Models\\{$model};

class {$name} extends BaseTable
{
    protected ?string \$model = {$model}::class;
    protected string \$title = '{$title}';
    protected ?string \$icon = 'fa-table-list';
    protected int \$perPage = 15;

    /**
     * Define table columns.
     */
    public function columns(): array
    {
        return [
            TextColumn::make('id', '#')->width('70px')->sortable(),
            TextColumn::make('title', 'عنوان')->searchable()->sortable()->bold(),
            BadgeColumn::make('status', 'وضعیت')->map([
                'active' => ['label' => 'فعال', 'variant' => 'success'],
                'inactive' => ['label' => 'غیرفعال', 'variant' => 'danger'],
                'draft' => ['label' => 'پیش‌نویس', 'variant' => 'secondary'],
            ]),
            DateColumn::make('created_at', 'تاریخ ثبت')->jalali()->sortable()->timeAgo(),
            ActionColumn::make('عملیات')->actions([
                TableAction::make('edit', 'ویرایش')->icon('fa-edit')->variant('light'),
                TableAction::make('delete', 'حذف')->icon('fa-trash')->variant('danger')->confirm('آیا از حذف این رکورد مطمئن هستید؟'),
            ]),
        ];
    }

    /**
     * Define table filters.
     */
    public function filters(): array
    {
        return [
            SelectFilter::make('status', 'وضعیت')->options([
                'active' => 'فعال',
                'inactive' => 'غیرفعال',
                'draft' => 'پیش‌نویس',
            ]),
            DateRangeFilter::make('created_at', 'بازه زمانی ثبت'),
        ];
    }

    /**
     * Define bulk actions.
     */
    public function bulkActions(): array
    {
        return [
            TableAction::make('bulk_delete', 'حذف دسته‌جمعی')->icon('fa-trash')->variant('danger')->confirm('آیا از حذف آیتم‌های انتخابی مطمئن هستید؟'),
        ];
    }
}
PHP;

        file_put_contents($filePath, $content);

        $this->newLine();
        $this->info("✨ Table class [{$name}] generated successfully!");
        $this->line("   Location: <fg=cyan>{$filePath}</>");
        $this->line("   Use in Controller: <fg=yellow>\$table = \\App\\Tables\\{$name}::make();</>");
        $this->line("   Use in Blade:      <fg=yellow><x-table-view :table=\"\$table\" /></> or <fg=yellow>{!! \$table->render() !!}</>");
        $this->newLine();

        return self::SUCCESS;
    }
}
