<?php

namespace App\Http\Controllers;

use App\Repositories\StationGroupRepository;
use Illuminate\Http\Request;

class StationGroupController extends Controller
{
    private $stationGroupRepository;

    public function __construct(StationGroupRepository $stationGroupRepository)
    {
        $this->stationGroupRepository = $stationGroupRepository;
    }

    public function index(Request $request)
    {
        $stationName = $request->query('stationName');

        $stationGroups = [];
        if ($stationName !== null) {
            $stationGroups = $this->stationGroupRepository->get($stationName);
        }

        return view('pages/station-group/index', ['stationGroups' => $stationGroups]);
    }
}
