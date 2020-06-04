<?php

namespace App\Factories;

use App\Entities\LineSectionEntity;
use App\Entities\StationEntity;
use App\Models\LineSectionModel;

class LineSectionEntityFactory
{
    public const RELATION_STATIONS = 'relations_stations';

    public function createFromModel(LineSectionModel $lineSectionModel): LineSectionEntity
    {
        $lineSectionEntity = new LineSectionEntity(
            $lineSectionModel->line_id,
            $lineSectionModel->section_id,
            $lineSectionModel->line_section_name,
        );

        $stationEntities = [];
        $stationEntityFactory = new StationEntityFactory();
        foreach ($lineSectionModel->lineSectionLineStations as $lsls) {
            $stationEntities[] = $stationEntityFactory->createFromModel($lsls->station, [
                StationEntity::class => [StationEntity::RELATION_GROUP_STATIONS, StationEntity::RELATION_LINES]
            ], $lsls->line_id);
        }
        $lineSectionEntity->setStations($stationEntities);

        return $lineSectionEntity;
    }
}
