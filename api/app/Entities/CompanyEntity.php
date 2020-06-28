<?php

namespace App\Entities;

use App\TraitGetter;
use JsonSerializable;

/**
 * @property int $companyId
 * @property string $companyCode
 * @property string $companyName
 * @property string $companyNameAlias
 * @property string $companyNameKana
 * @property float $length
 * @property int $lineNum
 * @property int $stationNum
 * @property string|null $corporateColor
 */
class CompanyEntity implements JsonSerializable
{
    use TraitGetter;

    public const RELATION_LINES = 'relation_lines';
    public const RELATION_COMPANY_TYPE = 'relation_company_types';
    public const RELATION_RAILWAY_TYPES = 'relation_railway_types';
    public const RELATION_RAILWAY_RAILTRACK_TYPES = 'relation_railway_railtrack_types';

    private int $companyId;
    private string $companyCode;
    private string $companyName;
    private string $companyNameAlias;
    private string $companyNameKana;
    private float $length;
    private int $lineNum;
    private int $stationNum;
    private ?string $corporateColor;

    /** @var \App\Entities\LineEntity[]|null $lines */
    private ?array $lines = null;

    private ?CompanyTypeEntity $companyType = null;

    /** @var \App\Entities\RailwayTypeEntity[]|null $railwayTypes */
    private ?array $railwayTypes = null;

    /** @var \App\Entities\RailwayRailtrackTypeEntity[]|null $railwayRailtrackTypes */
    private ?array $railwayRailtrackTypes = null;

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

    public function setCompanyType(CompanyTypeEntity $companyType): void
    {
        $this->companyType = $companyType;
    }

    public function setRailwayTypes(array $railwayTypes): void
    {
        $this->railwayTypes = $railwayTypes;
    }

    public function setRailwayRailtrackTypes(array $railwayRailtrackTypes): void
    {
        $this->railwayRailtrackTypes = $railwayRailtrackTypes;
    }

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

        if ($this->companyType !== null) {
            $res['companyType'] = $this->companyType;
        }

        if ($this->lines !== null) {
            $res['lines'] = $this->lines;
        }

        if ($this->railwayTypes !== null) {
            $res['railwayTypes'] = $this->railwayTypes;
        }

        if ($this->railwayRailtrackTypes !== null) {
            $res['railwayRailtrackTypes'] = $this->railwayRailtrackTypes;
        }

        return $res;
    }
}
