<?php

namespace Tests\Unit\Factories;

use App\Factories\CompanyEntityFactory;
use App\Models\CompanyModel;
use PHPUnit\Framework\TestCase;
use ReflectionClass;

class CompanyEntityFactoryTest extends TestCase
{
    public function testCreateFromModel()
    {
        $companyModel = new CompanyModel();

        $companyModel->company_id = 1;
        $companyModel->company_code = 'company_code';
        $companyModel->company_name = 'company_name';
        $companyModel->company_name_alias = 'company_name_alias';
        $companyModel->company_name_kana = 'company_name_kana';
        $companyModel->length = 2.0;
        $companyModel->line_num = 3;
        $companyModel->station_num = 4;
        $companyModel->corporate_color = 'corporate_color';

        $companyEntityFactory = new CompanyEntityFactory();
        $companyEntity = $companyEntityFactory->createFromModel($companyModel);

        $companyEntityReflection = new ReflectionClass($companyEntity);

        $companyId = $companyEntityReflection->getProperty('companyId');
        $companyId->setAccessible(true);
        var_dump($companyId->getValue($companyEntity));

        $testCases = [
            'companyId' => $companyModel->company_id,
            'companyCode' => $companyModel->company_code,
            'companyName' => $companyModel->company_name,
            'companyNameAlias' => $companyModel->company_name_alias,
            'companyNameKana' => $companyModel->company_name_kana,
            'length' => $companyModel->length,
            'lineNum' => $companyModel->line_num,
            'stationNum' => $companyModel->station_num,
            'corporateColor' => $companyModel->corporate_color,
        ];

        foreach ($testCases as $propertyName => $expected) {
            $prop = $companyEntityReflection->getProperty($propertyName);
            $prop->setAccessible(true);

            $this->assertEquals($expected, $prop->getValue($companyEntity));
        }
    }
}
