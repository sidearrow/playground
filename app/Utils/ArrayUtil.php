<?php

namespace App\Utils;

class ArrayUtil
{
    public static function toAssoc(array $inputArray): array
    {
        $res = [];

        foreach ($inputArray as $i => $row) {
            if ($i === 0) {
                continue;
            }
            $tmp = [];
            foreach ($inputArray[0] as $headerIndex => $headerName) {
                $tmp[$headerName] = $row[$headerIndex];
            }
            $res[] = $tmp;
        }

        return $res;
    }
}
