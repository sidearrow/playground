<?php

namespace App\Entities;

class StationEntity
{
    private int $stationId;

    private string $stationName;

    public function __construct(int $stationId, string $stationName)
    {
        $this->stationId = $stationId;
        $this->stationName = $stationName;
    }

    public function getStationName(): string
    {
        return $this->stationName;
    }
}
