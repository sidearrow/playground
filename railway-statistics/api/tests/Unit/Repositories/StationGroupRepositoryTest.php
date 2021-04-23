<?php

namespace Tests\Unit\Repositories;

use App\Repositories\StationGroupRepository;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class StationGroupRepositoryTest extends TestCase
{
    private static function createTestStations(array $stationIds): void
    {
        $companyId = DB::table('company')->max('company_id');

        DB::table('station')->insert(
            array_map(function (int $stationId) use ($companyId) {
                return [
                    'station_id' => $stationId,
                    'company_id' => $companyId,
                    'station_name' => 'station_name',
                    'station_name_kana' => 'station_name_kana',
                    'station_name_wiki' => 'station_name_wiki',
                    'prefecture_id' => 1,
                    'address' => 'address',
                    'status_id' => 1,
                    'open_date' => null,
                    'close_date' => null,
                ];
            }, $stationIds)
        );
    }

    private static function deleteTestStations(array $stationIds): void
    {
        DB::table('station_group_station')->whereIn('station_id', $stationIds)->delete();
        DB::table('station')->whereIn('station_id', $stationIds)->delete();
    }

    private static function getGroupStationIds(int $baseStationId): array
    {
        $stationGroupId = DB::table('station_group_station')
            ->where('station_id', '=', $baseStationId)
            ->first(['station_group_id'])
            ->station_group_id;

        $res = DB::table('station_group_station')
            ->where('station_group_id', '=', $stationGroupId)
            ->select(['station_id'])
            ->orderBy('station_id')
            ->get()
            ->toArray();

        return array_map(function ($row) {
            return $row->station_id;
        }, $res);
    }

    public function testUpdate()
    {
        self::deleteTestStations([1, 2, 3, 4]);

        self::createTestStations([1, 2, 3, 4]);

        $stationGroupRepository = new StationGroupRepository();
        $stationGroupRepository->update(1, [2, 3, 4]);

        $this->assertEquals([1, 2, 3, 4], self::getGroupStationIds(1));

        $stationGroupRepository->update(1, [2, 4]);

        $this->assertEquals([1, 2, 4], self::getGroupStationIds(1));

        self::deleteTestStations([1, 2, 3, 4]);
    }
}
