<?php

namespace App\Http\Controllers;

use App\Sanction;
use Illuminate\Http\Request;
use App\Http\Requests\SanctionRequest;
use Illuminate\Auth\Access\AuthorizationException;

class SanctionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $this->authorize('viewAny', [Sanction::class]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }
        
        return Sanction::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SanctionRequest $request)
    {
        try {
            $this->authorize('create', [Sanction::class]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        Sanction::create([
            'name' => $request->get('name')
        ]);
        return response()->json([
            'status'=>201,
            'success'=>true,
            'message' => 'Sancion agregada exitosamente'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Sanction $sanction)
    {
        try {
            $this->authorize('view', [Sanction::class, $sanction]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        return $sanction;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(SanctionRequest $request, Sanction $sanction)
    {
        try {
            $this->authorize('update', [Sanction::class, $sanction]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        $sanction->name = $request->get('name');
        $sanction->save();
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Sancion actualizada exitosamente'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sanction $sanction)
    {
        try {
            $this->authorize('delete', [Sanction::class, $sanction]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        try {
            $sanction->delete();
            return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Sancion eliminada exitosamente'
            ]);
        } catch (\Throwable $th) {
            $error = $th->errorInfo;
            if($error[1] == "1451"){
                return response()->json([
                    'status'=>500,
                    'success'=>false,
                    'message'=>'No se puede eliminar porque está relacionado con otro registro'
                ]);
            }
        }
    }
}
