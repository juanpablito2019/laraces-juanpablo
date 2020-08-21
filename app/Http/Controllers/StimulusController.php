<?php

namespace App\Http\Controllers;

use App\Committee;
use App\Http\Requests\StimulusRequest;
use App\Stimulus;
use Illuminate\Http\Request;

class StimulusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Committee $committee)
    {
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
