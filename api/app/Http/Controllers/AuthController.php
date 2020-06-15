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

        $status = false;
        if ($mail !== null && $password !== null) {
            $status = $this->authService->login($mail, $password);
        }

        return ['status' => $status];
    }
}
