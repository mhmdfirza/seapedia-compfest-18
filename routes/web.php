<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ─── Public Routes ───────────────────────────────────────────────────────────

Route::get('/', fn() => Inertia::render('welcome'));

Route::get('/products', fn() => Inertia::render('products/index'));

Route::get('/products/{id}', fn($id) => Inertia::render('products/show', ['id' => $id]));

Route::get('/login', fn() => Inertia::render('auth/login'));

Route::get('/register', fn() => Inertia::render('auth/register'));

// Hanya untuk user yang sudah login tapi belum memilih role (proteksi via React)
Route::get('/select-role', fn() => Inertia::render('auth/roleselection'));

// ─── Error Pages ─────────────────────────────────────────────────────────────

Route::get('/404', fn() => Inertia::render('errors/not-found'));
Route::get('/403', fn() => Inertia::render('errors/unauthorized'));

// ─── Buyer Dashboard (/dashboard/buyer/*) ────────────────────────────────────

Route::prefix('dashboard/buyer')->group(function () {
    Route::get('/', fn() => Inertia::render('buyer/dashboard'));
    Route::get('/profile', fn() => Inertia::render('buyer/profile'));
    Route::get('/wallet', fn() => Inertia::render('buyer/wallet/index'));
    Route::get('/address', fn() => Inertia::render('buyer/address/index'));
    Route::get('/cart', fn() => Inertia::render('buyer/cart/index'));
    Route::get('/orders', fn() => Inertia::render('buyer/orders/index'));
    Route::get('/orders/{id}', fn($id) => Inertia::render('buyer/orders/show', ['id' => $id]));
});

// ─── Seller Dashboard (/dashboard/seller/*) ──────────────────────────────────

Route::prefix('dashboard/seller')->group(function () {
    Route::get('/', fn() => Inertia::render('seller/dashboard'));
    Route::get('/profile', fn() => Inertia::render('seller/profile'));
    Route::get('/products', fn() => Inertia::render('seller/products/index'));
    Route::get('/products/new', fn() => Inertia::render('seller/products/create'));
    Route::get('/orders', fn() => Inertia::render('seller/orders/index'));
    Route::get('/income', fn() => Inertia::render('seller/income'));
});

// ─── Driver Dashboard (/dashboard/driver/*) ──────────────────────────────────

Route::prefix('dashboard/driver')->group(function () {
    Route::get('/', fn() => Inertia::render('driver/dashboard'));
    Route::get('/profile', fn() => Inertia::render('driver/profile'));
    Route::get('/jobs', fn() => Inertia::render('driver/jobs/index'));
    Route::get('/active-job', fn() => Inertia::render('driver/active-job'));
    Route::get('/history', fn() => Inertia::render('driver/history'));
    Route::get('/earnings', fn() => Inertia::render('driver/earnings/index'));
});

// ─── Admin Dashboard (/dashboard/admin/*) ────────────────────────────────────

Route::prefix('dashboard/admin')->group(function () {
    Route::get('/', fn() => Inertia::render('admin/dashboard'));
    Route::get('/users', fn() => Inertia::render('admin/users/index'));
    Route::get('/stores', fn() => Inertia::render('admin/stores/index'));
    Route::get('/products', fn() => Inertia::render('admin/products/index'));
    Route::get('/orders', fn() => Inertia::render('admin/orders/index'));
    Route::get('/vouchers', fn() => Inertia::render('admin/vouchers/index'));
    Route::get('/promos', fn() => Inertia::render('admin/promos/index'));
    Route::get('/deliveries', fn() => Inertia::render('admin/deliveries/index'));
});

// ─── Fallback (404) ──────────────────────────────────────────────────────────

Route::fallback(fn() => Inertia::render('errors/not-found'));