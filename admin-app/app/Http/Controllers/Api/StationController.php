<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StationController extends Controller
{
    public function get(Request $request)
    {
        $searchStationName = $request->get('stationName');
    }
}
