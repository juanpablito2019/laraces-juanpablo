<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\FormationProgramType;
use Illuminate\Support\Facades\Http;
use App\Http\Requests\FormationProgramTypeRequest;

class FormationProgramTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('viewAny', [FormationProgramType::class]);
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
        $this->authorize('create', [FormationProgramType::class]);
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
        $this->authorize('view', [FormationProgramType::class, $formationProgramType]);
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
        $this->authorize('update', [FormationProgramType::class, $formationProgramType]);

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
        $this->authorize('delete', [FormationProgramType::class, $formationProgramType]);

        try {
            $formationProgramType->delete();
            return response()->json([
                'success'=>true,
                'status'=>200,
                'message'=>'Tipo de programa de formacion eliminado exitosamente'
            ]);
        } catch (\Throwable $th) {
            $error = $th->errorInfo;
            if($error[1] == "1451"){
                return response()->json([
                    'status'=>500,
                    'success'=>false,
                    'message'=>'No se puede eliminar el registro porque está vinculado a programas de formacion'
                ]);
            }
        }
    }

    public function mass()
    {
        $this->authorize('create', [FormationProgramType::class]);
        
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
