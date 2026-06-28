<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\AppReviewController;

// Public Reviews API
Route::get('/reviews', [AppReviewController::class, 'index']);
Route::post('/reviews', [AppReviewController::class, 'store']);

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', function (Request $request) {
            return $request->user()->load(['roles', 'activeRole', 'store']);
        });
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/switch-role', [RoleController::class, 'switchRole']);
    
    // Example of a role-protected route
    // Route::middleware('role:seller')->get('/seller/dashboard', function () { ... });
});
