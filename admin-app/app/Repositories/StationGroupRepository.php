<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class StationGroupRepository extends AbstractRepository
{
    public function create(): int
    {
        return DB::table('station_group')->insertGetId([]);
    }

    public function update(int $stationGroupId, int $stationId): void
    {
        DB::table('station_group_station')->insert([
            'station_group_id' => $stationGroupId,
            'station_id' => $stationId,
        ]);
    }

    public function delete(int $stationId): void
    {
        DB::table('station_group_station')
            ->where('station_id', '=', $stationId)
            ->delete();
    }

    public function getStationGroupIdByStationId(int $stationId): ?int
    {
        return DB::table('station_group_station')
            ->where('station_id', '=', $stationId)
            ->select('station_group_id')
            ->first()
            ->station_group_id ?? null;
    }

    public function createOrUpdate(int $baseStationId, int $addStationId): void
    {
        DB::transaction(function () use ($baseStationId, $addStationId) {
            $stationGroupId = $this->getStationGroupIdByStationId($baseStationId);

            if ($stationGroupId === null) {
                $stationGroupId = $this->create();
                $this->update($stationGroupId, $baseStationId);
            }

            $this->update($stationGroupId, $addStationId);
        });
    }
}
