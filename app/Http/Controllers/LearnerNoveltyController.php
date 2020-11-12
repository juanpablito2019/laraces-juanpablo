<?php

namespace App\Http\Controllers;

use App\Committee;
use App\LearnerNovelty;
use Illuminate\Http\Request;
use App\Http\Requests\LearnerNoveltyRequest;
use App\Exports\LearnerNoveltyExport;

class LearnerNoveltyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Committee $committee)
    {
        $this->authorize('viewAny', [LearnerNovelty::class]);
        return LearnerNovelty::with('learner', 'committee', 'noveltyType')->where('committee_id', $committee->id)->get();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexAll()
    {
        $this->authorize('viewAny', [LearnerNovelty::class]);
        return LearnerNovelty::with('learner.group.formationProgram', 'committee', 'noveltyType')->get();
        // return LearnerNovelty::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(LearnerNoveltyRequest $request)
    {
        $this->authorize('create', [LearnerNovelty::class]);

        LearnerNovelty::create([
            'committee_id'    => $request->get('committee_id'),
            'learner_id'      => $request->get('learner_id'),
            'novelty_type_id' => $request->get('novelty_type_id'),
            'justification'   => $request->get('justification')
        ]);

        return response()->json([
            'message'=>'Novedad agregada con exito',
            'success'=>true,
            'status'=>201
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(LearnerNovelty $learnerNovelty)
    {
        $this->authorize('view', [LearnerNovelty::class, $learnerNovelty]);

        $learnerNovelty->learner->group->formationProgram;
        $learnerNovelty->noveltyType;
        return $learnerNovelty;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(LearnerNoveltyRequest $request, LearnerNovelty $learnerNovelty)
    {
        $this->authorize('update', [LearnerNovelty::class, $learnerNovelty]);
        $learnerNovelty->learner_id = $request->get('learner_id');
        $learnerNovelty->novelty_type_id = $request->get('novelty_type_id');
        $learnerNovelty->justification = $request->get('justification');
        $learnerNovelty->save();
        return response()->json([
            'success'=>true,
            'status'=>200,
            'message'=>'Novedad actualizada con exito'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(LearnerNovelty $learnerNovelty)
    {
        $this->authorize('delete', [LearnerNovelty::class, $learnerNovelty]);

        try {
            $learnerNovelty->delete();
            return response()->json([
                'success'=>true,
                'status'=>200,
                'message'=>'Novedad eliminada con exito'
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

    public function exportNovelties()
    {
        $noveltiesExport = new LearnerNoveltyExport;
        return $noveltiesExport->download('prueba.xlsx');
    }
}
