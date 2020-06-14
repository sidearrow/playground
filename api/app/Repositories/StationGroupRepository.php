<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class StationGroupRepository extends AbstractRepository
{
    public function update(int $baseStationId, array $stationIds): void
    {
        DB::transaction(function () use ($baseStationId, $stationIds) {
            $stationGroupId = $this->getStationGroupIdByStationId($baseStationId);

            if ($stationGroupId === null) {
                $stationGroupId = $this->create();
            } else {
                DB::table('station_group_station')->where('station_group_id', '=', $stationGroupId)->delete();
            }

            DB::table('station_group_station')->insertOrIgnore(
                array_map(function (int $stationId) use ($stationGroupId) {
                    return [
                        'station_group_id' => $stationGroupId,
                        'station_id' => $stationId,
                    ];
                }, [$baseStationId, ...$stationIds])
            );
        });
    }

    private function create(): int
    {
        return DB::table('station_group')->insertGetId([]);
    }

    private function getStationGroupIdByStationId(int $stationId): ?int
    {
        return DB::table('station_group_station')
            ->where('station_id', '=', $stationId)
            ->select('station_group_id')
            ->first()
            ->station_group_id ?? null;
    }
}
