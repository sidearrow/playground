<?php

namespace App\Http\Controllers;

use App\Services\CompanyService;
use App\Services\CsvService;
use Illuminate\Http\Request;

class ExportController extends Controller
{
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

    public function export(Request $request, string $tableName)
    {
        $columns = $request->get('columns', []);

        $csvService = new CsvService();
        $csvService = $this->companyService->createCsv($csvService, $columns);

        return response()->download($csvService->getFileName())->deleteFileAfterSend();
    }
}
