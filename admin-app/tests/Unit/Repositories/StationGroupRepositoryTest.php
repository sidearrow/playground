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

    public function getCountStationGroup(int $stationGroupId): int
    {
        return DB::table('station_group')
            ->where('station_group_id', '=', $stationGroupId)
            ->count();
    }

    public function getCountStationGroupStation(int $stationGroupId, int $stationId): int
    {
        return DB::table('station_group_station')
            ->where('station_group_id', '=', $stationGroupId)
            ->where('station_id', '=', $stationId)
            ->count();
    }

    public function deleteStationGroup(int $stationGroupId): void
    {
        DB::table('station_group')
            ->where('station_group_id', '=', $stationGroupId)
            ->delete();
    }

    public function deleteStationGroupStation(int $stationGroupId, int $stationId): void
    {
        DB::table('station_group_station')
            ->where('station_group_id', '=', $stationGroupId)
            ->where('station_id', '=', $stationId)
            ->delete();
    }

    public function createStationGroupStation(int $stationGroupId, int $stationId): void
    {
        DB::table('station_group_station')->insertOrIgnore([
            'station_group_id' => $stationGroupId,
            'station_id' => $stationId,
        ]);
    }

    public function testCreate()
    {
        $targetStationId = $this->getMaxStationId();

        $stationGroupRepository = new StationGroupRepository();
        $targetStationGroupId = $stationGroupRepository->create($targetStationId);

        $this->assertEquals(1, $this->getCountStationGroup($targetStationGroupId));
        $this->assertEquals(1, $this->getCountStationGroupStation($targetStationGroupId, $targetStationId));

        $this->deleteStationGroupStation($targetStationGroupId, $targetStationId);
        $this->deleteStationGroup($targetStationGroupId);
    }

    public function testUpdate()
    {
        $targetStationGroupId = $this->getMaxStationGroupId();
        $targetStationId = $this->getMaxStationId();

        $this->deleteStationGroupStation($targetStationGroupId, $targetStationId);

        $stationGroupRepository = new StationGroupRepository();
        $stationGroupRepository->update($targetStationGroupId, $targetStationId);

        $this->assertEquals(1, $this->getCountStationGroupStation($targetStationGroupId, $targetStationId));

        $this->deleteStationGroupStation($targetStationGroupId, $targetStationId);
    }

    public function testDelete()
    {
        $targetStationGroupId = $this->getMaxStationGroupId();
        $targetStationId = $this->getMaxStationId();

        $this->createStationGroupStation($targetStationGroupId, $targetStationId);

        $this->assertEquals(1, $this->getCountStationGroupStation($targetStationGroupId, $targetStationId));

        $stationGroupRepository = new StationGroupRepository();
        $stationGroupRepository->delete($targetStationGroupId, $targetStationId);

        $this->assertEquals(0, $this->getCountStationGroupStation($targetStationGroupId, $targetStationId));
    }
}
