<?php

namespace MyLaravelCore\Commands;

use Illuminate\Console\Command;

class InstallCommand extends Command
{
    protected $signature = 'core:install {--force : Overwrite existing files}';
    protected $description = 'Install and publish core infrastructure configuration, assets, and views';

    public function handle(): int
    {
        $this->info('🚀 Installing My-Laravel Core Infrastructure...');

        $force = $this->option('force');

        $this->info('Publishing configuration...');
        $this->call('vendor:publish', [
            '--tag' => 'core-config',
            '--force' => $force,
        ]);

        $this->info('Publishing assets (CSS & JS)...');
        $this->call('vendor:publish', [
            '--tag' => 'core-assets',
            '--force' => $force,
        ]);

        $this->info('Publishing Blade component views...');
        $this->call('vendor:publish', [
            '--tag' => 'core-views',
            '--force' => $force,
        ]);

        $this->newLine();
        $this->info('✅ Core Infrastructure successfully installed!');
        $this->line('You can now use Blade components like <x-text-input>, <x-card>, <x-button> and core helpers like jdate(), toman(), etc.');

        return self::SUCCESS;
    }
}
