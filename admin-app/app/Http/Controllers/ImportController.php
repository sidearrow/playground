<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImportController extends Controller
{
    public function index()
    {
        $tables = ['company', 'line'];

        return view('pages/import', ['tables' => $tables]);
    }

    public function import()
    {
        return redirect('/import');
    }
}
