<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class IndexController extends Controller
{
    public function index()
    {
        $companyNum = DB::table('company')->count();
        $lineNum = DB::table('line')->count();
        $stationNum = DB::table('station')->count();

        return view('pages/index', ['status' => [
            ['title' => '事業者数', 'value' => $companyNum],
            ['title' => '路線数', 'value' => $lineNum],
            ['title' => '駅数', 'value' => $stationNum],
        ]]);
    }
}
