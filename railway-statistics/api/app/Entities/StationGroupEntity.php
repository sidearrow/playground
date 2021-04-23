<?php

namespace App\Entities;

use JsonSerializable;

class StationGroupEntity implements JsonSerializable
{
    private int $stationGroupId;
    private ?array $stations;

    public function setStations(int $stationGroupId, array $stations)
    {
        $this->stationGroupId = $stationGroupId;
        $this->stations = $stations;
    }

    public function jsonSerialize()
    {
        $res = [
            'stationGroupId' => $this->stationGroupId,
        ];

        if ($this->stations !== null) {
            $res['stations'] = $this->stations;
        }

        return $res;
    }
}
