<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    private AuthService $authService;

    public function __construct()
    {
        $this->authService = new AuthService();
    }

    public function login(Request $request)
    {
        $mail = $request->json('mail');
        $password = $request->json('password');

        $token = null;
        if ($mail !== null && $password !== null) {
            $token = $this->authService->login($mail, $password);
        }

        if ($token === null) {
            abort(401);
        }

        return ['token' => $token];
    }

    public function check(Request $request)
    {
        $token = $request->bearerToken();

        if ($token === null || !$this->authService->isLogin($token)) {
            abort(401);
        }

        return ['status' => true];
    }
}
