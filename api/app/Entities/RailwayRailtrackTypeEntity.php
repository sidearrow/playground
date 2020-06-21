<?php

namespace App\Entities;

use JsonSerializable;

class RailwayRailtrackTypeEntity implements JsonSerializable
{
    private int $railwayRailtrackTypeId;
    private string $railwayRailtrackTypeCode;
    private string $railwayRailtrackTypeName;

    public function __construct(
        int $railwayRailtrackTypeId,
        string $railwayRailtrackTypeCode,
        string $railwayRailtrackTypeName
    ) {
        $this->railwayRailtrackTypeId = $railwayRailtrackTypeId;
        $this->railwayRailtrackTypeCode = $railwayRailtrackTypeCode;
        $this->railwayRailtrackTypeName = $railwayRailtrackTypeName;
    }

    public function jsonSerialize()
    {
        return [
            'railwayRailtrackTypeId' => $this->railwayRailtrackTypeId,
            'railwayRailtrackTypeCode' => $this->railwayRailtrackTypeCode,
            'railwayRailtrackTypeName' => $this->railwayRailtrackTypeName,
        ];
    }
}
