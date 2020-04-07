<?php

namespace App\Entities;

class Company
{
    private $companyCode;

    private $companyName;

    private $companyNameKana;

    private $companyNameOrigin;

    public function __construct(
        string $companyCode,
        string $companyName,
        string $companyNameKana,
        string $companyNameOrigin
    ) {
        $this->companyCode = $companyCode;
        $this->companyName = $companyName;
        $this->companyNameKana = $companyNameKana;
        $this->companyNameOrigin = $companyNameOrigin;
    }

    public function toArray(): array
    {
        return [
            'companyCode' => $this->companyCode,
            'companyName' => $this->companyName,
            'companyNameKana' => $this->companyNameKana,
            'companyNameOrigin' => $this->companyNameOrigin,
        ];
    }
}
