<?php

namespace App\Repositories;

use App\Entities\PrefectureEntity;
use App\ModelEloquent\Prefecture;

class PrefectureRepository
{
    /**
     * @return PrefectureEntity[]
     */
    public function getAll(): array
    {
        $prefectures = Prefecture::with('region')->get();

        $prefectureEntities = [];
        foreach ($prefectures as $prefecture) {
            $prefectureEntities[] = new PrefectureEntity($prefecture->prefecture_id, $prefecture->prefecture_name, $prefecture->prefecture_name_kana);
        }

        debug($prefectures);

        return $prefectureEntities;
    }
}
