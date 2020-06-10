<?php

namespace App\Repositories;

use App\Models\CompanyModel;
use App\Models\CompanyStatisticsModel;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class CompanyRepository extends AbstractRepository
{
    /**
     * @return Collection<CompanyModel>
     */
    public function getAll(): Collection
    {
        return CompanyModel::all();
    }

    public function getAllArraySpecifyColumns(array $columns): array
    {
        return DB::table('company')->select($columns)->get()->toArray();
    }

    public function getOne(int $companyId): CompanyModel
    {
        return CompanyModel::find($companyId);
    }

    public function getOneByCompanyCode(string $companyCode): CompanyModel
    {
        return CompanyModel::where('company_code', '=', $companyCode)->first();
    }

    /**
     * @return Collection<CompanyStatisticsModel>
     */
    public function getStatistics(int $companyId): Collection
    {
        return CompanyStatisticsModel::where('company_id', '=', $companyId)->get();
    }

    public function getColumnNames(): array
    {
        return parent::getColumnNamesCommon('company');
    }

    public function bulkUpdate(array $data)
    {
        DB::transaction(function () use ($data) {
            foreach ($data as $row) {
                $companyId = $row['company_id'];
                unset($row['company_id']);

                DB::table('company')
                    ->where('company_id', '=', $companyId)
                    ->update($row);
            }
        });
    }
}
