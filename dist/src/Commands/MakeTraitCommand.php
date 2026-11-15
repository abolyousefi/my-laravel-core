<?php

namespace MyLaravelCore\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class MakeTraitCommand extends Command
{
    protected $signature = 'make:core-trait {name : Name of the Trait (e.g. HasDiscount)}';
    protected $description = 'Create a new reusable Eloquent or generic Trait';

    public function handle(): int
    {
        $name = trim($this->argument('name'));
        $studlyName = Str::studly($name);

        $dir = app_path('Traits');
        File::ensureDirectoryExists($dir);
        $file = "{$dir}/{$studlyName}.php";

        if (File::exists($file)) {
            $this->error("Trait {$studlyName} already exists!");
            return self::FAILURE;
        }

        $template = <<<PHP
<?php

namespace App\Traits;

trait {$studlyName}
{
    /**
     * Boot the {$studlyName} trait.
     */
    protected static function boot{$studlyName}(): void
    {
        // Model lifecycle hooks
    }
}
PHP;

        File::put($file, $template);
        $this->info("✔ Trait created successfully: [app/Traits/{$studlyName}.php]");

        return self::SUCCESS;
    }
}
