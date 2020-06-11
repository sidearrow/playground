<?php

namespace App\Http\Controllers;

use App\Services\StationGroupService;
use App\Services\StationService;
use Illuminate\Http\Request;

class StationController extends Controller
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
        $stationName = $request->get('stationName');

        $stations = [];
        if ($stationName !== null) {
            $stations = $this->stationService->getManyByStationName($stationName);
        }

        $viewData = self::entitiyToArray(['stations' => $stations]);

        return view('pages/station', $viewData);
    }

    public function stationGroupUpdate(Request $request, string $stationId)
    {
        $addStationId = $request->post('stationId');

        if ($addStationId !== null) {
            $this->stationGroupService->createOrUpdate($stationId, $addStationId);
        }

        return redirect(url()->previous());
    }

    public function stationGroupDelete(Request $request, string $stationId)
    {
        $this->stationGroupService->delete($stationId);

        return redirect(url()->previous());
    }
}
