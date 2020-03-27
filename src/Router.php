<?php

class Router
{
    private const GET = 'GET';
    private const POST = 'POST';
    private const HEAD = 'HEAD';
    private const OPTIONS = 'OPTIONS';
    private const PUT = 'PUT';
    private const PATCH = 'PATCH';
    private const DELETE = 'DELETE';

    /** @var (Tree|null)[] $trees */
    private $trees = [
        self::GET => null,
        self::POST => null,
        self::HEAD => null,
        self::OPTIONS => null,
        self::PUT => null,
        self::PATCH => null,
        self::DELETE => null,
    ];

    private function regist(string $method, string $path, $action): void
    {
        $this->trees[$method]->add($path);
    }
}
