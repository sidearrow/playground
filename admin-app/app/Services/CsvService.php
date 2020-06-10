<?php

namespace App\Services;

class CsvService
{
    public const DELIMITER_TAB = "\t";
    public const DELIMITER_CONMA = ',';

    private $f;
    private string $filePath;
    private string $delimiter;

    public function __construct(string $delimiter = self::DELIMITER_CONMA)
    {
        $this->delimiter = $delimiter;
        $this->filePath = $this->getTmpFilePath();

        $this->f = fopen($this->filePath, 'w');
    }

    public function __destruct()
    {
        fclose($this->f);
    }

    private function getTmpFilePath(): string
    {
        return storage_path('app/tmp/' . uniqid());
    }

    public function writeRow(array $row): void
    {
        fputcsv($this->f, $row, $this->delimiter);
    }

    public function writeRows(array $rows): void
    {
        foreach ($rows as $row) {
            $this->writeRow($row);
        }
    }

    public function getFilePath(): string
    {
        return $this->filePath;
    }

    public function getContent(): string
    {
        return file_get_contents($this->filePath);
    }
}
