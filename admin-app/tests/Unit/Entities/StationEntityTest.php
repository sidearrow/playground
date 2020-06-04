<?php

namespace Tests\Unit\Entities;

use App\Entities\CompanyEntity;
use App\Entities\LineEntity;
use App\Entities\StationEntity;
use PHPUnit\Framework\TestCase;

class StationEntityTest extends TestCase
{
    public function testNoRelation()
    {
        $testCase = [
            'stationId' => 1,
            'stationName' => 'stationName',
            'stationNameKana' => 'stationNameKana',
        ];

        $stationEntity = new StationEntity(
            $testCase['stationId'],
            $testCase['stationName'],
            $testCase['stationNameKana'],
        );

        $this->assertEquals($testCase, $stationEntity->jsonSerialize());
    }

    public function testWithRelation()
    {
        $testCase = [
            'stationId' => 1,
            'stationName' => 'stationName',
            'stationNameKana' => 'stationNameKana',
        ];

        $stationEntity = new StationEntity(
            $testCase['stationId'],
            $testCase['stationName'],
            $testCase['stationNameKana'],
        );

        $companyEntityMock = $this->createMock(CompanyEntity::class);
        $stationEntity->setCompany($companyEntityMock);

        $this->assertEquals($companyEntityMock, $stationEntity->jsonSerialize()['company']);

        $lineEntitiesMock = [$this->createMock(LineEntity::class)];
        $stationEntity->setLines($lineEntitiesMock);

        $this->assertEquals($lineEntitiesMock, $stationEntity->jsonSerialize()['lines']);

        $groupStationEntitiesMock = [$this->createMock(StationEntity::class)];
        $stationEntity->setGroupStations($groupStationEntitiesMock);

        $this->assertEquals($groupStationEntitiesMock, $stationEntity->jsonSerialize()['groupStations']);
    }
}
