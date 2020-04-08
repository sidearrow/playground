<?php

namespace Tests\Unit;

use App\UseCases\StationBulkSetupUseCase;
use Closure;
use stdClass;
use Tests\TestCase;

class StationBulkSetupUseCaseTest extends TestCase
{
    public function testValidateHeaderSuccess()
    {
        Closure::bind(function () {
            $res = StationBulkSetupUseCase::validateHeader([
                'line_id',
                'station_id',
            ]);

            $this->assertTrue($res);
        }, $this, StationBulkSetupUseCase::class)->__invoke();
    }

    public function testValidationHeaderFail()
    {
        Closure::bind(function () {
            $res = StationBulkSetupUseCase::validateHeader(['line_id']);

            $this->assertNotTrue($res);
        }, $this, StationBulkSetupUseCase::class)->__invoke();
    }

    public function testValidationDataSuccess()
    {
        $currentData = self::arrayToStdClassArray([
            ['length' => null],
            ['length' => null],
            ['length' => null],
        ]);

        Closure::bind(function () use ($currentData) {
            $res = StationBulkSetupUseCase::validateData(['length'], $currentData);

            $this->assertTrue($res);
        }, $this, StationBulkSetupUseCase::class)->__invoke();
    }

    public function testValidationDataFail()
    {
        $currentData = self::arrayToStdClassArray([
            ['length' => null],
            ['length' => 6.8],
            ['length' => null],
        ]);

        Closure::bind(function () use ($currentData) {
            $res = StationBulkSetupUseCase::validateData(['length'], $currentData);

            $this->assertNotTrue($res);
        }, $this, StationBulkSetupUseCase::class)->__invoke();
    }

    private static function arrayToStdClassArray(array $arr)
    {
        return array_map(function ($v) {
            $row = new stdClass;
            foreach ($v as $columnName => $value) {
                $row->$columnName = $value;
            }

            return $row;
        }, $arr);
    }
}
