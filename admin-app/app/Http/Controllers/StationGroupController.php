<?php

namespace App\Http\Controllers;

use App\Services\StationGroupService;
use App\Services\StationService;
use Illuminate\Http\Request;

class StationGroupController extends Controller
{
    private StationService $stationService;
    private StationGroupService $stationGroupService;

    public function __construct()
    {
        $this->stationService = new StationService();
        $this->stationGroupService = new StationGroupService();
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

        $this->stationGroupService->create($stationId);

        return redirect(url()->previous());
    }

    public function update(Request $request)
    {
        $stationGroupId = $request->post('stationGroupId');
        $stationId = $request->post('stationId');

        $this->stationGroupService->update($stationGroupId, $stationId);

        return redirect(url()->previous());
    }

    public function delete(Request $request)
    {
        $stationGroupId = $request->post('stationGroupId');
        $stationId = $request->post('stationId');

        $this->stationGroupService->delete($stationGroupId, $stationId);

        return redirect(url()->previous());
    }
}
