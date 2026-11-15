<?php

namespace MyLaravelCore\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class MakeCrudCommand extends Command
{
    protected $signature = 'make:core-crud {name : Name of the resource (e.g. Product, Post, Article)} {--api : Generate only API controller and resource}';
    protected $description = 'Generate full enterprise CRUD infrastructure (Model, Migration, Controller, Request, and Blade Views)';

    public function handle(): int
    {
        $name = trim($this->argument('name'));
        $isApi = $this->option('api');

        $studlyName = Str::studly($name);
        $pluralStudly = Str::plural($studlyName);
        $pluralSnake = Str::snake($pluralStudly);
        $kebabName = Str::kebab($name);
        $pluralKebab = Str::kebab($pluralStudly);

        $this->info("⚡ Generating CRUD for: {$studlyName}...");

        $this->createModel($studlyName, $pluralSnake);
        $this->createRequest($studlyName);
        $this->createController($studlyName, $pluralStudly, $pluralKebab, $isApi);

        if (!$isApi) {
            $this->createViews($studlyName, $pluralKebab);
        }

        $this->info("✨ CRUD for {$studlyName} generated successfully!");

        return self::SUCCESS;
    }

    protected function createModel(string $name, string $table): void
    {
        $dir = app_path('Models');
        File::ensureDirectoryExists($dir);
        $file = "{$dir}/{$name}.php";

        if (File::exists($file)) {
            $this->warn("Model {$name} already exists. Skipping.");
            return;
        }

        $template = <<<PHP
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use MyLaravelCore\Traits\Auditable;
use MyLaravelCore\Traits\Filterable;
use MyLaravelCore\Traits\HasStatus;
use MyLaravelCore\Traits\HasUuid;

class {$name} extends Model
{
    use HasFactory, SoftDeletes, HasUuid, Filterable, Auditable, HasStatus;

    protected \$table = '{$table}';

    protected \$fillable = [
        'uuid',
        'title',
        'description',
        'status',
        'created_by',
        'updated_by',
    ];

    /**
     * Searchable fields for core filter query.
     */
    protected array \$searchable = [
        'title',
        'description',
    ];

    /**
     * Exact filterable fields.
     */
    protected array \$filterable = [
        'status',
    ];
}
PHP;

        File::put($file, $template);
        $this->line("✔ Model created: [app/Models/{$name}.php]");
    }

