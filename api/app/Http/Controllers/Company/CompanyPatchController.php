<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Services\CompanyService;

class CompanyPatchController extends Controller
{
    private const MAPPING = [
        'companyCode' => 'company_code',
        'companyName' => 'company_name',
        'companyNameAlias' => 'company_name_alias',
        'companyNameKana' => 'company_name_kana',
        'lenght' => 'length',
        'lineNum' => 'line_num',
        'stationNum' => 'station_num',
    ];

    public function __invoke(CompanyPatchRequest $request, int $companyId)
    {
        $data = [];
        foreach (self::MAPPING as $key => $col) {
            if ($request->has($key)) {
                $data[$col] = $request->json($key);
            }
        }

        $companyService = new CompanyService();
        $companyService->update($companyId, $data);

        return [];
    }
}
