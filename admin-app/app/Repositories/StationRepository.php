<?php

namespace App\Repositories;

use App\Models\StationGroupModel;
use Illuminate\Support\Facades\DB;

class StationRepository
{
    public function getGroupStations(string $stationName)
    {
        $res = DB::table('station as s')
            ->leftJoin('station_group_station as sgs', 'sgs.station_id', '=', 's.station_id')
            ->where('s.station_name', 'like', "%{$stationName}%")
            ->groupBy('sgs.station_group_id')
            ->select('station_group_id')
            ->get()
            ->toArray();

        $stationGroupIds = [];
        foreach ($res as $row) {
            if ($row->station_group_id !== null) {
                $stationGroupIds[] = $row->station_group_id;
            }
        }

        $stationGroups = StationGroupModel::with(['stations', 'stations.company'])->whereIn('station_group_id', $stationGroupIds)->get();

        return $stationGroups;
    }
}
