<?php

namespace App\Factories;

use App\Entities\StationEntity;
use App\Models\StationModel;

class StationEntityFactory
{
    public function createFromModel(StationModel $stationModel, array $relations = [], int $rootLineId = null): StationEntity
    {
        $stationEntity = new StationEntity(
            $stationModel->station_id,
            $stationModel->station_name,
            $stationModel->station_name_kana,
        );

        if (array_key_exists(StationEntity::class, $relations)) {
            if (in_array(StationEntity::RELATION_GROUP_STATIONS, $relations[StationEntity::class])) {
                $stationEntities = [];
                if ($stationModel->stationGroupStation !== null) {
                    foreach ($stationModel->stationGroupStation->stationGroupStations as $sgs) {
                        $stationEntities[] = $this->createFromModel($sgs->station, [
                            StationEntity::class => [StationEntity::RELATION_COMPANY, StationEntity::RELATION_LINES]
                        ]);
                    }
                }
                $stationEntity->setGroupStations($stationEntities);
            }

            if (in_array(StationEntity::RELATION_COMPANY, $relations[StationEntity::class])) {
                $stationEntity->setCompany(
                    (new CompanyEntityFactory())->createFromModel($stationModel->company)
                );
            }

            if (in_array(StationEntity::RELATION_LINES, $relations[StationEntity::class])) {
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
        }

        return $stationEntity;
    }
}
