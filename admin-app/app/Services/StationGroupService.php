<?php

namespace App\Services;

use App\Repositories\StationGroupRepository;

class StationGroupService
{
    private StationGroupRepository $stationGroupRepository;

    public function __construct()
    {
        $this->stationGroupRepository = new StationGroupRepository();
    }

    public function create(int $stationId): void
    {
        $this->stationGroupRepository->create($stationId);
    }

    public function update(int $stationGroupId, int $stationId): void
    {
        $this->stationGroupRepository->update($stationGroupId, $stationId);
    }

    public function delete(int $stationGroupId, int $stationId): void
    {
        $this->stationGroupRepository->delete($stationGroupId, $stationId);
    }
}
