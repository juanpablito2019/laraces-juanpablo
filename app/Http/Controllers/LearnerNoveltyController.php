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
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
