<?php

namespace Tests\Unit\Entities;

use App\Entities\CompanyStatisticsEntity;
use PHPUnit\Framework\TestCase;

class CompanyStatisticsEntityTest extends TestCase
{
    public function testInitialAndJsonSerialize()
    {
        $testCase = [
            'companyId' => 1,
            'year' => 2,
            'transportPassengersTeikiTsukin' => 3,
            'transportPassengersTeikiTsugaku' => 4,
            'transportPassengersTeikiTotal' => 5,
            'transportPassengersTeikiPercent' => 6,
            'transportPassengersTeikigai' => 7,
            'transportPassengersTeikigaiPercent' => 8,
            'transportPassengersTotal' => 9,
            'transportRevenuePassengerTeikiTsukin' => 10,
            'transportRevenuePassengerTeikiTsugaku' => 11,
            'transportRevenuePassengerTeikiTotal' => 12,
            'transportRevenuePassengerTeikiPercent' => 13,
            'transportRevenuePassengerTeikigai' => 14,
            'transportRevenuePassengerTeikigaiPercent' => 15,
            'transportRevenuePassengerTotal' => 16,
            'transportRevenuePassengerBaggage' => 17,
            'transportRevenuePassengerTotal2' => 18,
        ];

        $entity = new CompanyStatisticsEntity(
            $testCase['companyId'],
            $testCase['year'],
            $testCase['transportPassengersTeikiTsukin'],
            $testCase['transportPassengersTeikiTsugaku'],
            $testCase['transportPassengersTeikiTotal'],
            $testCase['transportPassengersTeikiPercent'],
            $testCase['transportPassengersTeikigai'],
            $testCase['transportPassengersTeikigaiPercent'],
            $testCase['transportPassengersTotal'],
            $testCase['transportRevenuePassengerTeikiTsukin'],
            $testCase['transportRevenuePassengerTeikiTsugaku'],
            $testCase['transportRevenuePassengerTeikiTotal'],
            $testCase['transportRevenuePassengerTeikiPercent'],
            $testCase['transportRevenuePassengerTeikigai'],
            $testCase['transportRevenuePassengerTeikigaiPercent'],
            $testCase['transportRevenuePassengerTotal'],
            $testCase['transportRevenuePassengerBaggage'],
            $testCase['transportRevenuePassengerTotal2'],
        );

        $this->assertEquals($testCase, $entity->jsonSerialize());
    }
}
