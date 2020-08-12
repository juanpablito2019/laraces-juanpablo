<?php

namespace App\Http\Controllers;

use App\FormationProgramType;
use App\Http\Requests\FormationProgramTypeRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class FormationProgramTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return FormationProgramType::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(FormationProgramTypeRequest $request)
    {
        FormationProgramType::create([
            'name' => $request->get('name'),
            'elective_months'=>$request->get('elective_months'),
            'practice_months'=>$request->get('practice_months'),
        ]);
        return response()->json([
            'success'=>true,
            'status'=>201,
            'message'=>'Tipo de programa de formacion agregado exitosamente'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(FormationProgramType $formationProgramType)
    {
        return $formationProgramType;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(FormationProgramTypeRequest $request, FormationProgramType $formationProgramType)
    {
        $formationProgramType->name = $request->get('name');
        $formationProgramType->elective_months = $request->get('elective_months');
        $formationProgramType->practice_months = $request->get('practice_months');
        $formationProgramType->save();
        return response()->json([
            'success'=>true,
            'status'=>200,
            'message'=>'Tipo de programa de formacion actualizado exitosamente'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(FormationProgramType $formationProgramType)
    {
        $formationProgramType->delete();
        return response()->json([
            'success'=>true,
            'status'=>200,
            'message'=>'Tipo de programa de formacion eliminado exitosamente'
        ]);
    }

    public function mass()
    {
        $response = Http::post('https://cronode.herokuapp.com/api/authenticate', [
            'misena_email'=>"consulta@misena.edu.co",
            'password'=> "123456789110",
        ]);
        $token = $response->json()['token'];
        $response = Http::withHeaders([
            'Authorization' => 'Bearer '.$token
        ])->get('https://cronode.herokuapp.com/api/ces/formationProgramTypes');
        $data = $response->json()['formationProgramTypes'];
        for ($i=0; $i < count($data); $i++) {
            $formation_program_types = FormationProgramType::all();
            if(!$formation_program_types->find($data[$i]['id'])){
                FormationProgramType::create([
                    'id'=>$data[$i]['id'],
                    'name'=>$data[$i]['name'],
                    'elective_months'=>$data[$i]['electiveMonths'],
                    'practice_months'=>$data[$i]['practiceMonths'],
                ]);
            }
        }
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Tipos de programas de formacion actualizados'
        ]);
    }
}
