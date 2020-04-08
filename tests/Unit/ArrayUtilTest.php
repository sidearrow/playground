<?php

namespace Tests\Unit;

use App\Utils\ArrayUtil;
use Tests\TestCase;

class ArrayUtilTest extends TestCase
{
    public function testToAssoc()
    {
        $res = ArrayUtil::toAssoc([
            ['aa', 'bb'],
            ['aa1', 'bb1'],
            ['aa2', 'bb2'],
        ]);

        $this->assertEquals([
            ['aa' => 'aa1', 'bb' => 'bb1'],
            ['aa' => 'aa2', 'bb' => 'bb2'],
        ], $res);
    }
}
