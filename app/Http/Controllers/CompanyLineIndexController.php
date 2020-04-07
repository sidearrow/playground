<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CompanyLineIndexController extends Controller
{
    public function __invoke(Request $request)
    {
        $companyCode = $request->route('companyCode');

        $data = $this->getLineData($companyCode);

        return view('pages.company.line');
    }

    private function getLineData(string $companyCode): array
    {
        $data = DB::table('line as l')
            ->select()
            ->leftJoin('company as c', 'c.company_id', '=', 'l.company_id')
            ->where('c.company_code', '=', $companyCode)
            ->get()
            ->toArray();

        return $data;
    }
}
