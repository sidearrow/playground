<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\LineService;

class LineController extends Controller
{
    private LineService $lineService;

    public function __construct()
    {
        $this->lineService = new LineService();
    }

    public function getAll()
    {
        return $this->lineService->getAll();
    }

    public function getDetail(int $lineId)
    {
        return $this->lineService->getOne($lineId);
    }
}
