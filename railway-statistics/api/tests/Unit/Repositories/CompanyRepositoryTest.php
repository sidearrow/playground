<?php

namespace Tests\Unit\Repositories;

use App\Entities\CompanyEntity;
use App\Repositories\CompanyRepository;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class CompanyRepositoryTest extends TestCase
{
    public static function getCompany(int $companyId)
    {
        return DB::table('company')
            ->where('company_id', '=', $companyId)
            ->first();
    }

    public static function createCompany(int $companyId)
    {
        DB::table('company')
            ->insert([
                'company_id' => $companyId,
                'company_code' => 'company_code',
                'company_name' => 'company_name',
                'company_name_alias' => 'company_name_alias',
                'company_name_kana' => 'company_name_kana',
                'length' => 10,
                'line_num' => 10,
                'station_num' => 10,
                'company_type_id' => 1,
                'status' => 1,
                'prefecture_id' => 1,
            ]);
    }

    public static function deleteCompany(int $companyId)
    {
        DB::table('company')
            ->where('company_id', '=', $companyId)
            ->delete();
    }

    public function testUpdate()
    {
        $companyId = 999;

        self::deleteCompany($companyId);
        self::createCompany($companyId);

        /** @var CompanyEntity $companyEntity */
        $companyEntity = $this->createMock(CompanyEntity::class);
        $companyEntity->companyId = $companyId;
        $companyEntity->companyCode = 'update_company_code';
        $companyEntity->companyName = 'update_company_name';
        $companyEntity->companyNameAlias = 'update_company_name_alias';
        $companyEntity->companyNameKana = 'update_company_name_kana';
        $companyEntity->length = 100;
        $companyEntity->lineNum = 100;
        $companyEntity->stationNum = 100;

        $companyRepository = new CompanyRepository();
        $companyRepository->update($companyEntity);

        $company = self::getCompany($companyId);

        $this->assertEquals($companyEntity->companyCode, $company->company_code);
        $this->assertEquals($companyEntity->companyName, $company->company_name);
        $this->assertEquals($companyEntity->companyNameAlias, $company->company_name_alias);
        $this->assertEquals($companyEntity->companyNameKana, $company->company_name_kana);
        $this->assertEquals($companyEntity->length, $company->length);
        $this->assertEquals($companyEntity->lineNum, $company->line_num);
        $this->assertEquals($companyEntity->stationNum, $company->station_num);
    }
}
