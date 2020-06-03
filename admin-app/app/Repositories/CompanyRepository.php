<?php

namespace App\Repositories;

use App\Models\CompanyModel;
use Illuminate\Database\Eloquent\Collection;

class CompanyRepository extends AbstractRepository
{
    /**
     * @return Collection<CompanyModel>
     */
    public function getAll(): Collection
    {
        return CompanyModel::all();
    }

    public function getOne(int $companyId): CompanyModel
    {
        return CompanyModel::find($companyId);
    }

    public function getOneByCompanyCode(string $companyCode): CompanyModel
    {
        return CompanyModel::where('company_code', '=', $companyCode)->first();
    }
}
