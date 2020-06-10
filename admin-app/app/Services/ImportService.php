<?php

namespace App\Services;

class ImportService
{
    private const REQUIRED_FIELD = [
        'company' => ['company_id']
    ];

    public function import(string $tableName, array $data)
    {
    }
}
