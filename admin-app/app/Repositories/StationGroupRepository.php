<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class StationGroupRepository extends AbstractRepository
{
    public function create(int $stationId): void
    {
        DB::transaction(function () use ($stationId) {
            $stationGroupId = DB::table('station_group')->insertGetId([]);

            $this->update($stationGroupId, $stationId);
        });
    }

    public function update(int $stationGroupId, int $stationId): void
    {
        DB::table('station_group_station')->insert([
            'station_group_id' => $stationGroupId,
            'station_id' => $stationId,
        ]);
    }

    public function delete(int $stationGroupId, int $stationId): void
    {
        DB::table('station_group_station')
            ->where('station_group_id', '=', $stationGroupId)
            ->where('station_id', '=', $stationId)
            ->delete();
    }
}
