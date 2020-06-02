<?php

namespace App\Entities;

use JsonSerializable;

class LineEntity implements JsonSerializable
{
    private int $lineId;
    private string $lineCode;
    private string $lineName;
    private string $lineNameAlias;
    private string $lineNameKana;
    private ?int $stationNum;
    private ?float $operatingLength;
    private ?float $realLength;

    private CompanyEntity $company;

    public function __construct(
        int $lineId,
        string $lineCode,
        string $lineName,
        string $lineNameAlias,
        string $lineNameKana,
        ?int $stationNum,
        ?float $operatingLength,
        ?float $realLength
    ) {
        $this->lineId = $lineId;
        $this->lineCode = $lineCode;
        $this->lineName = $lineName;
        $this->lineNameAlias = $lineNameAlias;
        $this->lineNameKana = $lineNameKana;
        $this->stationNum = $stationNum;
        $this->operatingLength = $operatingLength;
        $this->realLength = $realLength;
    }

    public function setCompany(CompanyEntity $company): void
    {
        $this->company = $company;
    }

    public function jsonSerialize()
    {
        $res = [
            'lineId' => $this->lineId,
            'lineCode' => $this->lineCode,
            'lineName' => $this->lineName,
            'lineNameAlias' => $this->lineNameAlias,
            'lineNameKana' => $this->lineNameKana,
            'stationNum' => $this->stationNum,
            'operatingLength' => $this->operatingLength,
            'realLength' => $this->realLength,
        ];

        if ($this->company !== null) {
            $res['company'] = $this->company;
        }

        return $res;
    }
}
