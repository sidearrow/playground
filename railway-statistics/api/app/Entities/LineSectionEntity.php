<?php

namespace App\Entities;

use JsonSerializable;

class LineSectionEntity implements JsonSerializable
{
    public const RELATION_STATIONS = 'relation_stations';

    private int $lineId;
    private int $sectionId;
    private ?string $lineSectionName;

    private ?array $stations = null;

    public function __construct(
        int $lineId,
        int $sectionId,
        ?string $lineSectionName
    ) {
        $this->lineId = $lineId;
        $this->sectionId = $sectionId;
        $this->lineSectionName = $lineSectionName;
    }

    /**
     * @param \App\Entities\StationEntity[] $stations
     */
    public function setStations(array $stations): void
    {
        $this->stations = $stations;
    }

    public function jsonSerialize()
    {
        return [
            'lineId' => $this->lineId,
            'sectionId' => $this->sectionId,
            'lineSectionName' => $this->lineSectionName,
            'stations' => $this->stations,
        ];
    }
}
