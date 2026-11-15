<?php

namespace MyLaravelCore\Commands;

use Illuminate\Console\Command;

class DocsServeCommand extends Command
{
    protected $signature = 'core:docs 
                            {--port=8000 : Port to serve documentation on} 
                            {--host=0.0.0.0 : Host address (use 0.0.0.0 for LAN access)} 
                            {--public : Bind to 0.0.0.0 to allow team members on the same network to access}';
    protected $description = 'Serve the interactive documentation website locally or across the network for your team';

    public function handle(): int
    {
        $port = (int) $this->option('port');
        $host = $this->option('public') ? '0.0.0.0' : $this->option('host');
        $docsPath = realpath(__DIR__ . '/../../docs');

        if (!$docsPath || !is_dir($docsPath)) {
            $this->error("Documentation directory not found at [{$docsPath}]");
            return self::FAILURE;
        }

        $routerScript = $docsPath . DIRECTORY_SEPARATOR . 'server.php';
        $localUrl = "http://127.0.0.1:{$port}";
        $lanIp = gethostbyname(gethostname());
        $lanUrl = ($lanIp && !str_starts_with($lanIp, '127.')) ? "http://{$lanIp}:{$port}" : null;

        $this->newLine();
        $this->info("  📚 My Laravel Core Documentation Server");
        $this->line("  ────────────────────────────────────────────────────────────");
        $this->line("  ➜  <fg=green;options=bold>Local:</>    <fg=cyan>{$localUrl}</>");
        if ($lanUrl) {
            $this->line("  ➜  <fg=green;options=bold>Network:</>  <fg=yellow>{$lanUrl}</>  <fg=gray>(Share with team members on LAN / Wi-Fi)</>");
        }
        $this->line("  ────────────────────────────────────────────────────────────");
        $this->comment("  Press [Ctrl+C] to stop the server.");
        $this->newLine();

        // Automatically open browser on Windows/Mac/Linux if possible
        if (PHP_OS_FAMILY === 'Windows') {
            exec("start {$localUrl}");
        } elseif (PHP_OS_FAMILY === 'Darwin') {
            exec("open {$localUrl}");
        } elseif (PHP_OS_FAMILY === 'Linux') {
            exec("xdg-open {$localUrl} > /dev/null 2>&1 &");
        }

        passthru("php -S {$host}:{$port} -t \"{$docsPath}\" \"{$routerScript}\"");

        return self::SUCCESS;
    }
}
