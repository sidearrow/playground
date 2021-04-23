<?php

namespace App\Repositories;

use stdClass;

class AbstractRepositoryEntity extends stdClass
{
    private const IS_TARGET_PREFIX = 'isTarget';

    protected function setProperty(string $name, $value): void
    {
        $this->{$name} = $value;
        $this->{self::IS_TARGET_PREFIX . $name} = true;
    }

    protected function isTargetProperty(string $propName): bool
    {
        return $this->{self::IS_TARGET_PREFIX . $propName} ?? false;
    }

    protected function toArrayCommon(array $columnNames): array
    {
        $res = [];
        foreach ($columnNames as $columnName) {
            if ($this->isTargetProperty($columnName)) {
                $res[$columnName] = $this->{$columnName};
            }
        }

        return $res;
    }
}
