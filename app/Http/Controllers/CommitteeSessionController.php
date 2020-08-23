<?php

namespace App\Http\Controllers;

use App\CommitteeSession;
use App\Http\Requests\CommitteeSessionRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommitteeSessionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CommitteeSession::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CommitteeSessionRequest $request)
    {
        $learners = $request->get('learners');
        for ($i=0; $i < count($learners); $i++) {
            CommitteeSession::create([
                'committee_id'=>$request->get('committee_id'),
                'infringement_type_id'=>$request->get('infringement_type_id'),
                'learner_id'=>$learners[$i]
            ]);
        }
        return response()->json([
            'status'=>201,
            'success'=>true,
            'message'=>'Casos academicos agregados exitosamente'
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
        return CommitteeSession::with('learner.group.formationProgram', 'infringementType')->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CommitteeSessionRequest $request, CommitteeSession $committeeSession)
    {
        $committeeSession->infringement_type_id = $request->get('infringement_type_id');
        $committeeSession->learner_id = $request->get('learners')[0];
        $committeeSession->save();
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Caso academico actualizado con exito'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(CommitteeSession $committeeSession)
    {
        $committeeSession->delete();
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Caso eliminado con exito'
        ]);
    }
}
