<?php

class Node
{
    private $path;

    /** @var Node[] $children */
    private $children;

    public function __construct(string $path, array $children = [])
    {
        $this->path = $path;
        $this->children = $children;
    }
}
