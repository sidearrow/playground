<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class StationGroupRepository extends AbstractRepository
{
    public function create(int $stationId): int
    {
        $stationGroupId = 0;
        DB::transaction(function () use ($stationId, &$stationGroupId) {
            $stationGroupId = DB::table('station_group')->insertGetId([]);

            $this->update($stationGroupId, $stationId);
        });

        return $stationGroupId;
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
