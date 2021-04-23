<?php

namespace App\Http\Controllers;

use App\Entities\CompanyEntity;
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

    public function get()
    {
        return $this->companyRepository->getAll();
    }

    public function getOne(int $companyId)
    {
        return $this->companyRepository->getOne($companyId);
    }

    public function update(Request $request, string $companyId)
    {
        $this->companyRepository->update(
            new CompanyEntity(
                $companyId,
                $request->json('companyCode'),
                $request->json('companyName'),
                $request->json('companyNameAlias'),
                $request->json('companyNameKana'),
                $request->json('length'),
                $request->json('lineNum'),
                $request->json('stationNum'),
                $request->json('corporateColor')
            )
        );
    }
}
