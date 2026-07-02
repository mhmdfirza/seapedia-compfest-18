<?php
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// ── Vercel Serverless: Force HTTPS URL generation ──────────────────────────
// Vercel terminates SSL at the edge. PHP sees HTTP, but all public URLs must
// be HTTPS. We force the SERVER vars so Laravel/Vite generate https:// links.
$_SERVER['HTTPS'] = 'on';
$_SERVER['SERVER_PORT'] = 443;

// ── Vercel Serverless: Redirect writable paths to /tmp ─────────────────────
$_SERVER['LARAVEL_STORAGE_PATH'] = '/tmp/storage';

$directories = [
    '/tmp/storage/framework/views',
    '/tmp/storage/framework/cache',
    '/tmp/storage/framework/cache/data',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/logs',
    '/tmp/bootstrap/cache',
];

foreach ($directories as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0777, true);
    }
}

// Register the Composer autoloader
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel
$app = require_once __DIR__.'/../bootstrap/app.php';

// Override bootstrap cache path to /tmp
$app->useBootstrapPath('/tmp/bootstrap');

// Handle the request
$app->handleRequest(Request::capture());