<?php

namespace App\Http\Middleware;

use App\Services\AuthService;
use Closure;

class AuthMiddleware
{
    public function handle($request, Closure $next)
    {
        $token = $request->bearerToken();
        if ($token === null) {
            abort(401);
        }

        $authServie = new AuthService();
        if (!$authServie->isLogin($token)) {
            abort(401);
        }

        return $next($request);
    }
}
