<?php

namespace App\Services;

use App\Entities\CompanyEntity;
use App\Factories\CompanyEntityFactory;
use App\Factories\CompanyStatisticsEntityFactory;
use App\Repositories\CompanyRepository;

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
            $companyEntities[] = $this->companyEntityFactory->createFromModel($companyModel);
        }

        return $companyEntities;
    }

    public function getOne(int $companyId): CompanyEntity
    {
        return $this->companyEntityFactory->createFromModel(
            $this->companyRepository->getOne($companyId)
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
}
