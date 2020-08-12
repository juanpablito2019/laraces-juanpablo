<?php

namespace App\Http\Controllers;

use App\Rol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RolController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $rols = Rol::all();
        if($request->wantsJson()){
            return response()->json(compact('rols'));
        }
        return view('rols.index');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'=>['required', 'string', 'min:5', 'unique:rols']
        ]);
        if($validator->fails()){
            return response()->json($validator->errors());
        }
        Rol::create([
            'name'=>$request->get('name')
        ]);
        return response()->json(['message'=>'Nuevo usuario creado']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Rol $rol)
    {
        return response()->json(compact('rol'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Rol $rol)
    {
        $validator = Validator::make($request->all(), [
            'name'=>['required', 'string', 'min:5', 'unique:rols']
        ]);
        if($validator->fails()){
            return response()->json($validator->errors());
        }
        $rol->name = $request->get('name');
        $rol->save();
        return response()->json(['message'=>'Rol actualizado']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rol $rol)
    {
        $rol->delete();
        return response()->json(['message'=>'Rol eliminado', 'status'=>200]);
    }
}
