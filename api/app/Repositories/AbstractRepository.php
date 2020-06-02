<?php

namespace App\Repositories;

use App\Entities\CompanyEntity;
use App\Entities\LineEntity;
use App\Models\CompanyModel;
use App\Models\LineModel;

abstract class AbstractRepository
{
    protected function companyModelToEntity(CompanyModel $model): CompanyEntity
    {
        return new CompanyEntity(
            $model->company_id,
            $model->company_code,
            $model->company_name,
            $model->company_name_alias,
            $model->company_name_kana,
            $model->length,
            $model->line_num,
            $model->station_num,
            $model->corporate_color
        );
    }

    protected function lineModelToEntity(LineModel $model): LineEntity
    {
        return new LineEntity(
            $model->line_id,
            $model->line_code,
            $model->line_name,
            $model->line_name_alias,
            $model->line_name_kana,
            $model->station_num,
            $model->operating_kilo,
            $model->real_kilo,
        );
    }
}
