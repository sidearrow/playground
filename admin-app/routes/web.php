<?php

use Illuminate\Support\Facades\Route;

Route::get('/', 'IndexController@index');

Route::get('/company', 'CompanyController@index');
Route::get('/company/{companyId}', 'CompanyController@detail');

Route::prefix('/station-group')->group(function () {
    Route::get('/', 'StationGroupController@index');
    Route::post('/create', 'StationGroupController@create');
    Route::post('/update', 'StationGroupController@update');
    Route::post('/delete', 'StationGroupController@delete');
});
