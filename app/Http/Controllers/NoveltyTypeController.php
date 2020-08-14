<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoveltyTypeRequest;
use App\NoveltyType;
use Illuminate\Http\Request;

class NoveltyTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return NoveltyType::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NoveltyTypeRequest $request)
    {
        NoveltyType::create([
            'name' => $request->get('name')
        ]);
        return response()->json([
            'status'=>201,
            'success'=>true,
            'message'=>'Tipo de novedad del aprendiz agregada exitosamente'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(NoveltyType $noveltyType)
    {
        return $noveltyType;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(NoveltyTypeRequest $request, NoveltyType $noveltyType)
    {
        $noveltyType->name = $request->get('name');
        $noveltyType->save();
        return response()->json([
            'status' => 200,
            'success'=>true,
            'message'=>'Tipo de novedad del aprendiz actualizada exitosamente'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(NoveltyType $noveltyType)
    {
        $noveltyType->delete();
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Tipo de novedad del aprendiz eliminada exitosamente'
        ]);
    }
}
