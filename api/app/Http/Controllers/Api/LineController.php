<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\LineRepository;
use Illuminate\Http\Request;

class LineController extends Controller
{
    private LineRepository $lineRepository;

    public function __construct()
    {
        $this->lineRepository = new LineRepository();
    }

    public function getAll()
    {
        $lines = $this->lineRepository->getAll();

        return $lines;
    }
}