    protected function createRequest(string $name): void
    {
        $dir = app_path('Http/Requests');
        File::ensureDirectoryExists($dir);
        $file = "{$dir}/{$name}Request.php";

        if (File::exists($file)) {
            $this->warn("Request {$name}Request already exists. Skipping.");
            return;
        }

        $template = <<<PHP
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class {$name}Request extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'status' => ['nullable'],
        ];
    }
}
PHP;

        File::put($file, $template);
        $this->line("✔ Request created: [app/Http/Requests/{$name}Request.php]");
    }

    protected function createController(string $name, string $plural, string $kebabPlural, bool $isApi): void
    {
        $dir = app_path('Http/Controllers');
        File::ensureDirectoryExists($dir);
        $file = "{$dir}/{$name}Controller.php";

        if (File::exists($file)) {
            $this->warn("Controller {$name}Controller already exists. Skipping.");
            return;
        }

        $template = <<<PHP
<?php

namespace App\Http\Controllers;

use App\Models\\{$name};
use App\Http\Requests\\{$name}Request;
use Illuminate\Http\Request;
use MyLaravelCore\Traits\ApiResponseTrait;

class {$name}Controller extends Controller
{
    use ApiResponseTrait;

    public function index(Request \$request)
    {
        \$items = {$name}::filter()->paginate(15);

PHP;

        if ($isApi) {
            $template .= <<<PHP
        return \$this->paginated(\$items);
    }

    public function store({$name}Request \$request)
    {
        \$item = {$name}::create(\$request->validated());
        return \$this->created(\$item, '{$name} created successfully.');
    }

    public function show({$name} \${$name})
    {
        return \$this->success(\${$name});
    }

    public function update({$name}Request \$request, {$name} \${$name})
    {
        \${$name}->update(\$request->validated());
        return \$this->success(\${$name}, '{$name} updated successfully.');
    }

    public function destroy({$name} \${$name})
    {
        \${$name}->delete();
        return \$this->success(null, '{$name} deleted successfully.');
    }
}
PHP;
        } else {
            $template .= <<<PHP
        return view('{$kebabPlural}.index', compact('items'));
    }

    public function create()
    {
        return view('{$kebabPlural}.create');
    }

    public function store({$name}Request \$request)
    {
        {$name}::create(\$request->validated());
        return redirect()->route('{$kebabPlural}.index')->with('success', 'اطلاعات با موفقیت ذخیره شد.');
    }

    public function edit({$name} \${$name})
    {
        return view('{$kebabPlural}.edit', ['item' => \${$name}]);
    }

    public function update({$name}Request \$request, {$name} \${$name})
    {
        \${$name}->update(\$request->validated());
        return redirect()->route('{$kebabPlural}.index')->with('success', 'اطلاعات با موفقیت ویرایش شد.');
    }

    public function destroy({$name} \${$name})
    {
        \${$name}->delete();
        return redirect()->route('{$kebabPlural}.index')->with('success', 'آیتم با موفقیت حذف شد.');
    }
}
PHP;
        }

        File::put($file, $template);
        $this->line("✔ Controller created: [app/Http/Controllers/{$name}Controller.php]");
    }

    protected function createViews(string $name, string $kebabPlural): void
    {
        $dir = resource_path("views/{$kebabPlural}");
        File::ensureDirectoryExists($dir);

        // 1. index.blade.php
        $indexBlade = <<<BLADE
<x-default-layout title="مدیریت {$name}">
    <x-card title="مدیریت {$name}">
        <x-slot:headerActions>
            <x-button variant="primary" icon="fa-plus" href="{{ route('{$kebabPlural}.create') }}">
                افزودن جدید
            </x-button>
        </x-slot:headerActions>

        <div class="table-responsive">
            <table class="table table-hover align-middle">
                <thead class="table-light">
                    <tr>
                        <th>#</th>
                        <th>عنوان</th>
                        <th>وضعیت</th>
                        <th>تاریخ ایجاد</th>
                        <th class="text-end">عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse(\$items as \$item)
                        <tr>
                            <td>{{ \$loop->iteration }}</td>
                            <td>{{ \$item->title }}</td>
                            <td>
                                <x-badge :variant="\$item->isActive() ? 'success' : 'danger'" :dot="true">
                                    {{ \$item->isActive() ? 'فعال' : 'غیرفعال' }}
                                </x-badge>
                            </td>
                            <td>{{ jdate('Y/m/d', \$item->created_at) }}</td>
                            <td class="text-end">
                                <x-button size="sm" variant="light" icon="fa-edit" href="{{ route('{$kebabPlural}.edit', \$item) }}">
                                    ویرایش
                                </x-button>
                                <form action="{{ route('{$kebabPlural}.destroy', \$item) }}" method="POST" class="d-inline">
                                    @csrf
                                    @method('DELETE')
                                    <x-button size="sm" variant="outline-danger" icon="fa-trash" type="submit" confirm="آیا از حذف مطمئنید؟">
                                        حذف
                                    </x-button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="text-center py-4 text-muted">
                                موردی یافت نشد.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <div class="mt-3">
            {{ \$items->links() }}
        </div>
    </x-card>
</x-default-layout>
BLADE;
        File::put("{$dir}/index.blade.php", $indexBlade);

        // 2. create.blade.php
        $createBlade = <<<BLADE
<x-default-layout title="ایجاد {$name}">
    <x-card title="ایجاد {$name}">
        <form action="{{ route('{$kebabPlural}.store') }}" method="POST" data-validate>
            @csrf

            <x-text-input name="title" label="عنوان" :required="true" placeholder="عنوان را وارد کنید" />
            <x-textarea name="description" label="توضیحات" :rows="4" placeholder="توضیحات اختیاری..." />
            <x-checkbox name="status" label="فعال باشد" :checked="true" />

            <div class="d-flex gap-2 mt-4">
                <x-button type="submit" variant="primary" icon="fa-save">
                    ذخیره اطلاعات
                </x-button>
                <x-button variant="light" href="{{ route('{$kebabPlural}.index') }}">
                    انصراف
                </x-button>
            </div>
        </form>
    </x-card>
</x-default-layout>
BLADE;
        File::put("{$dir}/create.blade.php", $createBlade);

        // 3. edit.blade.php
        $editBlade = <<<BLADE
<x-default-layout title="ویرایش {$name}">
    <x-card title="ویرایش {$name}">
        <form action="{{ route('{$kebabPlural}.update', \$item) }}" method="POST" data-validate>
            @csrf
            @method('PUT')

            <x-text-input name="title" label="عنوان" :value="\$item->title" :required="true" />
            <x-textarea name="description" label="توضیحات" :value="\$item->description" :rows="4" />
            <x-checkbox name="status" label="فعال باشد" :checked="\$item->isActive()" />

            <div class="d-flex gap-2 mt-4">
                <x-button type="submit" variant="primary" icon="fa-save">
                    بروزرسانی اطلاعات
                </x-button>
                <x-button variant="light" href="{{ route('{$kebabPlural}.index') }}">
                    انصراف
                </x-button>
            </div>
        </form>
    </x-card>
</x-default-layout>
BLADE;
        File::put("{$dir}/edit.blade.php", $editBlade);

        $this->line("✔ Blade views created in: [resources/views/{$kebabPlural}/]");
    }
}
