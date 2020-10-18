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
        $this->authorize('viewAny', [CommitteeParameter::class]);
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
        $this->authorize('create', [CommitteeParameter::class]);
        CommitteeParameter::create([
            'name' => $request->get('name'),
            'content' => $request->get('content'),
            'act_template_id' => $request->get('act_template_id'),
            'slug'=>$request->get('slug')
        ]);
        return response()->json([
            'success'=>true,
            'status'=>201,
            'message'=>'Parámetro de comite agregado exitosamente'
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
        $this->authorize('view', [CommitteeParameter::class, $committeeParameter]);
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
        $this->authorize('update', [CommitteeParameter::class, $committeeParameter]);

        $committeeParameter->name = $request->get('name');
        $committeeParameter->content = $request->get('content');
        $committeeParameter->slug = $request->get('slug');
        $committeeParameter->act_template_id = $request->get('act_template_id');
        $committeeParameter->save();
        return response()->json([
            'success'=>true,
            'status'=>200,
            'message'=>'Parámetro de comite actualizado exitosamente'
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
        $this->authorize('delete', [CommitteeParameter::class, $committeeParameter]);

        try {
            $committeeParameter->delete();
            return response()->json([
                'success'=>true,
                'status'=>200,
                'message'=>'Parámetro de comite eliminado exitosamente'
            ]);
        } catch (\Throwable $th) {
            $error = $th->errorInfo;
            if($error[1] == "1451"){
                return response()->json([
                    'status'=>500,
                    'success'=>false,
                    'message'=>'No se puede eliminar el registro porque está vinculado a un proceso de comité'
                ]);
            }
        }  
    }
}
