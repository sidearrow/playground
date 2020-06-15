<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;

class AuthService
{
    private const CACHE_KEY = 'token';

    private string $mail;
    private string $password;

    public function __construct()
    {
        $this->mail = config('app.auth_mail');
        $this->password = config('app.auth_password');
    }

    public function isLogin(string $token): bool
    {
        return Cache::get(self::CACHE_KEY) === $token;
    }

    public function login(string $mail, string $password): ?string
    {
        $res = $mail === $this->mail
            && password_verify($password, $this->password) === true;

        if ($res === false) {
            return null;
        }

        $token = md5(uniqid(rand(), true));

        Cache::set(self::CACHE_KEY, $token);

        return $token;
    }

    public function logout(): void
    {
        Cache::set(self::CACHE_KEY, null);
    }
}
