<?php

namespace App\Http\Controllers;

use App\Http\Requests\PositionStoreRequest;
use App\Http\Requests\PositionUpdateRequest;
use App\Position;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Position::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PositionStoreRequest $request)
    {
        Position::create([
            'name' => $request->get('name'),
            'type' => $request->get('type'),
        ]);
        return response()->json([
            'status'=>201,
            'success'=>true,
            'message' => 'Cargo agregado exitosamente'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Position $position)
    {
        return $position;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(PositionUpdateRequest $request, Position $position)
    {
        $position->name = $request->get('name');
        $position->type = $request->get('type');
        $position->save();
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
    public function destroy(Position $position)
    {
        $position->delete();
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Cargo eliminado exitosamente'
        ]);
    }
}
