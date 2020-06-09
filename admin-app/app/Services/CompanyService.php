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

    public function getColumnNames(): array
    {
        return $this->companyRepository->getColumnNames();
    }

    public function createCsv(CsvService $csvService, array $columns): CsvService
    {
        $data = $this->companyRepository->getAllArraySpecifyColumns($columns);
        if (count($data) > 0) {
            $csvService->writeRow(StdClassUtil::getProperties($data[0]));
        }

        $csvService->writeRows(
            StdClassUtil::toArrayBulk($data)
        );

        return $csvService;
    }
}
