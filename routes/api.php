<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\AppReviewController;
use App\Http\Controllers\ProfileController;

Route::prefix('v1')->name('api.v1.')->group(function () {
    
    Route::post('/auth/login', [AuthController::class, 'login'])->name('auth.login');
    Route::post('/auth/register', [AuthController::class, 'register'])->name('auth.register');
    
    Route::get('/app-reviews', [AppReviewController::class, 'index'])->name('app-reviews.index');
    Route::post('/app-reviews', [AppReviewController::class, 'store'])->name('app-reviews.store');

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/auth/logout', [AuthController::class, 'logout'])->name('auth.logout');
        Route::get('/auth/me', [AuthController::class, 'me'])->name('auth.me');
        
        Route::get('/roles', [RoleController::class, 'getRoles'])->name('roles.index');
        Route::post('/roles/select', [RoleController::class, 'selectRole'])->name('roles.select');
        
        Route::get('/profile', [AuthController::class, 'me'])->name('profile');
    });
});
