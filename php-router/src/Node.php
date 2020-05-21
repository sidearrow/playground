<?php

namespace Src;

use Exception;

class Node
{
    private const CHAR_PARAM = ':';

    private const CHAR_WILD_CARD = '*';

    /** @var Node[] $children */
    private $children = [];

    private $isEnd = false;

    private $action = null;

    private $paramNames = [];

    private $allowMethods = [];

    public function __construct(string $path = null)
    {
        $this->path = $path;
    }

    public function insert(string $method, array $paths, string $action, array $paramNames = []): void
    {
        $headPath = array_shift($paths);

        if ($headPath[0] === self::CHAR_PARAM || $headPath[0] === self::CHAR_WILD_CARD) {
            $paramNames[] = substr($headPath, 1);
            $headPath = $headPath[0];
        }

        if (!isset($this->children[$headPath])) {
            $this->children[$headPath] = new Node($headPath);
        }

        $targetNode = $this->children[$headPath];
        if ($headPath === self::CHAR_WILD_CARD) {
            if (count($paths) > 0) {
                throw new Exception('Wildcard must be placed last.');
            }
            $targetNode->isEnd = true;
            $targetNode->paramNames = $paramNames;
            $targetNode->action = $action;
            $targetNode->allowMethods[] = $method;
            return;
        }

        if (count($paths) > 0) {
            $targetNode->insert($method, $paths, $action, $paramNames);
        } else {
            $targetNode->action = $action;
            $targetNode->isEnd = true;
            $targetNode->paramNames = $paramNames;
            $targetNode->allowMethods[] = $method;
        }
    }

    private function searchRecursive(array $paths, array $paramValues = [])
    {
        $originPaths = $paths;
        $headPath = array_shift($paths);

        if (isset($this->children[$headPath])) {
            if (count($paths) === 0) {
                if ($this->children[$headPath]->isEnd) {
                    return $this->children[$headPath]->getResponse($paramValues);
                }
                throw new Exception(404);
            }
            $res = $this->children[$headPath]->searchRecursive($paths, $paramValues);
            if ($res !== false) {
                return $res;
            }
        }

        if (isset($this->children[self::CHAR_PARAM])) {
            $paramValues[] = $headPath;
            if (count($paths) === 0) {
                if ($this->children[self::CHAR_PARAM]->isEnd) {
                    return $this->children[self::CHAR_PARAM]->getResponse($paramValues);
                }
                throw new Exception(404);
            }
            $res = $this->children[self::CHAR_PARAM]->searchRecursive($paths, $paramValues);
            if ($res !== false) {
                return $res;
            }
            array_shift($paramValues);
        }

        if (isset($this->children[self::CHAR_WILD_CARD])) {
            $paramValues[] = implode('/', $originPaths);
            return $this->children[self::CHAR_WILD_CARD]->getResponse($paramValues);
        }

        return false;
    }

    public function search(string $method, array $paths): Response
    {
        $res = $this->searchRecursive($paths);

        if ($res === false) {
            throw new Exception(404);
        }

        if (!in_array($method, $res['allowMethods'])) {
            throw new Exception(405);
        }

        return $res['response'];
    }

    private function getResponse(array $paramValues): array
    {
        $params = [];
        foreach ($paramValues as $i => $v) {
            $params[$this->paramNames[$i]] = $v;
        }

        return [
            'response' => new Response($this->action, $params),
            'allowMethods' => $this->allowMethods,
        ];
    }
}
