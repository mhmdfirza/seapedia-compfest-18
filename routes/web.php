<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\RoleController;
use App\Http\Controllers\Dashboard\BuyerDashboardController;
use App\Http\Controllers\Dashboard\SellerDashboardController;
use App\Http\Controllers\Dashboard\DriverDashboardController;
use App\Http\Controllers\Dashboard\AdminDashboardController;
use App\Http\Controllers\ProfileController;

Route::get('/', [\App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/products', [\App\Http\Controllers\ProductController::class, 'index'])->name('products.index');
Route::get('/products/{id}', [\App\Http\Controllers\ProductController::class, 'show'])->name('products.show');

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    
    Route::get('/select-role', [RoleController::class, 'showSelectRole'])->name('select-role');
    Route::post('/select-role', [RoleController::class, 'selectRole'])->name('select-role.store');
    Route::post('/switch-role', [RoleController::class, 'switchRole'])->name('switch-role');

    Route::prefix('dashboard/buyer')->name('dashboard.buyer.')->middleware([\App\Http\Middleware\EnsureRoleIsSelected::class, \App\Http\Middleware\EnsureActiveRole::class . ':buyer'])->group(function () {
        Route::get('/', [BuyerDashboardController::class, 'index'])->name('index');
        Route::get('/profile', [ProfileController::class, 'show'])->name('profile');
    });

    Route::prefix('dashboard/seller')->name('dashboard.seller.')->middleware([\App\Http\Middleware\EnsureRoleIsSelected::class, \App\Http\Middleware\EnsureActiveRole::class . ':seller'])->group(function () {
        Route::get('/', [SellerDashboardController::class, 'index'])->name('index');
        Route::get('/profile', [ProfileController::class, 'show'])->name('profile');
    });

    Route::prefix('dashboard/driver')->name('dashboard.driver.')->middleware([\App\Http\Middleware\EnsureRoleIsSelected::class, \App\Http\Middleware\EnsureActiveRole::class . ':driver'])->group(function () {
        Route::get('/', [DriverDashboardController::class, 'index'])->name('index');
        Route::get('/profile', [ProfileController::class, 'show'])->name('profile');
    });

    Route::prefix('dashboard/admin')->name('dashboard.admin.')->middleware([\App\Http\Middleware\EnsureActiveRole::class . ':admin'])->group(function () {
        Route::get('/', [AdminDashboardController::class, 'index'])->name('index');
    });
});
