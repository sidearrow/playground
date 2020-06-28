<?php

namespace App\Http\Middleware;

use App\Services\AuthService;
use Closure;
use Illuminate\Http\Request;

class AuthMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (config('app.env') === 'production') {
            $token = $request->bearerToken();
            if ($token === null) {
                abort(401);
            }

            $authServie = new AuthService();
            if (!$authServie->isLogin($token)) {
                abort(401);
            }
        }

        return $next($request);
    }
}
