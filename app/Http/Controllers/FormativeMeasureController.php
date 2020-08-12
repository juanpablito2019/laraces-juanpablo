<?php

namespace App\Http\Controllers;

use App\FormativeMeasure;
use Illuminate\Http\Request;
use App\Http\Requests\FormativeMeasureRequest;

class FormativeMeasureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return FormativeMeasure::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(FormativeMeasureRequest $request)
    {
        FormativeMeasure::create([
            'name' => $request->get('name')
        ]);
        return response()->json([
            'status'=>201,
            'success'=>true,
            'message' => 'Medida formativa agregada exitosamente'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(FormativeMeasure $formativeMeasure)
    {
        return $formativeMeasure;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(FormativeMeasureRequest $request, FormativeMeasure $formativeMeasure)
    {
        $formativeMeasure->name = $request->get('name');
        $formativeMeasure->save();
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Medida formativa actualizada exitosamente'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(FormativeMeasure $formativeMeasure)
    {
        $formativeMeasure->delete();
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Medida formativa eliminada exitosamente'
        ]);
    }
}
