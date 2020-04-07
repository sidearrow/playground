<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LineController extends Controller
{
    public function __invoke()
    {
        $dbLineData = $this->getLineData();

        $lineData = [];
        foreach($dbLineData as $row) {
            $lineData[] = [
                'lineDetailUrl' => $row->line_code === null ? null : url('/line/' . $row->line_code),
                'lineName' => $row->line_name,
                'companyName' => $row->company_name,
            ];
        }

        return view('pages.line.index', [
            'lineData' => $lineData,
        ]);
    }

    private function getLineData(): array
    {
        $data = DB::table('line as l')
            ->select([
                'l.line_name',
                'l.line_code',
                'c.company_name',
            ])
            ->leftJoin('company as c', 'c.company_id', '=', 'l.company_id')
            ->orderBy('c.company_id')
            ->orderBy('l.line_id')
            ->get()
            ->toArray();

        return $data;
    }
}
