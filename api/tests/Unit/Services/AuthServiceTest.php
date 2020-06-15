<?php

namespace Tests\Unit\Services;

use App\Services\AuthService;
use ReflectionClass;
use Tests\TestCase;

class AuthServiceTest extends TestCase
{
    public function testAll()
    {
        $authService = new AuthService();

        $ref = new ReflectionClass($authService);

        $authServicePropMail = $ref->getProperty('mail');
        $authServicePropMail->setAccessible(true);
        $authServicePropMail->setValue($authService, 'mail');

        $authServicePropPassword = $ref->getProperty('password');
        $authServicePropPassword->setAccessible(true);
        $authServicePropPassword->setValue($authService, password_hash('password', PASSWORD_DEFAULT));

        $this->assertTrue($authService->login('mail', 'password'));
        $this->assertTrue($authService->isLogin());

        $authService->logout();

        $this->assertFalse($authService->isLogin());

        $this->assertFalse($authService->login('mail', 'passwoooord'));
        $this->assertFalse($authService->isLogin());
    }
}
