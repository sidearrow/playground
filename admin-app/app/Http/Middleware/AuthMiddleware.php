<?php

namespace App\Http\Middleware;

use App\Services\AuthService;
use Closure;

class AuthMiddleware
{
    public function handle($request, Closure $next)
    {
        $authServie = new AuthService();

        if (!$authServie->isLogin()) {
            return redirect('/login');
        }

        return $next($request);
    }
}
