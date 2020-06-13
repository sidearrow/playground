<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\StationService;
use Illuminate\Http\Request;

class StationController extends Controller
{
    private StationService $stationService;

    public function __construct()
    {
        $this->stationService = new StationService();
    }

    public function get(Request $request)
    {
        $searchStationName = $request->get('stationName');

        $stations = [];
        if ($searchStationName !== null) {
            $stations = $this->stationService->getManyByStationName($searchStationName);
        }

        return $stations;
    }
}
