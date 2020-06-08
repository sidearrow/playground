<?php

namespace Tests\Unit\Repositories;

use App\Repositories\StationGroupRepository;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class StationGroupRepositoryTest extends TestCase
{
    public function getMaxStationGroupId(): int
    {
        return  (int) DB::selectOne(
            'select max(station_group_id) as station_group_id from station_group'
        )->station_group_id ?? 0;
    }

    public function getMaxStationId(): int
    {
        return (int) DB::selectOne(
            'select max(station_id) as station_id from station'
        )->station_id;
    }

    public function testCreate()
    {
        $targetStationGroupId = $this->getMaxStationGroupId() + 1;
        $targetStationId = $this->getMaxStationId();

        $stationGroupRepository = new StationGroupRepository();

        $stationGroupRepository->create($targetStationId);

        $res = DB::selectOne(
            'select count(*) as cnt from station_group where station_group_id = ?',
            [$targetStationGroupId]
        )->cnt;

        $this->assertEquals(1, $res);

        $res = DB::selectOne(
            "select count(*) as cnt from station_group_station
                where station_group_id = ? and station_id = ?",
            [$targetStationGroupId, $targetStationId]
        )->cnt;

        $this->assertEquals(1, $res);
    }

    public function testUpdate()
    {
        $targetStationGroupId = $this->getMaxStationGroupId();
        $targetStationId = $this->getMaxStationId();
    }
}
