<?php

namespace App\Http\Controllers;

use App\Committee;
use App\Http\Requests\LearnerNoveltyRequest;
use App\LearnerNovelty;
use Illuminate\Http\Request;

class LearnerNoveltyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Committee $committee)
    {
        return LearnerNovelty::with('learner', 'committee', 'noveltyType')->where('committee_id', $committee->id)->get();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexAll()
    {
        return LearnerNovelty::with('learner', 'committee', 'noveltyType')->get();
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
        $learnerNovelty->delete();
        return response()->json([
            'success'=>true,
            'status'=>200,
            'message'=>'Novedad eliminada con exito'
        ]);
    }
}
