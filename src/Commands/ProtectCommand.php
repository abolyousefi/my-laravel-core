<?php

namespace MyLaravelCore\Commands;

use Illuminate\Console\Command;
use MyLaravelCore\Services\CodeProtector;
use MyLaravelCore\Services\StubGenerator;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use ZipArchive;

class ProtectCommand extends Command
{
    protected $signature = 'core:protect 
                            {--output=dist : Target distribution directory for the protected package}
                            {--zip : Create a distributable .zip package archive}
                            {--stubs-only : Only generate constructor-only IDE stubs}';
    protected $description = 'Compile, obfuscate, and build a closed-source distribution with constructor-only IDE stubs';

    public function handle(CodeProtector $protector, StubGenerator $stubGen): int
    {
        $this->newLine();
        $this->info("🔒 Building Closed-Source Distribution for MyLaravelCore...");
        $this->line("   Source code will be obfuscated & sealed, while IDE stubs preserve full constructor autocomplete.");

        $targetDir = base_path($this->option('output'));
        if (str_contains(base_path(), 'testbench-core')) {
            $targetDir = getcwd() . DIRECTORY_SEPARATOR . $this->option('output');
        }

        // Step 1: Generate clean constructor stubs
        $this->call('core:stubs', [
            '--output' => $this->option('output') . '/stubs',
        ]);

        if ($this->option('stubs-only')) {
            return self::SUCCESS;
        }

        // Step 2: Prepare distribution directory structure
        $this->line("   📦 Copying config, views, and assets...");
        $this->copyDirectory(realpath(__DIR__ . '/../../config'), $targetDir . '/config');
        $this->copyDirectory(realpath(__DIR__ . '/../../resources'), $targetDir . '/resources');

        // Step 3: Obfuscate PHP files from src into targetDir/src
        $srcDir = realpath(__DIR__ . '/..');
        $destSrcDir = $targetDir . '/src';
        if (!is_dir($destSrcDir)) {
            mkdir($destSrcDir, 0755, true);
        }

        $filesCount = 0;
        $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($srcDir));
        foreach ($iterator as $file) {
            if ($file->isDir() || $file->getExtension() !== 'php') {
                continue;
            }

            $sourcePath = $file->getRealPath();
            $relPath = substr($sourcePath, strlen($srcDir) + 1);
            $targetPath = $destSrcDir . DIRECTORY_SEPARATOR . $relPath;

            $targetSubDir = dirname($targetPath);
            if (!is_dir($targetSubDir)) {
                mkdir($targetSubDir, 0755, true);
            }

            $originalCode = file_get_contents($sourcePath);
            $protectedCode = $protector->protectCode($originalCode);
            file_put_contents($targetPath, $protectedCode);

            $filesCount++;
        }

        // Step 4: Generate client distribution composer.json
        $composerJson = [
            'name' => 'my-laravel/core',
            'version' => '1.0.0',
            'description' => 'Enterprise-grade Core Infrastructure (Protected Distribution).',
            'type' => 'library',
            'license' => 'proprietary',
            'require' => [
                'php' => '^8.2',
                'illuminate/support' => '^10.0|^11.0|^12.0|^13.0',
                'illuminate/view' => '^10.0|^11.0|^12.0|^13.0',
                'illuminate/console' => '^10.0|^11.0|^12.0|^13.0',
                'illuminate/database' => '^10.0|^11.0|^12.0|^13.0',
                'illuminate/http' => '^10.0|^11.0|^12.0|^13.0',
                'illuminate/filesystem' => '^10.0|^11.0|^12.0|^13.0',
            ],
            'autoload' => [
                'psr-4' => [
                    'MyLaravelCore\\' => 'src/',
                ],
                'files' => [
                    'src/Helpers/helpers.php',
                ],
            ],
            'extra' => [
                'laravel' => [
                    'providers' => [
                        'MyLaravelCore\\Providers\\CoreServiceProvider',
                    ],
                    'aliases' => [
                        'Core' => 'MyLaravelCore\\Facades\\Core',
                    ],
                ],
            ],
        ];

        file_put_contents(
            $targetDir . '/composer.json',
            json_encode($composerJson, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
        );

        // Copy IDE helper file into distribution root
        $ideHelperSrc = realpath(__DIR__ . '/../../_ide_helper_blade.php');
        if ($ideHelperSrc && file_exists($ideHelperSrc)) {
            copy($ideHelperSrc, $targetDir . '/_ide_helper_blade.php');
        }

        $this->info("   🔐 Obfuscated {$filesCount} source files with proprietary shield!");

        // Step 5: Optional Zip Archive
        if ($this->option('zip')) {
            $zipPath = dirname($targetDir) . '/my-laravel-core-dist.zip';
            $this->createZipArchive($targetDir, $zipPath);
            $this->line("   📦 Zip package created at: <fg=green>{$zipPath}</>");
        }

        $this->newLine();
        $this->info("✨ Closed-source distribution ready at: {$targetDir}");
        $this->line("   ➜ Users receive: 100% functional package with zero readable source code.");
        $this->line("   ➜ IDEs inspect: Only clean constructors and method signatures in stubs.");
        $this->newLine();

        return self::SUCCESS;
    }

    /**
     * Recursively copy a directory.
     */
    protected function copyDirectory(string $src, string $dst): void
    {
        if (!is_dir($src)) {
            return;
        }

        $dir = opendir($src);
        @mkdir($dst, 0755, true);

        while (false !== ($file = readdir($dir))) {
            if ($file !== '.' && $file !== '..') {
                if (is_dir($src . '/' . $file)) {
                    $this->copyDirectory($src . '/' . $file, $dst . '/' . $file);
                } else {
                    copy($src . '/' . $file, $dst . '/' . $file);
                }
            }
        }

        closedir($dir);
    }

    /**
     * Create zip archive of directory.
     */
    protected function createZipArchive(string $sourceDir, string $outZipPath): void
    {
        @unlink($outZipPath);

        if (PHP_OS_FAMILY === 'Windows') {
            $cmd = "powershell -NoProfile -Command \"Compress-Archive -Path '{$sourceDir}\\*' -DestinationPath '{$outZipPath}' -Force\"";
            exec($cmd);
            return;
        }

        if (!class_exists(ZipArchive::class)) {
            return;
        }

        $zip = new ZipArchive();
        if ($zip->open($outZipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
            return;
        }

        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($sourceDir),
            RecursiveIteratorIterator::LEAVES_ONLY
        );

        foreach ($files as $file) {
            if (!$file->isDir()) {
                $filePath = $file->getRealPath();
                $relativePath = substr($filePath, strlen($sourceDir) + 1);
                $zip->addFile($filePath, $relativePath);
            }
        }

        $zip->close();
    }
}
