<?php

namespace App\Http\Controllers;

use App\FormativeMeasure;
use Illuminate\Http\Request;
use App\Http\Requests\FormativeMeasureRequest;
use Illuminate\Auth\Access\AuthorizationException;

class FormativeMeasureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $this->authorize('viewAny', [FormativeMeasure::class]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        return FormativeMeasure::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(FormativeMeasureRequest $request)
    {
        try {
            $this->authorize('create', [FormativeMeasure::class]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        FormativeMeasure::create([
            'name' => $request->get('name')
        ]);
        return response()->json([
            'status'=>201,
            'success'=>true,
            'message' => 'Medida formativa agregada exitosamente'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(FormativeMeasure $formativeMeasure)
    {
        try {
            $this->authorize('view', [FormativeMeasure::class, $formativeMeasure]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        return $formativeMeasure;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(FormativeMeasureRequest $request, FormativeMeasure $formativeMeasure)
    {
        try {
            $this->authorize('update', [FormativeMeasure::class, $formativeMeasure]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        $formativeMeasure->name = $request->get('name');
        $formativeMeasure->save();
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Medida formativa actualizada exitosamente'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(FormativeMeasure $formativeMeasure)
    {
        try {
            $this->authorize('delete', [FormativeMeasure::class, $formativeMeasure]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        try {
            $formativeMeasure->delete();
            return response()->json([
                'status'=>200,
                'success'=>true,
                'message'=>'Medida formativa eliminada exitosamente'
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
