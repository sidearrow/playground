<?php

namespace App\Services;

use App\Services\Csv\CsvGenerator;
use App\Services\Csv\CsvParser;
use App\Services\Csv\CsvTypeEnum;

class CsvService
{
    public function createStringFromArray(CsvTypeEnum $csvTypeEnum, array $data): string
    {
        if (count($data) === 0) {
            return '';
        }

        $csvGenerator = new CsvGenerator($csvTypeEnum);
        $csvGenerator->writeRows($data);

        return $csvGenerator->getContent();
    }

    public function createStringFromAssocArray(CsvTypeEnum $csvTypeEnum, array $data): string
    {
        if (count($data) === 0) {
            return '';
        }

        $csvGenerator = new CsvGenerator($csvTypeEnum);
        $csvGenerator->writeRow(array_keys($data[0]));
        $csvGenerator->writeRows($data);

        return $csvGenerator->getContent();
    }

    public function getAssocArrayFromTsvString(string $data)
    {
        $csvParser = new CsvParser($data);

        return $csvParser->getAssocArray();
    }
}
