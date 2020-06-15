<?php

namespace App\Services;

class AuthService
{
    private const SESSION_KEY = 'is_login';

    private string $mail;
    private string $password;

    public function __construct()
    {
        $this->mail = config('app.auth_mail');
        $this->password = config('app.auth_password');
    }

    public function isLogin(): bool
    {
        return session()->get(self::SESSION_KEY) === true;
    }

    public function login(string $mail, string $password): bool
    {
        $res = $mail === $this->mail
            && password_verify($password, $this->password) === true;

        session()->put(self::SESSION_KEY, $res);

        return $res;
    }

    public function logout(): void
    {
        session()->put(self::SESSION_KEY, false);
    }
}
