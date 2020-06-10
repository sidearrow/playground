<?php

namespace Tests\Unit\Services;

use App\Services\CsvService;
use Tests\TestCase;

class CsvServiceTest extends TestCase
{
    public function testCsv()
    {
        $csvService = new CsvService();

        $row = ['val11', 'val12'];
        $rows = [['val21', 'val22'], ['val31', 'val32']];
        $expected = implode(PHP_EOL, ["val11,val12", "val21,val22", "val31,val32"]) . PHP_EOL;

        $csvService->writeRow($row);
        $csvService->writeRows($rows);

        $csv = $csvService->getContent();

        $this->assertEquals($expected, $csv);
    }

    public function testTsv()
    {
        $csvService = new CsvService(CsvService::DELIMITER_TAB);

        $row = ['val11', 'val12'];
        $rows = [['val21', 'val22'], ['val31', 'val32']];
        $expected = implode(PHP_EOL, ["val11\tval12", "val21\tval22", "val31\tval32"]) . PHP_EOL;

        $csvService->writeRow($row);
        $csvService->writeRows($rows);

        $tsv = $csvService->getContent();

        $this->assertEquals($expected, $tsv);
    }
}
