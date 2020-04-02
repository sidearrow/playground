<?php

namespace Src;

use Exception;

class Router
{
    private const SLASH = '/';

    /** @var Node $tree */
    private $tree;

    public function __construct()
    {
        $this->tree = new Node('');
    }

    private function regist(string $method, string $path, string $action): void
    {
        if ($path[0] !== self::SLASH) {
            throw new Exception();
        }

        $this->tree->insert(
            $method,
            explode(self::SLASH, substr($path, 1)),
            $action
        );
    }

    public function dispatch(string $method, string $uri): Response
    {
        return $this->tree->search($method, explode(self::SLASH, ltrim($uri, 1)));
    }

    public function get(string $path, string $action): void
    {
        $this->regist(HttpMethod::GET, $path, $action);
    }

    public function post(string $path, string $action): void
    {
        $this->regist(HttpMethod::POST, $path, $action);
    }

    public function head(string $path, string $action): void
    {
        $this->regist(HttpMethod::HEAD, $path, $action);
    }

    public function options(string $path, string $action): void
    {
        $this->regist(HttpMethod::OPTIONS, $path, $action);
    }

    public function put(string $path, string $action): void
    {
        $this->regist(HttpMethod::PUT, $path, $action);
    }

    public function patch(string $path, string $action): void
    {
        $this->regist(HttpMethod::PATCH, $path, $action);
    }

    public function delete(string $path, string $action): void
    {
        $this->regist(HttpMethod::DELETE, $path, $action);
    }
}
