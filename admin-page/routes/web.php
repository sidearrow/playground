<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('/company')->group(function () {
    Route::get('/', 'CompanyController@index');
});
