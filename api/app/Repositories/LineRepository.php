<?php

namespace App\Repositories;

use App\Entities\LineEntity;
use App\Models\LineModel;
use Illuminate\Database\Eloquent\Collection;

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


    /**
     * @return Collection<LineModel>
     */
    public function getByCompanyId(int $companyId): Collection
    {
        return LineModel::where('company_id', '=', $companyId)->get();
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
