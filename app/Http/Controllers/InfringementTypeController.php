<?php

namespace App\Http\Controllers;

use App\InfringementType;
use Illuminate\Http\Request;
use App\Http\Requests\InfringementTypeResquest;
use Illuminate\Auth\Access\AuthorizationException;

class InfringementTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $this->authorize('viewAny', [InfringementType::class]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }
        
        return InfringementType::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(InfringementTypeResquest $request)
    {
        try {
            $this->authorize('create', [InfringementType::class]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        InfringementType::create([
            'name' => $request->get('name')
        ]);
        return response()->json([
            'status'=>201,
            'success'=>true,
            'message'=>'Tipo de infracción agregada exitosamente'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(InfringementType $infringementType)
    {
        try {
            $this->authorize('view', [InfringementType::class, $infringementType]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        return $infringementType;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(InfringementTypeResquest $request, InfringementType $infringementType)
    {
        try {
            $this->authorize('update', [InfringementType::class, $infringementType]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        $infringementType->name = $request->get('name');
        $infringementType->save();
        return response()->json([
            'status' => 200,
            'success'=>true,
            'message'=>'Tipo de infracción actualizada exitosamente'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(InfringementType $infringementType)
    {
        try {
            $this->authorize('delete', [InfringementType::class, $infringementType]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        $infringementType->delete();
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Tipo de infracción eliminada exitosamente'
        ]);
    }
}
