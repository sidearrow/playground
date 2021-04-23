<?php

namespace App\Repositories\Company;

use App\Repositories\AbstractRepositoryEntity;

class CompanyRepositoryPatchEntity extends AbstractRepositoryEntity
{
    private const COLUMN_COMPANY_NAME = 'company_name';

    public function setCompanyCode(string $companyCode): void
    {
        $this->isTargetCompanyCode = true;
        $this->companyCode = $companyCode;
    }

    public function setCompanyName(string $companyName): void
    {
        $this->setProperty(self::COLUMN_COMPANY_NAME, $companyName);
    }

    public function setCompanyNameAlias(string $companyNameAlias): void
    {
    }

    public function toArray(): array
    {
    }
}
