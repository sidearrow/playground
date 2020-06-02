<?php

namespace App\Factories;

use App\Entities\LineEntity;
use App\Models\LineModel;

class LineEntityFactory
{
    public function createFromModel(LineModel $lineModel): LineEntity
    {
        $lineEntity = new LineEntity(
            $lineModel->line_id,
            $lineModel->line_code,
            $lineModel->line_name,
            $lineModel->line_name_alias,
            $lineModel->line_name_kana,
            $lineModel->station_num,
            $lineModel->operating_kilo,
            $lineModel->real_kilo,
        );

        return $lineEntity;
    }
}
