<?php

namespace App\Http\Controllers;

use App\Services\CompanyService;
use App\Services\Csv\CsvTypeEnum;
use App\Services\CsvService;
use Illuminate\Http\Request;

class ExportController extends Controller
{
    private const RESPONSE_TYPE_FILE = 'file';
    private const RESPONSE_TYPE_TEXT = 'text';

    private const FORMAT_CSV = 'csv';
    private const FORMAT_TSV = 'tsv';

    private CompanyService $companyService;

    public function __construct()
    {
        $this->companyService = new CompanyService();
    }

    public function index()
    {
        $data = [
            [
                'title' => 'company',
                'columns' => $this->companyService->getColumnNames(),
            ]
        ];

        return view('pages/export', ['data' => $data]);
    }

    public function export(
        Request $request,
        string $reponseType,
        string $format,
        string $tableName
    ) {
        $columns = $request->get('columns', []);

        $csvType = $format === self::FORMAT_TSV ? CsvTypeEnum::tsv() : CsvTypeEnum::csv();

        $csvService = new CsvService();
        $companies = $this->companyService->getAllAssocArraySpecifyColumns($columns);

        return $csvService->createStringFromAssocArray($csvType, $companies);
    }
}
