<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\InfringementClassification;
use Illuminate\Auth\Access\AuthorizationException;
use App\Http\Requests\InfringementClassificationRequest;

class InfringementClassificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $this->authorize('viewAny', [InfringementClassification::class]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        return InfringementClassification::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(InfringementClassificationRequest $request)
    {
        try {
            $this->authorize('create', [InfringementClassification::class]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        InfringementClassification::create([
            'name' => $request->get('name')
        ]);
        return response()->json([
            'status'=>201,
            'success'=>true,
            'message'=>'Clasificación de la infracción agregada exitosamente'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(InfringementClassification $infringementClassification)
    {
        try {
            $this->authorize('view', [InfringementClassification::class, $infringementClassification]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        return $infringementClassification;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(InfringementClassificationRequest $request, InfringementClassification $infringementClassification)
    {
        try {
            $this->authorize('update', [InfringementClassification::class, $infringementClassification]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        $infringementClassification->name = $request->get('name');
        $infringementClassification->save();
        return response()->json([
            'status' => 200,
            'success'=>true,
            'message'=>'Clasificación de la infracción actualizada exitosamente'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(InfringementClassification $infringementClassification)
    {
        try {
            $this->authorize('delete', [InfringementClassification::class, $infringementClassification]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        $infringementClassification->delete();
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Clasificación de la infracción eliminada exitosamente'
        ]);
    }
}
