<?php

use Illuminate\Support\Facades\Route;

Route::prefix('/company')->group(function () {
    Route::get('/', 'CompanyController@index');
});

Route::prefix('/line')->group(function () {
    Route::get('/', 'LineController@getAll');
    Route::get('/{lineId}', 'LineController@getDetail');
});
