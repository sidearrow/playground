<?php

namespace App\Factories;

use App\Entities\CompanyEntity;
use App\Models\CompanyModel;

class CompanyEntityFactory
{
    public function createFromModel(CompanyModel $companyModel): CompanyEntity
    {
        return new CompanyEntity(
            $companyModel->company_id,
            $companyModel->company_code,
            $companyModel->company_name,
            $companyModel->company_name_alias,
            $companyModel->company_name_kana,
            $companyModel->length,
            $companyModel->line_num,
            $companyModel->station_num,
            $companyModel->corporate_color
        );
    }
}
