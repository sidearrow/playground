<?php

namespace App\Repositories;

use App\Entities\LineEntity;
use App\Models\LineModel;

class LineRepository extends AbstractRepository
{
    /**
     * @return \App\Entities\LineEntity[]
     */
    public function getAll(): array
    {
        /** @var \Illuminate\Database\Eloquent\Collection<LineModel> */
        $lineModels = LineModel::with(['company'])->get();

        $lineEntities = [];
        foreach ($lineModels as $lineModel) {
            $lineEntities[] = $this->lineModelToEntity($lineModel, ['company']);
        }

        return $lineEntities;
    }

    public function getDetail(int $lineId): LineEntity
    {
        $lineModel = LineModel::with([
            'company',
            'lineSections.lineSectionLineStations.station.lines',
            'lineSections.lineSectionLineStations.station.stationGroupStation.stationGroupStations.station.company',
            'lineSections.lineSectionLineStations.station.stationGroupStation.stationGroupStations.station.lines',
        ])->find($lineId);

        $lineEntity = $this->lineModelToEntity($lineModel, ['company', 'lineSections']);

        return $lineEntity;
    }
}
