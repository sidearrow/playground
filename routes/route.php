<?php

use Illuminate\Support\Facades\Route;

Route::get('company', 'CompanyIndexController');
Route::get('company/{companyCode}/line', 'CompanyLineIndexController');
Route::get('line', 'LineController');
Route::get('line/{lineCode}', 'LineDetailController');

Route::post('station/bulk-update', 'StationBulkUpdateController');
