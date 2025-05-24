<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\IstilahController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Admin Authentication
Route::post('/admin/register', [AdminAuthController::class, 'register']);
Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::post('/admin/logout', [AdminAuthController::class, 'logout'])->middleware('auth:sanctum');

// Protected Istilah Routes (Only for Admins)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/istilah', [IstilahController::class, 'store']);
    Route::delete('/istilah/{id}', [IstilahController::class, 'destroy']);
    Route::put('/istilah/{id}', [IstilahController::class, 'update']);
});

// Public Istilah Routes (View only)
Route::get('/istilah', [IstilahController::class, 'index']); // New route to get all istilah
Route::get('/istilah/{id}', [IstilahController::class, 'show']);
