<?php

namespace App\Repositories;

use App\Models\CompanyModel;

class CompanyRepository extends AbstractRepository
{
    public function getAll(): array
    {
        $companyModels = CompanyModel::all();

        $companyEntities = [];
        foreach ($companyModels as $companyModel) {
            $companyEntities[] = $this->companyModelToEntity($companyModel);
        }

        return $companyEntities;
    }
}
