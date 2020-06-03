<?php

use Illuminate\Support\Facades\Route;

Route::prefix('/company')->group(function () {
    Route::get('/', 'CompanyController@index');

    Route::get('/code={companyCode}', 'CompanyController@getDetailByCode');
    Route::get('/{companyId}', 'CompanyController@detail');

    Route::get('/code={companyId}/line', 'CompanyController@getLinesByCode');
    Route::get('/{companyId}/line', 'CompanyController@getLines');
});

Route::prefix('/line')->group(function () {
    Route::get('/', 'LineController@getAll');
    Route::get('/{lineId}', 'LineController@getDetail');
});
