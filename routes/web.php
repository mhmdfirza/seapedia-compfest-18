<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Guest Routes
Route::get('/', function () {
    return Inertia::render('welcome');
});

Route::get('/products', function () {
    return Inertia::render('products/index');
});

Route::get('/products/{id}', function ($id) {
    // Simulating fetching a specific product
    return Inertia::render('products/show', ['id' => $id]);
});

Route::get('/login', function () {
    return Inertia::render('auth/login');
});

Route::get('/register', function () {
    return Inertia::render('auth/register');
});

Route::get('/roleselection', function () {
    return Inertia::render('auth/roleselection');
});

// Buyer Routes
Route::prefix('buyer')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('buyer/dashboard', ['name' => 'Ahmad']));
    Route::get('/address', fn() => Inertia::render('buyer/address'));
    Route::get('/cart', fn() => Inertia::render('buyer/cart'));
    Route::get('/checkout', fn() => Inertia::render('buyer/checkout'));
    Route::get('/orders', fn() => Inertia::render('buyer/orders'));
    Route::get('/wallet', fn() => Inertia::render('buyer/wallet'));
});

// Driver Routes
Route::prefix('driver')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('driver/dashboard'));
    Route::get('/earnings', fn() => Inertia::render('driver/earnings'));
    Route::get('/jobs', fn() => Inertia::render('driver/jobs'));
});

// Seller Routes
Route::prefix('seller')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('seller/dashboard'));
    Route::get('/orders', fn() => Inertia::render('seller/orders'));
    Route::get('/orders/show', fn() => Inertia::render('seller/orders/show'));
    Route::get('/products/create', fn() => Inertia::render('seller/products/create'));
    Route::get('/products/edit', fn() => Inertia::render('seller/products/edit'));
    Route::get('/products/index', fn() => Inertia::render('seller/products/index'));
    Route::get('/store/edit', fn() => Inertia::render('seller/store/edit'));
});