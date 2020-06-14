<?php

namespace App\Services;

class AuthService
{
    private const SESSION_KEY = 'is_login';

    public function isLogin(): bool
    {
        return session()->get(self::SESSION_KEY) === true;
    }

    public function login(string $password): bool
    {
        if (password_verify($password, config('app.password')) === true) {
            session()->put(self::SESSION_KEY, true);
            return true;
        }

        return false;
    }

    public function logout(): void
    {
        session()->put(self::SESSION_KEY, false);
    }
}
