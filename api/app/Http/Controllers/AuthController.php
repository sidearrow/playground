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

    public function login()
    {
        return view('pages/login');
    }

    public function loginPost(Request $request)
    {
        $password = $request->post('password');

        if ($password === null || !$this->authService->login($password)) {
            return redirect('/login');
        }

        return redirect('/');
    }
}
