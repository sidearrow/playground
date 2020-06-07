<?php

namespace App\Http\Controllers;

use App\Repositories\StationRepository;
use App\Services\StationService;
use Illuminate\Http\Request;

class GroupStationController extends Controller
{
    private StationService $stationService;

    public function __construct()
    {
        $this->stationService = new StationService();
    }

    public function index(Request $request)
    {
        $searchStationName = $request->get('stationName');

        $stationGroups = [];
        if ($searchStationName !== null) {
            $stationGroups = $this->stationService->getStationGroupsSearchByStationName($searchStationName);
        }

        $viewData = self::entitiyToArray(['stationGroups' => $stationGroups]);

        debug($viewData);

        return view('pages/group_station', $viewData);
    }
}
