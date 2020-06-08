<?php

namespace App\Factories;

use App\Entities\StationEntity;
use App\Models\StationModel;

class StationEntityFactory
{
    public function createFromModel(StationModel $stationModel, array $relation = [], int $rootLineId = null): StationEntity
    {
        $stationEntity = new StationEntity(
            $stationModel->station_id,
            $stationModel->station_name,
            $stationModel->station_name_kana,
        );

        if (array_key_exists(StationEntity::RELATION_GROUP_STATIONS, $relation)) {
            $stationEntities = [];
            if ($stationModel->stationGroup !== null) {
                foreach ($stationModel->stationGroup->stations as $sgs) {
                    $stationEntities[] = $this->createFromModel($sgs, $relation[StationEntity::RELATION_GROUP_STATIONS]);
                }
            }
            $stationEntity->setGroupStations($stationEntities);
        }

        if (array_key_exists(StationEntity::RELATION_COMPANY, $relation)) {
            $stationEntity->setCompany(
                (new CompanyEntityFactory())->createFromModel($stationModel->company)
            );
        }

        if (array_key_exists(StationEntity::RELATION_LINES, $relation)) {
            $lineEntities = [];
            $lineEntityFactory = new LineEntityFactory();
            foreach ($stationModel->lines as $line) {
                if ($line->line_id === $rootLineId) {
                    continue;
                }
                $lineEntities[] = $lineEntityFactory->createFromModel($line);
            }
            $stationEntity->setLines($lineEntities);
        }

        return $stationEntity;
    }
}
