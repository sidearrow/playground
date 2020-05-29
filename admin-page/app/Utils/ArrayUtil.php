<?php

namespace App\Utils;

class ArrayUtil
{
    public static function group(array $arr, string $groupKey, bool $isArrayValues = true)
    {
        $res = [];
        foreach ($arr as $row) {
            $targetKey = $row[$groupKey];
            if (!array_key_exists($targetKey, $row)) {
                $res[$targetKey] = [];
            }
            $res[$targetKey][] = $row;
        }

        if ($isArrayValues) {
            $res = array_values($res);
        }

        return $res;
    }
}
