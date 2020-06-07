<?php

namespace App\Http\Controllers;

use App\Services\CompanyService;
use App\Services\LineService;

class CompanyController extends Controller
{
    private CompanyService $companyService;
    private LineService $lineService;

    public function __construct()
    {
        $this->companyService = new CompanyService();
        $this->lineService = new LineService();
    }

    public function index()
    {
        $companies = $this->companyService->getAll();
        $companies = self::entitiyToArray($companies);

        return view('pages/company', ['companies' => $companies]);
    }

    public function detail(string $companyId)
    {
        $company = $this->companyService->getOne($companyId);
        $lines = $this->lineService->getByCompanyId($companyId);

        $viewData = self::entitiyToArray([
            'company' => $company,
            'lines' => $lines,
        ]);

        return view('pages/company_detail', $viewData);
    }
}
