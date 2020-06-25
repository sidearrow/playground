<?php

namespace App\Services;

use App\Entities\CompanyEntity;
use App\Factories\CompanyEntityFactory;
use App\Factories\CompanyStatisticsEntityFactory;
use App\Repositories\CompanyRepository;
use App\Utils\StdClassUtil;

class CompanyService
{
    private CompanyEntityFactory $companyEntityFactory;

    private CompanyStatisticsEntityFactory $companyStatisticsEntityFactory;

    private CompanyRepository $companyRepository;

    public function __construct()
    {
        $this->companyEntityFactory = new CompanyEntityFactory();

        $this->companyStatisticsEntityFactory = new CompanyStatisticsEntityFactory();

        $this->companyRepository = new CompanyRepository();
    }

    /**
     * @return \App\Entities\CompanyEntity[]
     */
    public function getAll(): array
    {
        $companyModels = $this->companyRepository->getAll();

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
        return $this->companyEntityFactory->createFromModel(
            $this->companyRepository->getOne($companyId),
            [
                CompanyEntity::RELATION_COMPANY_TYPE => [],
                CompanyEntity::RELATION_RAILWAY_TYPES => [],
                CompanyEntity::RELATION_RAILWAY_RAILTRACK_TYPES => [],
            ],
        );
    }

    public function getOneByCompanyCode(string $companyCode): CompanyEntity
    {
        return $this->companyEntityFactory->createFromModel(
            $this->companyRepository->getOneByCompanyCode($companyCode)
        );
    }

    /**
     * @return CompanyStatisticsEntity[]
     */
    public function getStatistics(int $companyId): array
    {
        $companyStatisticsModelCollection = $this->companyRepository->getStatistics($companyId);

        $companyStatisticsEntities = [];
        foreach ($companyStatisticsModelCollection as $model) {
            $companyStatisticsEntities[] = $this->companyStatisticsEntityFactory->createFromModel($model);
        }

        return $companyStatisticsEntities;
    }

    public function getColumnNames(): array
    {
        return $this->companyRepository->getColumnNames();
    }

    public function bulkUpdate(array $data): void
    {
        $this->companyRepository->bulkUpdate($data);
    }

    public function update(int $companyId, array $data): void
    {
        $this->companyRepository->update($companyId, $data);
    }
}
