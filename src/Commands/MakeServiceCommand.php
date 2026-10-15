<?php

namespace MyLaravelCore\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class MakeServiceCommand extends Command
{
    protected $signature = 'make:core-service {name : Name of the Service class (e.g. OrderService)}';
    protected $description = 'Create a new business service class';

    public function handle(): int
    {
        $name = trim($this->argument('name'));
        $studlyName = Str::studly($name);
        if (!str_ends_with($studlyName, 'Service')) {
            $studlyName .= 'Service';
        }

        $dir = app_path('Services');
        File::ensureDirectoryExists($dir);
        $file = "{$dir}/{$studlyName}.php";

        if (File::exists($file)) {
            $this->error("Service {$studlyName} already exists!");
            return self::FAILURE;
        }

        $template = <<<PHP
<?php

namespace App\Services;

class {$studlyName}
{
    public function __construct()
    {
        // Inject dependencies here
    }

    /**
     * Execute service operation.
     */
    public function execute(array \$data = []): mixed
    {
        // Business logic here
        return true;
    }
}
PHP;

        File::put($file, $template);
        $this->info("✔ Service class created successfully: [app/Services/{$studlyName}.php]");

        return self::SUCCESS;
    }
}
