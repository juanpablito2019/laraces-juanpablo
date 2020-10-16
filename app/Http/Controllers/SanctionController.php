<?php

namespace App\Http\Controllers;

use App\Sanction;
use Illuminate\Http\Request;
use App\Http\Requests\SanctionRequest;

class SanctionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('viewAny', [Sanction::class]);
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
        $this->authorize('create', [Sanction::class]);
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
        $this->authorize('view', [Sanction::class, $sanction]);
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
        $this->authorize('update', [Sanction::class, $sanction]);
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
        $this->authorize('delete', [Sanction::class, $sanction]);
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
                    'message'=>'No se puede eliminar el registro porque está vinculado a un proceso de comité'
                ]);
            }
        }
    }
}
