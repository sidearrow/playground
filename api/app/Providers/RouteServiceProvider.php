<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    protected $namespace = 'App\Http\Controllers';

    public const HOME = '/home';

    public function map()
    {
        $this->mapApiRoutes();
    }

    protected function mapApiRoutes()
    {
        Route::middleware('api')
            ->namespace('App\Http\Controllers')
            ->group(base_path('routes/api.php'));
    }
}
