<?php

namespace App\Http\Controllers;

use App\NoveltyType;
use Illuminate\Http\Request;
use App\Http\Requests\NoveltyTypeRequest;
use Illuminate\Auth\Access\AuthorizationException;

class NoveltyTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $this->authorize('viewAny', [NoveltyType::class]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

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
        try {
            $this->authorize('create', [NoveltyType::class]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

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
        try {
            $this->authorize('view', [NoveltyType::class, $noveltyType]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

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
        try {
            $this->authorize('update', [NoveltyType::class, $noveltyType]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

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
        try {
            $this->authorize('delete', [NoveltyType::class, $noveltyType]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

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
                    'message'=>'No se puede eliminar'
                ]);
            }
        }
    }
}
