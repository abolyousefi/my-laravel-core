<?php

$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? ''
);

$publicPath = __DIR__;
$filePath = $publicPath . $uri;

// If request is for an existing static file, serve it directly
if ($uri !== '/' && file_exists($filePath) && !is_dir($filePath)) {
    return false;
}

// Support requests for resources directory if needed
if (str_starts_with($uri, '/resources/')) {
    $parentFile = dirname(__DIR__) . $uri;
    if (file_exists($parentFile) && !is_dir($parentFile)) {
        $ext = strtolower(pathinfo($parentFile, PATHINFO_EXTENSION));
        $mimes = [
            'css' => 'text/css; charset=UTF-8',
            'js' => 'application/javascript; charset=UTF-8',
            'svg' => 'image/svg+xml',
            'png' => 'image/png',
            'jpg' => 'image/jpeg',
            'woff' => 'font/woff',
            'woff2' => 'font/woff2',
            'ttf' => 'font/ttf',
        ];
        header('Content-Type: ' . ($mimes[$ext] ?? 'text/plain'));
        readfile($parentFile);
        exit;
    }
}

// Serve documentation single page app
header('Content-Type: text/html; charset=UTF-8');
require $publicPath . '/index.html';
