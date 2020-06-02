<?php

namespace App\Entities;

use JsonSerializable;

class LineSectionEntity implements JsonSerializable
{
    private int $lineId;
    private int $sectionId;
    private string $lineSectionName;

    public function __construct(
        int $lineId,
        int $sectionId,
        string $lineSectionName
    ) {
        $this->lineId = $lineId;
        $this->sectionId = $sectionId;
        $this->lineSectionName = $lineSectionName;
    }

    public function jsonSerialize()
    {
        return [
            'lineId' => $this->lineId,
            'sectionId' => $this->sectionId,
            'lineSectionName' => $this->lineSectionName,
        ];
    }
}
