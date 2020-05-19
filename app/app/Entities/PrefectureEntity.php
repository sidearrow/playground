<?php

namespace App\Entities;

class PrefectureEntity
{
    public $prefectureId;

    public $prefectureName;

    public $prefectureNameKana;

    public function __constructor(int $prefectureId, string $prefectureName, string $prefectureNameKana)
    {
        $this->prefectureId = $prefectureId;

        $this->prefectureName = $prefectureName;

        $this->prefectureNameKana = $prefectureNameKana;
    }
}
