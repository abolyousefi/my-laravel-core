<?php

namespace MyLaravelCore\Commands;

use Illuminate\Console\Command;

class InstallCommand extends Command
{
    protected $signature = 'core:install 
                            {--force : Overwrite existing published files}
                            {--views : Explicitly publish internal component views (not recommended, views run sealed from vendor)}';

    protected $description = 'Install and setup core infrastructure configuration, assets, and IDE metadata';

    public function handle(): int
    {
        $this->info('🚀 Installing My-Laravel Core Infrastructure...');

        $force = $this->option('force');

        // 1. Publish Configuration
        $this->info('Publishing configuration...');
        $this->call('vendor:publish', [
            '--tag' => 'core-config',
            '--force' => $force,
        ]);

        // 2. Publish Public Assets (CSS & JS)
        $this->info('Publishing assets (CSS & JS)...');
        $this->call('vendor:publish', [
            '--tag' => 'core-assets',
            '--force' => $force,
        ]);

        // 3. Views stay sealed in vendor by default (clean architecture)
        if ($this->option('views')) {
            $this->warn('Publishing Blade component views into project resources (override mode)...');
            $this->call('vendor:publish', [
                '--tag' => 'core-views',
                '--force' => $force,
            ]);
        } else {
            $this->line('🔒 Core views are cleanly encapsulated inside vendor (no clutter in your project).');
        }

        // 4. Generate IDE Helper
        $this->info('Generating IDE Blade Component Helper...');
        $this->call('core:ide');

        $this->newLine();
        $this->info('✅ Core Infrastructure successfully installed!');
        $this->line('You can now use Blade components like <x-card>, <x-table>, <x-text-input> and core helpers like jdate(), toman(), etc.');

        return self::SUCCESS;
    }
}
