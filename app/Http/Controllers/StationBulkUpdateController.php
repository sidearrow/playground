<?php

namespace App\Http\Controllers;

use App\Http\Requests\StationBulkUpdateRequest;
use App\UseCases\StationBulkUpdateUseCase;

class StationBulkUpdateController extends Controller
{

    public function __invoke(StationBulkUpdateRequest $request)
    {
        $bulkUpdateData = $request->post('bulkUpdateData');

        $stationBulkSetupUseCase = new StationBulkUpdateUseCase($bulkUpdateData);
    }
}
