<?php

namespace App\Http\Controllers;

use App\Services\CompanyService;
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

        $delimiter = $format === self::FORMAT_TSV
            ? CsvService::DELIMITER_TAB : CsvService::DELIMITER_CONMA;

        $csvService = new CsvService($delimiter);
        $csvService = $this->companyService->createCsv($csvService, $columns);

        if ($reponseType === self::RESPONSE_TYPE_TEXT) {
            return $csvService->getContent();
        }
        return response()->download($csvService->getFilePath())->deleteFileAfterSend();
    }
}
