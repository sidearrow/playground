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
            $data = $company->toArray();
            $res[] = [
                'companyCode' => $data['companyCode'],
                'companyName' => $data['companyName'],
                'companyNameKana' => $data['companyNameKana'],
                'lineUrl' => url('/company/' . $data['companyCode'] . '/line'),
            ];
        }

        return view('pages.company.index', [
            'companies' => $res,
        ]);
    }
}
