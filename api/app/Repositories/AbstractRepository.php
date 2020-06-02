<?php

namespace App\Repositories;

use App\Entities\LineEntity;
use App\Entities\LineSectionEntity;
use App\Entities\StationEntity;
use App\Models\LineModel;
use App\Models\LineSectionModel;
use App\Models\StationModel;

abstract class AbstractRepository
{
    protected function lineModelToEntity(LineModel $lineModel, array $relations = []): LineEntity
    {
        $lineEntity = new LineEntity(
            $lineModel->line_id,
            $lineModel->line_code,
            $lineModel->line_name,
            $lineModel->line_name_alias,
            $lineModel->line_name_kana,
            $lineModel->station_num,
            $lineModel->operating_kilo,
            $lineModel->real_kilo,
        );

        if (in_array('company', $relations)) {
            $companyEntity = $this->companyModelToEntity($lineModel->company);
            $lineEntity->setCompany($companyEntity);
        }

        if (in_array('lineSections', $relations)) {
            $lineSectionEntities = [];
            foreach ($lineModel->lineSections as $lineSection) {
                $lineSectionEntities[] = $this->lineSectionModelToEntity($lineSection);
            }
            $lineEntity->setLineSections($lineSectionEntities);
        }

        return $lineEntity;
    }

    protected function lineSectionModelToEntity(LineSectionModel $lineSectionModel): LineSectionEntity
    {
        $lineSectionEntity = new LineSectionEntity(
            $lineSectionModel->line_id,
            $lineSectionModel->section_id,
            $lineSectionModel->line_section_name,
        );

        $stationEntities = [];
        foreach ($lineSectionModel->lineSectionLineStations as $lsls) {
            $stationEntities[] = $this->stationModelToEntity($lsls->station, ['groupStations', 'lines'], $lineSectionModel->line_id);
        }

        $lineSectionEntity->setStations($stationEntities);

        return $lineSectionEntity;
    }

    protected function stationModelToEntity(StationModel $stationModel, array $relations = [], int $rootLineId = null): StationEntity
    {
        $stationEntity = new StationEntity(
            $stationModel->status_id,
            $stationModel->station_name,
            $stationModel->station_name_kana,
        );

        if (in_array('groupStations', $relations)) {
            $stationEntities = [];
            if ($stationModel->stationGroupStation !== null) {
                foreach ($stationModel->stationGroupStation->stationGroupStations as $sgs) {
                    if ($sgs->station_id === $stationModel->station_id) {
                        continue;
                    }
                    $stationEntities[] = $this->stationModelToEntity($sgs->station, ['company', 'lines']);
                }
            }
            $stationEntity->setGroupStations($stationEntities);
        }

        if (in_array('lines', $relations)) {
            $lineEntities = [];
            foreach ($stationModel->lines as $line) {
                if ($line->line_id === $rootLineId) {
                    continue;
                }
                $lineEntities[] = $this->lineModelToEntity($line);
            }
            $stationEntity->setLines($lineEntities);
        }

        if (in_array('company', $relations)) {
            $stationEntity->setCompany(
                $this->companyModelToEntity($stationModel->company)
            );
        }

        return $stationEntity;
    }
}
