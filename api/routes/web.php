<?php

use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::get('/login', 'AuthController@login');
Route::post('/login', 'AuthController@loginPost');

Route::middleware([AuthMiddleware::class])->group(function () {
    Route::get('/', 'IndexController@index');

    Route::get('/company', 'CompanyController@index');
    Route::get('/company/{companyId}', 'CompanyController@detail');

    Route::get('/line', 'LineController@index');
    Route::get('/line/{lineId}', 'LineController@detail');

    Route::prefix('/station')->group(function () {
        Route::get('/', 'StationController@index');
        Route::post('/{stationId}/station-group/update', 'StationController@stationGroupUpdate');
        Route::post('/{stationId}/station-group/delete', 'StationController@stationGroupDelete');
    });

    Route::prefix('/export')->group(function () {
        Route::get('/', 'ExportController@index');
        Route::get('/{responseType}-{format}-{tableName}', 'ExportController@export')
            ->where(['responseType' => '(file|text)', 'format' => '(csv|tsv)']);
    });

    Route::prefix('/import')->group(function () {
        Route::get('/', 'ImportController@index');
        Route::post('/', 'ImportController@import');
    });
});
