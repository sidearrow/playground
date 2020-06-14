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
        $mockCompanyModel = $this->getMockBuilder(CompanyModel::class)
            ->disableOriginalConstructor()
            ->getMock();

        $mockCompanyModel->method('__get')->will(
            $this->returnValueMap([
                ['company_id', 1],
                ['company_code', 'company_code'],
                ['company_name', 'company_name'],
                ['company_name_alias', 'company_name_alias'],
                ['company_name_kana', 'company_name_kana'],
                ['length', 2.0],
                ['line_num', 3],
                ['station_num', 4],
                ['corporate_color', 'corporate_color'],
            ])
        );

        $testCases = [
            'companyId' => $mockCompanyModel->company_id,
            'companyCode' => $mockCompanyModel->company_code,
            'companyName' => $mockCompanyModel->company_name,
            'companyNameAlias' => $mockCompanyModel->company_name_alias,
            'companyNameKana' => $mockCompanyModel->company_name_kana,
            'length' => $mockCompanyModel->length,
            'lineNum' => $mockCompanyModel->line_num,
            'stationNum' => $mockCompanyModel->station_num,
            'corporateColor' => $mockCompanyModel->corporate_color,
        ];

        $companyEntity = (new CompanyEntityFactory())->createFromModel($mockCompanyModel);
        $companyEntityReflection = new ReflectionClass($companyEntity);

        foreach ($testCases as $propertyName => $expected) {
            $prop = $companyEntityReflection->getProperty($propertyName);
            $prop->setAccessible(true);

            $this->assertEquals($expected, $prop->getValue($companyEntity));
        }
    }
}
