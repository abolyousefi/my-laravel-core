<?php

namespace MyLaravelCore\Commands;

use Illuminate\Console\Command;
use MyLaravelCore\Services\StubGenerator;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use ReflectionClass;

class StubsCommand extends Command
{
    protected $signature = 'core:stubs 
                            {--output=stubs : Directory where constructor-only stub files will be saved}
                            {--single : Also generate a single consolidated _ide_helper_stubs.php file}';
    protected $description = 'Generate clean, constructor-only PHP stubs for IDEs with zero source code exposure';

    public function handle(StubGenerator $generator): int
    {
        $this->newLine();
        $this->info("🛡️ Generating Constructor-Only IDE Stubs for MyLaravelCore...");
        $this->line("   Every stub contains full constructor parameters and types, with ZERO implementation code.");

        $outputDir = base_path($this->option('output'));
        if (str_contains(base_path(), 'testbench-core')) {
            $outputDir = getcwd() . DIRECTORY_SEPARATOR . $this->option('output');
        }

        if (!is_dir($outputDir)) {
            mkdir($outputDir, 0755, true);
        }

        $srcDir = realpath(__DIR__ . '/..');
        $classes = $this->discoverClasses($srcDir);

        $stubsGenerated = 0;
        $consolidatedContent = "<?php\n\n";
        $consolidatedContent .= "/**\n";
        $consolidatedContent .= " * MyLaravelCore - Constructor-Only IDE Stubs.\n";
        $consolidatedContent .= " * Auto-generated file providing full IDE autocompletion for classes and components.\n";
        $consolidatedContent .= " * Implementation details are completely hidden.\n";
        $consolidatedContent .= " */\n\n";

        foreach ($classes as $class) {
            $stubContent = $generator->generateClassStub($class);
            if (!$stubContent) {
                continue;
            }

            // Save individual file
            $ref = new ReflectionClass($class);
            $relPath = str_replace(['MyLaravelCore\\', '\\'], ['', DIRECTORY_SEPARATOR], $class) . '.php';
            $filePath = $outputDir . DIRECTORY_SEPARATOR . $relPath;

            $fileDir = dirname($filePath);
            if (!is_dir($fileDir)) {
                mkdir($fileDir, 0755, true);
            }

            file_put_contents($filePath, $stubContent);

            // Add to consolidated stub
            $cleanStub = preg_replace('/^<\?php\s*/i', '', $stubContent);
            $consolidatedContent .= $cleanStub . "\n";

            $stubsGenerated++;
        }

        // Write consolidated stub in package root
        $consolidatedPath = dirname($outputDir) . DIRECTORY_SEPARATOR . '_ide_helper_stubs.php';
        file_put_contents($consolidatedPath, $consolidatedContent);

        $this->newLine();
        $this->info("✅ Successfully generated {$stubsGenerated} constructor-only stubs!");
        $this->line("   ➜ Directory stubs:     <fg=cyan>{$outputDir}</>");
        $this->line("   ➜ Consolidated stub:   <fg=cyan>{$consolidatedPath}</>");
        $this->comment("   IDEs (PhpStorm, VSCode, Intelephense) will now index the constructors with zero source code exposed.");
        $this->newLine();

        return self::SUCCESS;
    }

    /**
     * Discover all classes in src directory.
     *
     * @return array<class-string>
     */
    protected function discoverClasses(string $srcDir): array
    {
        $classes = [];
        $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($srcDir));

        foreach ($iterator as $file) {
            if ($file->isDir() || $file->getExtension() !== 'php') {
                continue;
            }

            $path = $file->getRealPath();
            $relPath = substr($path, strlen($srcDir) + 1);
            $class = 'MyLaravelCore\\' . str_replace([DIRECTORY_SEPARATOR, '.php'], ['\\', ''], $relPath);

            if (class_exists($class) || interface_exists($class) || trait_exists($class)) {
                $classes[] = $class;
            }
        }

        return $classes;
    }
}
