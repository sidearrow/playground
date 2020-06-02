<?php

namespace App\Repositories;

use App\Entities\LineEntity;
use App\Models\LineModel;
use Illuminate\Database\Eloquent\Collection;

class LineRepository extends AbstractRepository
{
    /**
     * @return Collection<LineModel>
     */
    public function getAll(): Collection
    {
        return LineModel::with(['company'])->get();
    }

    /**
     * @return Collection<LineModel>
     */
    public function getByCompanyId(int $companyId): Collection
    {
        return LineModel::where('company_id', '=', $companyId)->get();
    }

    public function getOne(int $lineId): LineModel
    {
        return LineModel::with([
            'company',
            'lineSections.lineSectionLineStations.station.lines',
            'lineSections.lineSectionLineStations.station.stationGroupStation.stationGroupStations.station.company',
            'lineSections.lineSectionLineStations.station.stationGroupStation.stationGroupStations.station.lines',
        ])->find($lineId);
    }
}
