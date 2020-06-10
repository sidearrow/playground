<?php

namespace Tests\Unit\Services\Csv;

use App\Services\Csv\CsvParser;
use Tests\TestCase;

class CsvParserTest extends TestCase
{
    public function testTsvAssocArray()
    {
        $data = "header1\theader2\nval11\tval12\nval21\tval22\n";
        $expected = [
            ['header1' => 'val11', 'header2' => 'val12'],
            ['header1' => 'val21', 'header2' => 'val22'],
        ];

        $csvParser = new CsvParser($data);
        $assocArray = $csvParser->getAssocArray();

        $this->assertEquals($expected, $assocArray);
    }
}
