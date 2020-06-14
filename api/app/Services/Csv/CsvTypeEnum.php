<?php

namespace App\Services\Csv;

final class CsvTypeEnum
{
    private const CSV = 'csv';
    private const TSV = 'tsv';

    private string $type;

    private const DELIMITER = [
        self::CSV => ',',
        self::TSV => "\t",
    ];

    private function __construct(string $type)
    {
        $this->type = $type;
    }

    public static function csv(): self
    {
        return new self(self::CSV);
    }

    public static function tsv(): self
    {
        return new self(self::TSV);
    }

    public function getDelimiter(): string
    {
        return self::DELIMITER[$this->type];
    }
}
