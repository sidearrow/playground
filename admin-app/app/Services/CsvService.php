<?php

namespace App\Services;

class CsvService
{
    private $f;

    public function __construct()
    {
        $this->f = tmpfile();
        debug(stream_get_meta_data($this->f)['uri']);
        debug(['aa' => file_exists(stream_get_meta_data($this->f)['uri'])]);
    }

    public function writeRow(array $row): void
    {
        fputcsv($this->f, $row);
    }

    public function writeRows(array $rows)
    {
        foreach ($rows as $row) {
            $this->writeRow($row);
        }
    }

    public function getFileName(): string
    {
        return stream_get_meta_data($this->f)['uri'];
    }
}
