<?php

namespace Tests\Unit\Factories;

use App\Factories\LineSectionEntityFactory;
use App\Models\LineSectionModel;
use PHPUnit\Framework\TestCase;
use ReflectionClass;

class LineSectionEntityFactoryTest extends TestCase
{
    private function getLineSectionModelMock()
    {
        $lineSectionModel = $this->getMockBuilder(LineSectionModel::class)
            ->disableOriginalConstructor()
            ->getMock();

        $lineSectionModel->method('__get')->will(
            $this->returnValueMap([
                ['line_id', 1],
                ['section_id', 2],
                ['line_section_name', 'line_section_name'],
                ['lineSectionLineStations', []],
            ])
        );

        return $lineSectionModel;
    }

    /*
    public function testCreateFromModel()
    {
        $lineSectionModelMock = $this->getLineSectionModelMock();

        $lineSectionEntity = (new LineSectionEntityFactory())->createFromModel($lineSectionModelMock);
        $lineSectionEntityReflection = new ReflectionClass($lineSectionEntity);

        $testCases = [
            'lineId' => $lineSectionModelMock->line_id,
            'sectionId' => $lineSectionModelMock->section_id,
            'lineSectionName' => $lineSectionModelMock->line_section_name,
        ];

        foreach ($testCases as $propertyName => $expected) {
            $prop = $lineSectionEntityReflection->getProperty($propertyName);
            $prop->setAccessible(true);

            $this->assertEquals($expected, $prop->getValue($lineSectionEntity));
        }
    }
    */
}
