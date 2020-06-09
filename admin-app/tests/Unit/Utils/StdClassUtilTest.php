<?php

namespace Tests\Unit\Utils;

use App\Utils\StdClassUtil;
use stdClass;
use Tests\TestCase;

class StdClassUtilTest extends TestCase
{
    public function testToArray()
    {
        $assoc = [
            'key1' => 'val1',
            'key2' => 'val2',
            'key3' => 'val3',
        ];

        $array = [];
        $stdClass = new stdClass();
        foreach ($assoc as $key => $val) {
            $stdClass->{$key} = $val;
            $array[] = $val;
        }

        $this->assertEquals($array, StdClassUtil::toArray($stdClass));
    }

    public function testToArrayBulk()
    {
        $assocArray = [
            [
                'key1' => 'val11',
                'key2' => 'val12',
                'key3' => 'val13',
            ],
            [
                'key1' => 'val21',
                'key2' => 'val22',
                'key3' => 'val23',
            ]
        ];

        $arrayArray = [];
        $stdClassArray = [];
        foreach ($assocArray as $assoc) {
            $array = [];
            $stdClass = new stdClass();
            foreach ($assoc as $key => $val) {
                $stdClass->{$key} = $val;
                $array[] = $val;
            }
            $arrayArray[] = $array;
            $stdClassArray[] = $stdClass;
        }

        $this->assertEquals($arrayArray, StdClassUtil::toArrayBulk($stdClassArray));
    }
}
