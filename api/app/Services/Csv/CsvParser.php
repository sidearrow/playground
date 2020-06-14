<?php

namespace App\Services\Csv;

use SplFileObject;

class CsvParser
{
    private $filePath;
    private $splFileObject;

    public function __construct(string $data, string $delimiter = "\t")
    {
        $this->filePath = storage_path('app/tmp/' . uniqid());
        file_put_contents($this->filePath, $data);

        $this->splFileObject = new SplFileObject($this->filePath);
        $this->splFileObject->setFlags(SplFileObject::READ_CSV);
        $this->splFileObject->setCsvControl($delimiter);
    }

    public function __destruct()
    {
        unlink($this->filePath);
    }

    public function getFilePath()
    {
        return $this->filePath;
    }

    public function getAssocArray(): array
    {
        $header = $this->splFileObject->current();

        $res = [];
        foreach ($this->splFileObject as $i => $row) {
            if ($i === 0 || $row[0] === null) {
                continue;
            }
            $resRow = [];
            foreach ($row as $i => $col) {
                $resRow[$header[$i]] = $col;
            }
            $res[] = $resRow;
        }

        return $res;
    }
}
