<?php

namespace App\Repositories;

use App\Entities\CompanyEntity;
use App\Factories\CompanyEntityFactory;
use App\Models\CompanyModel;
use Illuminate\Support\Facades\DB;

class CompanyRepository extends AbstractRepository
{
    private CompanyEntityFactory $companyEntityFactory;

    public function __construct()
    {
        $this->companyEntityFactory = new CompanyEntityFactory();
    }

    /** @return CompanyEntity[] */
    public function getAll(): array
    {
        /** @var \Illuminate\Database\Eloquent\Collection<CompanyModel> */
        $companyModels = CompanyModel::with([
            'companyType',
            'railwayTypes',
            'railwayRailtrackTypes',
        ])->get();

        $companyEntities = [];
        foreach ($companyModels as $companyModel) {
            $companyEntities[] = $this->companyEntityFactory->createFromModel($companyModel, [
                CompanyEntity::RELATION_COMPANY_TYPE => [],
                CompanyEntity::RELATION_RAILWAY_TYPES => [],
                CompanyEntity::RELATION_RAILWAY_RAILTRACK_TYPES => [],
            ]);
        }

        return $companyEntities;
    }

    public function getOne(int $companyId): CompanyEntity
    {
        $companyModel = CompanyModel::with([
            'companyType',
            'railwayTypes',
            'railwayRailtrackTypes',
            'lines',
        ])->find($companyId);

        return $this->companyEntityFactory->createFromModel(
            $companyModel,
            [
                CompanyEntity::RELATION_COMPANY_TYPE => [],
                CompanyEntity::RELATION_RAILWAY_TYPES => [],
                CompanyEntity::RELATION_RAILWAY_RAILTRACK_TYPES => [],
                CompanyEntity::RELATION_LINES => [],
            ],
        );
    }

    public function update(CompanyEntity $company): void
    {
        DB::table('company')
            ->where('company_id', '=', $company->companyId)
            ->update([
                'company_code' => $company->companyCode,
                'company_name_alias' => $company->companyNameAlias,
                'company_name_kana' => $company->companyNameKana,
                'company_name' => $company->companyName,
                'length' => $company->length,
                'line_num' => $company->lineNum,
                'station_num' => $company->stationNum,
            ]);
    }
}
