<?php

namespace App\Http\Controllers;

use App\Models\CompanyModel;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function index()
    {
        $dbCompanies = CompanyModel::all();

        $companies = [];
        foreach ($dbCompanies as $company) {
            $companies[] = [
                'companyName' => $company->company_name_alias
            ];
        }

        return view('pages/company/index', ['companies' => $companies]);
    }
}
