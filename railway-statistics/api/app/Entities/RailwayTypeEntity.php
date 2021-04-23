<?php

namespace App\Entities;

use JsonSerializable;

class RailwayTypeEntity implements JsonSerializable
{
    private int $railwayTypeId;
    private string $railwayTypeCode;
    private string $railwayTypeName;

    public function __construct(
        int $railwayTypeId,
        string $railwayTypeCode,
        string $railwayTypeName
    ) {
        $this->railwayTypeId = $railwayTypeId;
        $this->railwayTypeCode = $railwayTypeCode;
        $this->railwayTypeName = $railwayTypeName;
    }

    public function jsonSerialize()
    {
        return [
            'railwayTypeId' => $this->railwayTypeId,
            'railwayTypeCode' => $this->railwayTypeCode,
            'railwayTypeName' => $this->railwayTypeName,
        ];
    }
}
