<?php

namespace App\Entities;

use JsonSerializable;

class StationEntity implements JsonSerializable
{
    public const RELATION_COMPANY = 'relation_company';
    public const RELATION_LINES = 'relation_lines';
    public const RELATION_GROUP_STATIONS = 'relation_group_stations';

    private int $stationId;
    private string $stationName;
    private ?string $stationNameKana;

    private ?CompanyEntity $company = null;
    private ?array $lines = null;
    private ?array $groupStations = null;

    public function __construct(
        int $stationId,
        string $stationName,
        ?string $stationNameKana
    ) {
        $this->stationId = $stationId;
        $this->stationName = $stationName;
        $this->stationNameKana = $stationNameKana;
    }

    public function setCompany(CompanyEntity $company): void
    {
        $this->company = $company;
    }

    /**
     * @param \App\Entities\LineEntity[] $lines
     */
    public function setLines(array $lines): void
    {
        $this->lines = $lines;
    }

    /**
     * @param \App\Entities\StationEntity[] $groupStations
     */
    public function setGroupStations(array $groupStations): void
    {
        $this->groupStations = $groupStations;
    }

    public function jsonSerialize(): array
    {
        $res = [
            'stationId' => $this->stationId,
            'stationName' => $this->stationName,
            'stationNameKana' => $this->stationNameKana,
        ];

        if ($this->company !== null) {
            $res['company'] = $this->company;
        }

        if ($this->lines !== null) {
            $res['lines'] = $this->lines;
        }

        if ($this->groupStations !== null) {
            $res['groupStations'] = $this->groupStations;
        }

        return $res;
    }
}
