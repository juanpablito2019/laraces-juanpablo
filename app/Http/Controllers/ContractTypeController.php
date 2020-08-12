<?php

namespace App\Http\Controllers;

use App\ContractType;
use App\Http\Requests\ContractTypeStoreRequest;
use App\Http\Requests\ContractTypeUpdateRequest;
use Illuminate\Http\Request;


class ContractTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ContractType::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ContractTypeStoreRequest $request)
    {
        ContractType::create([
            'name' => $request->get('name')
        ]);
        return response()->json([
            'status'=>201,
            'success'=>true,
            'message' => 'Cargo guardado exitosamente'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(ContractType $contractType)
    {
        return $contractType;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ContractTypeUpdateRequest $request, ContractType $contractType)
    {
        $contractType->name = $request->get('name');
        $contractType->save();
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Cargo actualizado exitosamente'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ContractType $contractType)
    {
        $contractType->delete();
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Cargo eliminado exitosamente'
        ]);
    }

    public function mass()
    {

    }
}
