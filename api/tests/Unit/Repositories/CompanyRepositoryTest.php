<?php

namespace Tests\Unit\Repositories;

use App\Repositories\CompanyRepository;
use DB;
use Tests\TestCase;

use function GuzzleHttp\json_decode;

class CompanyRepositoryTest extends TestCase
{
    public static function selectRecords(array $companyIds): array
    {
        return DB::table('company')->whereIn('company_id', $companyIds)->select()->get()->toArray();
    }

    public static function insertRecord(array $data): void
    {
        DB::table('company')->insert($data);
    }

    public static function deleteRecords(array $companyIds): void
    {
        DB::table('company')->whereIn('company_id', $companyIds)->delete();
    }

    public static function toArray($data): array
    {
        return json_decode(json_encode($data), true);
    }

    public function testBulkUpdate()
    {
        $data = array_map(function ($i) {
            return [
                'company_id' => 90000 + $i,
                'company_code' => 'companyCode' . $i,
                'company_name' => 'companyName' . $i,
                'company_name_alias' => 'companyNameAlias' . $i,
                'company_name_kana' => 'companyNameKana' . $i,
                'company_type_id' => 1,
                'length' => 11.1 + $i,
                'line_num' => 4 + $i,
                'station_num' => 100 + $i,
                'prefecture_id' => 10 + $i,
                'status' => 0,
                'corporate_color' => 'ccc',
            ];
        }, [1, 2, 3]);

        $companyIds = [90001, 90002, 90003];

        self::deleteRecords($companyIds);
        self::insertRecord($data);

        $this->assertEquals($data, self::toArray(self::selectRecords($companyIds)));

        $updateData = [
            ['company_id' => 90001, 'company_name' => 'update1'],
            ['company_id' => 90002, 'company_name' => 'update2'],
        ];

        $companyRepository = new CompanyRepository();
        $companyRepository->bulkUpdate($updateData);

        $data[0]['company_name'] = 'update1';
        $data[1]['company_name'] = 'update2';

        $this->assertEquals($data, self::toArray(self::selectRecords($companyIds)));
    }
}
