<?php

namespace Tests;

use Closure;
use PHPUnit\Framework\TestCase;
use Src\Node;

class NodeTest extends TestCase
{
    public function testInsert()
    {
        Closure::bind(function () {
            $n = new Node('');

            $n->insert('GET', ['bbb'], 'action_aaa');
            $this->assertArrayHasKey('bbb', $n->children);
            $this->assertSame($n->children['bbb']->isEnd, true);

            $n->insert('GET', [':id'], 'action_id');
            $this->assertArrayHasKey(':', $n->children);
            $this->assertSame($n->children[':']->isEnd, true);
            $this->assertSame($n->children[':']->paramNames[0], 'id');

            $n->insert('GET', [':id2', 'aaa'], 'action_id2_aaa');
            $this->assertArrayHasKey(':', $n->children);
            $this->assertSame($n->children[':']->isEnd, true);
            $this->assertArrayHasKey('aaa', $n->children[':']->children);
            $this->assertSame($n->children[':']->children['aaa']->paramNames[0], 'id2');
            $this->assertSame($n->children[':']->children['aaa']->action, 'action_id2_aaa');
            $this->assertSame($n->children[':']->children['aaa']->isEnd, true);
            $this->assertSame($n->children[':']->children['aaa']->paramNames[0], 'id2');

            $n->insert('GET', ['wild-card', '*wildCard'], 'action_wild_card');
            $targetNode = $n->children['wild-card'];
            $this->assertArrayHasKey('*', $targetNode->children);
            $targetNode = $targetNode->children['*'];
            $this->assertSame($targetNode->isEnd, true);
            $this->assertSame($targetNode->action, 'action_wild_card');
            $this->assertSame($targetNode->paramNames[0], 'wildCard');
        }, $this, Node::class)->__invoke();
    }

    public function testSearch()
    {
        $n = new Node('');
        $n->insert('GET', ['user'], 'userIndex');
        $n->insert('POST', ['user', 'create'], 'userCreate');
        $n->insert('GET', ['user', ':userId'], 'userDetail');
        $n->insert('POST', ['user', ':userId', 'edit'], 'userEdit');
        $n->insert('GET', ['file', '*filePath'], 'file');

        $res = $n->search('GET', ['user']);
        $this->assertSame('userIndex', $res->action);
        $this->assertSame([], $res->params);

        $res = $n->search('GET', ['user', 'user_id']);
        $this->assertSame('userDetail', $res->action);
        $this->assertSame(['userId' => 'user_id'], $res->params);

        $res = $n->search('GET', ['file', 'aaa', 'bbb', 'ccc']);
        $this->assertSame('file', $res->action);
        $this->assertSame(['filePath' => 'aaa/bbb/ccc'], $res->params);
    }
}
