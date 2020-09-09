<?php

namespace App\Http\Controllers;
use App\Committee;
use App\Destination;
use App\Flight;
use Illuminate\Http\Request;

class ReportsController extends Controller
{
    public function index()
    {

        // return Committee::all();

        return Committee::select('*')->orderBy('date', 'desc')->limit(3)->get();

    }

}
