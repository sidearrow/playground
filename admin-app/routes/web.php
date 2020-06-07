<?php

use Illuminate\Support\Facades\Route;

Route::get('/', 'IndexController@index');

Route::get('/company', 'CompanyController@index');
Route::get('/company/{companyId}', 'CompanyController@detail');

Route::prefix('/group-station')->group(function () {
    Route::get('/', 'GroupStationController@index');
});
