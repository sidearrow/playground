<?php

namespace App\Services;

use App\Entities\StationEntity;
use App\Factories\StationEntityFactory;
use App\Factories\StationGroupEntityFactory;
use App\Repositories\StationRepository;

class StationService
{
    private StationRepository $stationRepository;
    private StationEntityFactory $stationEntityFactory;
    private StationGroupEntityFactory $stationGroupEntityFactory;

    public function __construct()
    {
        $this->stationRepository = new StationRepository();
        $this->stationEntityFactory = new StationEntityFactory();
        $this->stationGroupEntityFactory = new StationGroupEntityFactory();
    }

    public function getManyByStationName(string $stationName): array
    {
        $stationModelCollection = $this->stationRepository->getManyByStationName($stationName);

        $res = [];
        foreach ($stationModelCollection as $stationModel) {
            $res[] = $this->stationEntityFactory->createFromModel($stationModel, [
                StationEntity::RELATION_GROUP_STATIONS => [StationEntity::RELATION_COMPANY => []],
                StationEntity::RELATION_COMPANY => [],
                StationEntity::RELATION_LINES => [],
            ]);
        }

        return $res;
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
