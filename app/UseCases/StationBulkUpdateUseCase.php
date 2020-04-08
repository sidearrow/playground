<?php

namespace App\UseCases;

use App\Utils\ArrayUtil;
use Illuminate\Support\Facades\DB;

class StationBulkUpdateUseCase
{
    private const HEADER_LINE_ID = 'line_id';
    private const HEADER_STATION_ID = 'station_id';
    private const HEADER_LENGTH = 'length';
    private const HEADER_LENGTH_BETWEEN = 'length_between';

    private const KEY_COLUMNS = [
        self::HEADER_LINE_ID,
        self::HEADER_STATION_ID
    ];

    public const DELIMITER_TAB = "\t";

    private $data;

    public function __construct(string $str, string $delimiter = self::DELIMITER_TAB)
    {
        $data = str_getcsv($str, $delimiter);
        $header = $data[0];

        if (!self::validateHeader($header)) {
            return;
        }

        $this->data = ArrayUtil::toAssoc($data);

        $currentData = $this->getStationLineData($data, $header);

        if (!self::validateData($header, $currentData)) {
            return;
        }

        $this->update();
    }

    private static function validateHeader(array $header): bool
    {
        foreach (self::KEY_COLUMNS as $requiredHeader) {
            if (!in_array($requiredHeader, $header)) {
                return false;
            }
        }

        return true;
    }

    private static function validateData(array $header, array $currentData): bool
    {
        foreach ($currentData as $row) {
            foreach ($header as $columnName) {
                if (in_array($columnName, self::KEY_COLUMNS)) {
                    continue;
                }
                if ($row->{$columnName} !== null) {
                    return false;
                }
            }
        }

        return true;
    }

    private function getStationLineData(array $data, array $targetColumn): array
    {
        $lineIdIndex = array_search(self::HEADER_LINE_ID, $data[0]);
        $stationIdIndex = array_search(self::HEADER_STATION_ID, $data[0]);

        $targetLineStation = array_map(function ($v) use ($lineIdIndex, $stationIdIndex) {
            return '(' . $v[$lineIdIndex] . ', ' . $v[$stationIdIndex] . ')';
        }, $data);

        $data = DB::table('line_station')
            ->select($targetColumn)
            ->whereRaw("(line_id, station_id) in (" . implode(',', $targetLineStation) . ")")
            ->get()
            ->toArray();

        return $data;
    }

    private function update()
    {
        DB::transaction(function () {
            foreach ($this->data as $row) {
                $updateData = [];
                foreach ($row as $k => $v) {
                    if ($k === self::HEADER_LINE_ID || $k === self::HEADER_STATION_ID) {
                        $updateData[$k] = $v;
                    }
                }

                DB::table('line_station')
                    ->where('line_id', '=', $this->data[self::HEADER_LINE_ID])
                    ->where('station_id', '=', $this->data[self::HEADER_STATION_ID])
                    ->update($updateData);
            }
        });
    }
}
