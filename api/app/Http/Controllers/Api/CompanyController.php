<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\CompanyRepository;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    private CompanyRepository $companyRepository;

    public function __construct()
    {
        $this->companyRepository = new CompanyRepository();
    }

    public function index()
    {
        $companies = $this->companyRepository->getAll();

        return $companies;
    }
}
