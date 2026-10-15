<?php

namespace MyLaravelCore\Commands;

use Illuminate\Console\Command;

class DocsServeCommand extends Command
{
    protected $signature = 'core:docs {--port=8080 : Port to serve documentation on}';
    protected $description = 'Serve the interactive documentation website locally';

    public function handle(): int
    {
        $port = (int) $this->option('port');
        $docsPath = realpath(__DIR__ . '/../../docs');

        if (!$docsPath || !is_dir($docsPath)) {
            $this->error("Documentation directory not found at [{$docsPath}]");
            return self::FAILURE;
        }

        $url = "http://localhost:{$port}";

        $this->newLine();
        $this->info("📚 My Laravel Core Documentation Server running at: {$url}");
        $this->line("Press [Ctrl+C] to stop the server.");
        $this->newLine();

        // Automatically open browser on Windows/Mac/Linux if possible
        if (PHP_OS_FAMILY === 'Windows') {
            exec("start {$url}");
        } elseif (PHP_OS_FAMILY === 'Darwin') {
            exec("open {$url}");
        } elseif (PHP_OS_FAMILY === 'Linux') {
            exec("xdg-open {$url} > /dev/null 2>&1 &");
        }

        passthru("php -S localhost:{$port} -t \"{$docsPath}\"");

        return self::SUCCESS;
    }
}
