<?php

namespace App\Http\Controllers;

use App\Stimulus;
use App\Committee;
use Illuminate\Http\Request;
use App\Http\Requests\StimulusRequest;

class StimulusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Committee $committee)
    {
        $this->authorize('viewAny', [Stimulus::class]);
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
        $this->authorize('create', [Stimulus::class]);

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
        $this->authorize('view', [Stimulus::class, $stimulus]);
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
        $this->authorize('update', [Stimulus::class, $stimulus]);
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
        $this->authorize('delete', [Stimulus::class, $stimulus]);

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
