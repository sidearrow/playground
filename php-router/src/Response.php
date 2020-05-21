<?php

namespace Src;

class Response
{
    public $action;

    public $params;

    public function __construct(string $action, array $params)
    {
        $this->action = $action;
        $this->params = $params;
    }
}
