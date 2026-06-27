<?php
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Setup environment for Vercel Serverless Function (Read-Only Filesystem)
$_SERVER['LARAVEL_STORAGE_PATH'] = '/tmp/storage';

// Ensure required tmp directories exist
$directories = [
    '/tmp/storage/framework/views',
    '/tmp/storage/framework/cache',
    '/tmp/storage/framework/cache/data',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/logs',
    '/tmp/bootstrap/cache'
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