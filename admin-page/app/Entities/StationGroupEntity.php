<?php

namespace App\Entities;

class StationGroupEntity
{
    private int $stationGroupId;

    /**
     * @var StationEntity[] $stations;
     */
    private array $stations = [];

    public function __construct(int $stationGroupId, array $stations)
    {
        $this->stationGroupId = $stationGroupId;
        $this->stations = $stations;
    }

    public function getStations(): array
    {
        return $this->stations;
    }
}
