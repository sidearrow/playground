<?php

namespace App\Http\Controllers;

use App\Repositories\PrefectureRepository;
use Illuminate\Http\Request;

class EloquentSampleController extends Controller
{
    public function index()
    {
        $prefectureRepository = new PrefectureRepository();

        $prefectureRepository->getAll();

        return view('pages/eloquent-sample/index');
    }
}
