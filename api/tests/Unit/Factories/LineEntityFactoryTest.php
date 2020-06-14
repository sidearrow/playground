<?php

namespace Tests\Unit\Factories;

use App\Factories\LineEntityFactory;
use App\Models\LineModel;
use PHPUnit\Framework\TestCase;
use ReflectionClass;

class LineEntityFactoryTest extends TestCase
{
    public function getLineModelMock()
    {
        $lineModelMock = $this->getMockBuilder(LineModel::class)
            ->disableOriginalConstructor()
            ->getMock();

        $lineModelMock->method('__get')->will(
            $this->returnValueMap([
                ['line_id', 1],
                ['line_code', 'line_code'],
                ['line_name', 'line_name'],
                ['line_name_alias', 'line_name_alias'],
                ['line_name_kana', 'line_name_kana'],
                ['station_num', 2],
                ['operating_kilo', 3.0],
                ['real_kilo', 4.0],
            ])
        );

        return $lineModelMock;
    }

    /*
    public function testCreateFromModel()
    {
        $lineModelMock = $this->getLineModelMock();

        $lineEntity = (new LineEntityFactory())->createFromModel($lineModelMock);
        $lineEntityReflection = new ReflectionClass($lineEntity);

        $testCases = [
            'lineId' => $lineModelMock->line_id,
            'lineCode' => $lineModelMock->line_code,
            'lineName' => $lineModelMock->line_name,
            'lineNameAlias' => $lineModelMock->line_name_alias,
            'lineNameKana' => $lineModelMock->line_name_kana,
            'stationNum' => $lineModelMock->station_num,
            'operatingLength' => $lineModelMock->operating_kilo,
            'realLength' => $lineModelMock->real_kilo,
        ];

        foreach ($testCases as $propName => $expected) {
            $prop = $lineEntityReflection->getProperty($propName);
            $prop->setAccessible(true);

            $this->assertEquals($expected, $prop->getValue($lineEntity));
        }
    }
        */
}
