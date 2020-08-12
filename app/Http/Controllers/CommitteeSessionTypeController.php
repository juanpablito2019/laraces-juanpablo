<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CommitteeSessionType;
use App\Http\Requests\CommitteeSessionTypeRequest;

class CommitteeSessionTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CommitteeSessionType::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CommitteeSessionTypeRequest $request)
    {
        CommitteeSessionType::create([
            'name' => $request->get('name')
        ]);
        return response()->json([
            'status'=>201,
            'success'=>true,
            'message' => 'Tipo de caso agregado exitosamente'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(CommitteeSessionType $committeeSessionType)
    {
        return $committeeSessionType;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CommitteeSessionTypeRequest $request, CommitteeSessionType $committeeSessionType)
    {
        $committeeSessionType->name = $request->get('name');
        $committeeSessionType->save();
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Tipo de caso actualizado exitosamente'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(CommitteeSessionType $committeeSessionType)
    {
        $committeeSessionType->delete();
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Tipo de caso eliminado exitosamente'
        ]);
    }
}
