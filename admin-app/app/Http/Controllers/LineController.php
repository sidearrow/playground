<?php

namespace App\Http\Controllers;

use App\Services\LineService;
use Illuminate\Http\Request;

class LineController extends Controller
{
    private LineService $lineService;

    public function __construct()
    {
        $this->lineService = new LineService();
    }

    public function index()
    {
        $lines = self::entitiyToArray(
            $this->lineService->getAll()
        );

        return view('pages.line.index', ['lines' => $lines]);
    }

    public function detail(int $lineId)
    {
        $line = self::entitiyToArray(
            $this->lineService->getOne($lineId),
        );

        debug($line);

        return view('pages.line.detail', ['line' => $line]);
    }
}
