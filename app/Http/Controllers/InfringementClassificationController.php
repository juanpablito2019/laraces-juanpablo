<?php

namespace App\Http\Controllers;

use App\Http\Requests\InfringementClassificationRequest;
use App\InfringementClassification;
use Illuminate\Http\Request;

class InfringementClassificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return InfringementClassification::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(InfringementClassificationRequest $request)
    {
        InfringementClassification::create([
            'name' => $request->get('name')
        ]);
        return response()->json([
            'status'=>201,
            'success'=>true,
            'message'=>'Clasificación de la infracción agregada exitosamente'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(InfringementClassification $infringementClassification)
    {
        return $infringementClassification;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(InfringementClassificationRequest $request, InfringementClassification $infringementClassification)
    {
        $infringementClassification->name = $request->get('name');
        $infringementClassification->save();
        return response()->json([
            'status' => 200,
            'success'=>true,
            'message'=>'Clasificación de la infracción actualizada exitosamente'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(InfringementClassification $infringementClassification)
    {
        $infringementClassification->delete();
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Clasificación de la infracción eliminada exitosamente'
        ]);
    }
}
