<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('/company')->group(function () {
    Route::get('/', 'CompanyController@index');
});

Route::prefix('/station-group')->group(function () {
    Route::get('/', 'StationGroupController@index');
});
