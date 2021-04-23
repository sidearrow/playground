<?php

namespace App\Factories;

use App\Entities\LineSectionEntity;
use App\Models\LineSectionModel;

class LineSectionEntityFactory
{
    public function createFromModel(LineSectionModel $lineSectionModel, array $relation): LineSectionEntity
    {
        $lineSectionEntity = new LineSectionEntity(
            $lineSectionModel->line_id,
            $lineSectionModel->section_id,
            $lineSectionModel->line_section_name,
        );

        $stationEntities = [];
        $stationEntityFactory = new StationEntityFactory();
        foreach ($lineSectionModel->lineSectionLineStations as $lsls) {
            $stationEntities[] = $stationEntityFactory->createFromModel(
                $lsls->station,
                $relation[LineSectionEntity::RELATION_STATIONS] ?? [],
                $lsls->line_id
            );
        }
        $lineSectionEntity->setStations($stationEntities);

        return $lineSectionEntity;
    }
}
