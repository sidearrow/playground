<?php

namespace App\Http\Controllers;

use App\Services\StationService;
use Illuminate\Http\Request;

class StationController extends Controller
{
    private StationService $stationService;

    public function __construct()
    {
        $this->stationService = new StationService();
    }

    public function index(Request $request)
    {
        $stationName = $request->get('stationName');

        $stations = [];
        if ($stationName !== null) {
            $stations = $this->stationService->getManyByStationName($stationName);
        }

        $viewData = self::entitiyToArray(['stations' => $stations]);

        return view('pages/station', $viewData);
    }
}
