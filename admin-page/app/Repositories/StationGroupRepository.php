<?php

namespace App\Repositories;

use App\Entities\StationEntity;
use App\Entities\StationGroupEntity;
use App\Models\StationGroupModel;
use Illuminate\Database\Eloquent\Builder;

class StationGroupRepository
{
    /**
     * @return \App\Entities\StationGroupEntity[]
     */
    public function get(string $stationName): array
    {
        $dbData = StationGroupModel::whereHas(
            'stationGroupStations.station',
            function (Builder $q) use ($stationName) {
                $q->where('station_name', 'like', "%${stationName}%");
            }
        )->with([
            'stationGroupStations',
            'stationGroupStations.station'
        ])->get();

        $stationGroupEntities = [];
        foreach ($dbData as $stationGroup) {
            $stationEntities = [];
            foreach ($stationGroup->stationGroupStations as $stationGroupStation) {
                $stationEntities[] = new StationEntity(
                    $stationGroupStation->station->station_id,
                    $stationGroupStation->station->station_name,
                );
            }

            $stationGroupEntities[] = new StationGroupEntity(
                $stationGroup->station_group_id,
                $stationEntities,
            );
        }

        return $stationGroupEntities;
    }
}
