<?php

namespace App\Services;

use App\Factories\StationEntityFactory;
use App\Factories\StationGroupEntityFactory;
use App\Repositories\StationRepository;

class StationService
{
    private StationRepository $stationRepository;
    private StationGroupEntityFactory $stationGroupEntityFactory;

    public function __construct()
    {
        $this->stationRepository = new StationRepository();
        $this->stationGroupEntityFactory = new StationGroupEntityFactory();
    }

    public function getStationGroupsSearchByStationName(string $stationName): array
    {
        $stationGroupEntityCollection = $this->stationRepository->getGroupStations($stationName);

        $res = [];
        foreach ($stationGroupEntityCollection as $stationGroupEntity) {
            $res[] = $this->stationGroupEntityFactory->createFromModel($stationGroupEntity, []);
        }

        return $res;
    }
}
