<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use stdClass;

class LineDetailController extends Controller
{
    public function __invoke(string $lineCode)
    {
        $dbLineData = $this->getLineData($lineCode);

        $dbStationData = $this->getStationData($dbLineData->line_id);

        $stationData = [];
        foreach ($dbStationData as $row) {
            $stationData[] = [
                'stationId' => $row->station_id,
                'stationName' => $row->station_name,
                'stationNameKana' => $row->station_name_kana,
                'stationNameWiki' => $row->station_name_wiki,
            ];
        }

        return view('pages.line.detail', [
            'lineName' => $dbLineData->line_name,
            'stationData' => $stationData,
        ]);
    }

    private function getStationData(string $lineId): array
    {
        $data = DB::table('line_station as ls')
            ->select()
            ->leftJoin('station as s', 's.station_id', '=', 'ls.station_id')
            ->where('ls.line_id', '=', $lineId)
            ->get()
            ->toArray();

        return $data;
    }

    private function getLineData(string $lineCode): stdClass
    {
        $data = DB::table('line')
            ->select()
            ->where('line_code', '=', $lineCode)
            ->first();

        return $data;
    }
}
