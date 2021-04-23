<?php

namespace App\Factories;

use App\Entities\CompanyEntity;
use App\Entities\CompanyTypeEntity;
use App\Entities\RailwayRailtrackTypeEntity;
use App\Entities\RailwayTypeEntity;
use App\Models\CompanyModel;

class CompanyEntityFactory
{
    public function createFromModel(CompanyModel $companyModel, array $relations = []): CompanyEntity
    {
        $companyEntity = new CompanyEntity(
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

        if (array_key_exists(CompanyEntity::RELATION_COMPANY_TYPE, $relations)) {
            $companyEntity->setCompanyType(
                new CompanyTypeEntity(
                    $companyModel->companyType->company_type_id,
                    $companyModel->companyType->company_type_code,
                    $companyModel->companyType->company_type_name,
                )
            );
        }

        if (array_key_exists(CompanyEntity::RELATION_RAILWAY_TYPES, $relations)) {
            $railwayTypes = [];
            foreach ($companyModel->railwayTypes as $model) {
                $railwayTypes[] = new RailwayTypeEntity(
                    $model->railway_type_id,
                    $model->railway_type_code,
                    $model->railway_type_name,
                );
            }
            $companyEntity->setRailwayTypes($railwayTypes);
        }

        if (array_key_exists(CompanyEntity::RELATION_RAILWAY_RAILTRACK_TYPES, $relations)) {
            $railwayRailtrackTypes = [];
            foreach ($companyModel->railwayRailtrackTypes as $model) {
                $railwayRailtrackTypes[] = new RailwayRailtrackTypeEntity(
                    $model->railway_railtrack_type_id,
                    $model->railway_railtrack_type_code,
                    $model->railway_railtrack_type_name
                );
            }
            $companyEntity->setRailwayRailtrackTypes($railwayRailtrackTypes);
        }

        if (array_key_exists(CompanyEntity::RELATION_LINES, $relations)) {
            $lines = [];
            $lineEntityFactory = new LineEntityFactory();
            foreach ($companyModel->lines as $lineModel) {
                $lines[] = $lineEntityFactory->createFromModel($lineModel);
            }
            $companyEntity->setLines($lines);
        }

        return $companyEntity;
    }
}
