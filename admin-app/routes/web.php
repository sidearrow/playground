<?php

use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::get('/login', 'AuthController@login');
Route::post('/login', 'AuthController@loginPost');

Route::middleware([AuthMiddleware::class])->group(function () {
    Route::get('/', 'IndexController@index');

    Route::get('/company', 'CompanyController@index');
    Route::get('/company/{companyId}', 'CompanyController@detail');

    Route::prefix('/station')->group(function () {
        Route::get('/', 'StationController@index');
    });

    Route::prefix('/station-group')->group(function () {
        Route::get('/', 'StationGroupController@index');
        Route::post('/create', 'StationGroupController@create');
        Route::post('/update', 'StationGroupController@update');
        Route::post('/delete', 'StationGroupController@delete');
    });

    Route::prefix('/export')->group(function () {
        Route::get('/', 'ExportController@index');
        Route::get('/{tableName}', 'ExportController@export');
    });
});
