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

        return view('pages/group_station', $viewData);
    }

    public function create(Request $request)
    {
        $stationId = $request->post('stationId');

        if ($stationId === null) {
            return abort(400);
        }
    }

    public function update(Request $request)
    {
        $stationGroupId = $request->post('stationGroupId');
        $stationId = $request->post('stationId');
    }

    public function delete(Request $request)
    {
        $stationGroupId = $request->post('stationGroupId');
        $stationId = $request->post('stationId');
    }
}
}
