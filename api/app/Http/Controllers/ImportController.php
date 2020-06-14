<?php

namespace App\Http\Controllers;

use App\Services\CompanyService;
use App\Services\CsvService;
use Illuminate\Http\Request;

class ImportController extends Controller
{
    private CsvService $csvService;

    public function __construct()
    {
        $this->csvService = new CsvService();
    }

    public function index()
    {
        $tables = ['company', 'line'];

        return view('pages/import', ['tables' => $tables]);
    }

    public function import(Request $request)
    {
        $table = $request->post('table');
        $data = $request->post('data');

        if ($data !== null) {
            $data = $this->csvService->getAssocArrayFromTsvString($data);

            if ($table === 'company') {
                $companyService = new CompanyService();
                $companyService->bulkUpdate($data);
            }
        }


        return redirect('/import');
    }
}
