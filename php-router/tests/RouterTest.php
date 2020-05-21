<?php

namespace Tests;

use Exception;
use PHPUnit\Framework\TestCase;
use Src\HttpMethod;
use Src\Router;

class RouterTest extends TestCase
{
    public function testRegist()
    {
        $r = new Router();
        $r->get('/get', 'get');
        $r->post('/post', 'post');
        $r->head('/head', 'head');
        $r->options('/options', 'options');
        $r->put('/put', 'put');
        $r->patch('/patch', 'patch');
        $r->delete('/delete', 'delete');

        $res = $r->dispatch(HttpMethod::GET, 'get');
        $this->assertSame('get', $res->action);

        $res = $r->dispatch(HttpMethod::POST, 'post');
        $this->assertSame('post', $res->action);

        $res = $r->dispatch(HttpMethod::HEAD, 'head');
        $this->assertSame('head', $res->action);

        $res = $r->dispatch(HttpMethod::OPTIONS, 'options');
        $this->assertSame('options', $res->action);

        $res = $r->dispatch(HttpMethod::PUT, 'put');
        $this->assertSame('put', $res->action);

        $res = $r->dispatch(HttpMethod::PATCH, 'patch');
        $this->assertSame('patch', $res->action);

        $res = $r->dispatch(HttpMethod::DELETE, 'delete');
        $this->assertSame('delete', $res->action);
    }

    public function testRegistException()
    {
        $this->expectException(Exception::class);

        $r = new Router();
        $r->get('get', 'get');
    }
}
