<?php

namespace App\Http\Controllers;

use App\NoveltyType;
use Illuminate\Http\Request;
use App\Http\Requests\NoveltyTypeRequest;

class NoveltyTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('viewAny', [NoveltyType::class]);

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
        $this->authorize('create', [NoveltyType::class]);

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
        $this->authorize('view', [NoveltyType::class, $noveltyType]);
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
        $this->authorize('update', [NoveltyType::class, $noveltyType]);
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
        $this->authorize('delete', [NoveltyType::class, $noveltyType]);
        try {
            $noveltyType->delete();
            return response()->json([
                'status'=>200,
                'success'=>true,
                'message'=>'Tipo de novedad del aprendiz eliminada exitosamente'
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
