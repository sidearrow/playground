<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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
        return $this->companyService->getAll();
    }

    public function getOne(int $companyId)
    {
        return $this->companyService->getOne($companyId);
    }

    public function getOneByCode(string $companyCode)
    {
        return $this->companyService->getOneByCompanyCode($companyCode);
    }

    public function getLines(int $companyId)
    {
        return $this->lineService->getByCompanyId($companyId);
    }

    public function getStatistics(int $companyId)
    {
        return $this->companyService->getStatistics($companyId);
    }
}
