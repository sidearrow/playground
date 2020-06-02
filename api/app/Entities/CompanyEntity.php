<?php

namespace App\Entities;

use JsonSerializable;

class CompanyEntity implements JsonSerializable
{
    private int $companyId;
    private string $companyCode;
    private string $companyName;
    private string $companyNameAlias;
    private string $companyNameKana;
    private float $length;
    private int $lineNum;
    private int $stationNum;
    private ?string $corporateColor;

    /**
     * @var \App\Entities\LineEntity[] $lines
     */
    private ?array $lines = null;

    public function __construct(
        int $companyId,
        string $companyCode,
        string $companyName,
        string $companyNameAlias,
        string $companyNameKana,
        float $length,
        int $lineNum,
        int $stationNum,
        ?string $corporateColor
    ) {
        $this->companyId = $companyId;
        $this->companyCode = $companyCode;
        $this->companyName = $companyName;
        $this->companyNameAlias = $companyNameAlias;
        $this->companyNameKana = $companyNameKana;
        $this->length = $length;
        $this->lineNum = $lineNum;
        $this->stationNum = $stationNum;
        $this->corporateColor = $corporateColor;
    }

    /**
     * @param \App\Entities\LineEntity[] $lines
     */
    public function setLines(array $lines): void
    {
        $this->lines = $lines;
    }

    public function jsonSerialize()
    {
        $res = [
            'companyId' => $this->companyId,
            'companyCode' => $this->companyCode,
            'companyName' => $this->companyName,
            'companyNameAlias' => $this->companyNameAlias,
            'companyNameKana' => $this->companyNameKana,
            'length' => $this->length,
            'lineNum' => $this->lineNum,
            'stationNum' => $this->stationNum,
            'corporateColor' => $this->corporateColor,
        ];

        if ($this->lines !== null) {
            $res['lines'] = $this->lines;
        }

        return $res;
    }
}
