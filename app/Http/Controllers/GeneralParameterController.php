<?php

namespace App\Http\Controllers;

use App\GeneralParameter;
use Illuminate\Http\Request;
use App\Http\Requests\GeneralParameterRequest;

class GeneralParameterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('viewAny', [GeneralParameter::class]);
        return GeneralParameter::all();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\GeneralParameter  $generalParameter
     * @return \Illuminate\Http\Response
     */
    public function show(GeneralParameter $generalParameter)
    {
        $this->authorize('view', [GeneralParameter::class, $generalParameter]);
        return $generalParameter;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\GeneralParameter  $generalParameter
     * @return \Illuminate\Http\Response
     */
    public function update(GeneralParameterRequest $request, GeneralParameter $generalParameter)
    {
        $this->authorize('update', [GeneralParameter::class, $generalParameter]);
        $generalParameter->name = $request->get('name');
        $generalParameter->content = $request->get('content');
        $generalParameter->save();
        return response()->json([
            'success'=>true,
            'status'=>200,
            'message'=>'Parametro general actualizado exitosamente'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\GeneralParameter  $generalParameter
     * @return \Illuminate\Http\Response
     */
    public function destroy(GeneralParameter $generalParameter)
    {
        //
    }
}
