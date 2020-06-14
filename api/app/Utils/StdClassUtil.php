<?php

namespace App\Utils;

use stdClass;

class StdClassUtil
{
    public static function toArray(stdClass $stdClass, array $properties = null): array
    {
        $properties ??= self::getProperties($stdClass);

        $res = [];
        foreach ($properties as $property) {
            $res[] = $stdClass->{$property};
        }

        return $res;
    }

    public static function getProperties(stdClass $stdClass): array
    {
        return array_keys(json_decode(json_encode($stdClass), true));
    }

    public static function toArrayBulk(array $stdClassArray): array
    {
        if (count($stdClassArray) === 0) {
            return [];
        }

        $properties = self::getProperties($stdClassArray[0]);

        $res = [];
        foreach ($stdClassArray as $stdClass) {
            $res[] = self::toArray($stdClass, $properties);
        }

        return $res;
    }

    public static function toAssocArrayBulk(array $stdClassArray): array
    {
        return json_decode(json_encode($stdClassArray), true);
    }
}
