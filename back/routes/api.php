<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CaracteristiqueController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\ProduitController;
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
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/succursales/{id}/search/{code}', [ProduitController::class, 'search']);
    Route::post('commande', [CommandeController::class, 'store']);

});

Route::get('/product/succursales/{succursale}', [ProduitController::class, 'getProduitsSuccursale']);
Route::get('/all', [ProduitController::class, 'all']);
Route::get('/categorieProduit/{categorieId}', [ProduitController::class, 'getMarqueCategorieId']);
Route::get('/carateristique/suggest-value/{idCarat}', [CaracteristiqueController::class, 'getValue']);
Route::get('text', [ProduitController::class, 'generateCode']);
Route::apiResource('produit', ProduitController::class)->only(['index','store','destroy','update']);