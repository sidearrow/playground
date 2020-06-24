<?php

use App\Http\Controllers\Company\CompanyPatchController;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::post('/login', 'AuthController@login');
Route::get('/auth-check', 'AuthController@check');

Route::middleware([/*AuthMiddleware::class*/])->group(function () {
    Route::prefix('/company')->group(function () {
        Route::get('/', 'CompanyController@index');

        Route::get('/{companyId}', 'CompanyController@getOne');
        Route::patch('/{companyId}', 'Company\CompanyPatchController');

        Route::get('/{companyId}/line', 'CompanyController@getLines');
        Route::get('/{companyId}/statistics', 'CompanyController@getStatistics');
    });

    Route::prefix('/line')->group(function () {
        Route::get('/', 'LineController@getAll');
        Route::get('/{lineId}', 'LineController@getDetail');
    });

    Route::prefix('/station')->group(function () {
        Route::get('/', 'StationController@get');
        Route::put('/{stationId}/group-station', 'StationController@groupStationUpdate');
    });
});
