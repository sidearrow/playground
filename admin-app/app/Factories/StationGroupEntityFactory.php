<?php

namespace App\Factories;

use App\Entities\StationGroupEntity;
use App\Models\StationGroupModel;

class StationGroupEntityFactory
{
    public function createFromModel(StationGroupModel $stationGroupModel, array $relation = []): StationGroupEntity
    {
        $stationGroupEntity = new StationGroupEntity();

        $stations = [];
        $stationEntityFactory = new StationEntityFactory();
        foreach ($stationGroupModel->stations as $station) {
            $stations[] = $stationEntityFactory->createFromModel($station, $relation['stations'] ?? []);
        }

        $stationGroupEntity->setStations($stationGroupModel->station_group_id, $stations);

        return $stationGroupEntity;
    }
}
