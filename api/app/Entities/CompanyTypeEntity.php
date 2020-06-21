<?php

namespace App\Entities;

use JsonSerializable;

class CompanyTypeEntity implements JsonSerializable
{
    private int $companyTypeId;
    private string $companyTypeCode;
    private string $companyTypeName;

    public function __construct(
        int $companyTypeId,
        string $companyTypeCode,
        string $companyTypeName
    ) {
        $this->companyTypeId = $companyTypeId;
        $this->companyTypeCode = $companyTypeCode;
        $this->companyTypeName = $companyTypeName;
    }

    public function jsonSerialize()
    {
        return [
            'companyTypeId' => $this->companyTypeId,
            'companyTypeCode' => $this->companyTypeCode,
            'companyTypeName' => $this->companyTypeName,
        ];
    }
}
