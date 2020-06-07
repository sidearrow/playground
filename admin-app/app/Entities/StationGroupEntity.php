<?php

namespace App\Entities;

use JsonSerializable;

class StationGroupEntity implements JsonSerializable
{
    private ?array $stations;

    public function setStations(array $stations)
    {
        $this->stations = $stations;
    }

    public function jsonSerialize()
    {
        if ($this->stations !== null) {
            return ['stations' => $this->stations];
        }
        return [];
    }
}
