<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

abstract class AbstractRepository
{
    protected function getColumnNamesCommon(string $tableName): array
    {
        $columns = DB::select('show columns from ' . $tableName);

        $columnNames = [];
        foreach ($columns as $column) {
            $columnNames[] = $column->Field;
        }

        return $columnNames;
    }
}
