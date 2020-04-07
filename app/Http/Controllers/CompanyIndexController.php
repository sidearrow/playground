<?php

namespace App\Http\Controllers;

use App\UseCases\CompanyGetAllUseCase;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CompanyIndexController extends Controller
{
    public function __invoke(Request $request, Response $response)
    {
        $companyGetAllUseCase = new CompanyGetAllUseCase();

        $companies = $companyGetAllUseCase();

        $res = [];
        foreach ($companies as $company) {
            $res[] = $company->toArray();
        }

        return view('pages.company.index', [
            'companies' => $res,
        ]);
    }
}
