<?php

namespace App;

trait TraitGetter
{
    public function __get(string $name)
    {
        return $this->$name;
    }
}
