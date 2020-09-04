<?php

namespace App\Http\Controllers;

use App\CommitteeParameter;
use Illuminate\Http\Request;
use App\Http\Requests\CommitteeParameterRequest;

class CommitteeParameterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CommitteeParameter::with('actTemplate')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CommitteeParameterRequest $request)
    {
        CommitteeParameter::create([
            'name' => $request->get('name'),
            'content' => $request->get('content'),
            'act_template_id' => $request->get('act_template_id')
        ]);
        return response()->json([
            'success'=>true,
            'status'=>201,
            'message'=>'Parametro de comite agregado exitosamente'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(CommitteeParameter $committeeParameter)
    {
        return $committeeParameter;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CommitteeParameterRequest $request, CommitteeParameter $committeeParameter)
    {
        $committeeParameter->name = $request->get('name');
        $committeeParameter->content = $request->get('content');
        $committeeParameter->committee_session_state_id = $request->get('act_template_id');
        $committeeParameter->save();
        return response()->json([
            'success'=>true,
            'status'=>200,
            'message'=>'Parametro de comite actualizado exitosamente'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(CommitteeParameter $committeeParameter)
    {
        $committeeParameter->delete();
        return response()->json([
            'success'=>true,
            'status'=>200,
            'message'=>'Parametro de comite eliminado exitosamente'
        ]);
    }
}
