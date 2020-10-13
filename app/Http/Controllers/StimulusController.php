<?php

namespace App\Http\Controllers;

use App\Stimulus;
use App\Committee;
use Illuminate\Http\Request;
use App\Http\Requests\StimulusRequest;
use Illuminate\Auth\Access\AuthorizationException;

class StimulusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Committee $committee)
    {
        try {
            $this->authorize('viewAny', [Stimulus::class]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        return Stimulus::with('learner', 'committee')->where('committee_id', $committee->id)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StimulusRequest $request)
    {
        try {
            $this->authorize('create', [Stimulus::class]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        Stimulus::create([
            'learner_id' => $request->get('learner_id'),
            'committee_id' => $request->get('committee_id'),
            'stimulus' => $request->get('stimulus'),
            'justification' => $request->get('justification'),
        ]);
        return response()->json([
            'success'=>true,
            'status'=>200,
            'message'=>'Estimulo agregado con exito'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Stimulus $stimulus)
    {
        try {
            $this->authorize('view', [Stimulus::class, $stimulus]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        $stimulus->learner->group->formationProgram;
        return $stimulus;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(StimulusRequest $request, Stimulus $stimulus)
    {
        try {
            $this->authorize('update', [Stimulus::class, $stimulus]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        $stimulus->learner_id = $request->get('learner_id');
        $stimulus->stimulus = $request->get('stimulus');
        $stimulus->justification = $request->get('justification');
        $stimulus->save();
        return response()->json([
            'success'=>true,
            'status'=>200,
            'message'=>'Estimulo actualizado con exito'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Stimulus $stimulus)
    {
        try {
            $this->authorize('delete', [Stimulus::class, $stimulus]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        try {
            $stimulus->delete();
            return response()->json([
                'success'=>true,
                'status'=>200,
                'message'=>'Estimulo agregado con exito'
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
