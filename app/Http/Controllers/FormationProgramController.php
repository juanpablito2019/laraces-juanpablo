<?php

namespace App\Http\Controllers;

use App\FormationProgram;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Requests\FormationProgramRequest;

class FormationProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('viewAny', [FormationProgram::class]);
        return FormationProgram::with('formationProgramType')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(FormationProgramRequest $request)
    {
        $this->authorize('create', [FormationProgram::class]);

        FormationProgram::create([
            'code' => $request->get('code'),
            'name' => $request->get('name'),
            'formation_program_type_id' => $request->get('formation_program_type_id')
        ]);
        return response()->json([
            'success'=>true,
            'status'=>201,
            'message'=>'Programa de formacion agregado exitosamente'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(FormationProgram $formationProgram)
    {
        $this->authorize('view', [FormationProgram::class, $formationProgram]);
        return $formationProgram;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(FormationProgramRequest $request, FormationProgram $formationProgram)
    {
        $this->authorize('update', [FormationProgram::class, $formationProgram]);

        $formationProgram->code = $request->get('code');
        $formationProgram->name = $request->get('name');
        $formationProgram->formation_program_type_id = $request->get('formation_program_type_id');
        $formationProgram->save();
        return response()->json([
            'success'=>true,
            'status'=>200,
            'message'=>'Programa de formacion actualizado exitosamente'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(FormationProgram $formationProgram)
    {
        $this->authorize('delete', [FormationProgram::class, $formationProgram]);

        try {
            $formationProgram->delete();
            return response()->json([
                'success'=>true,
                'status'=>200,
                'message'=>'Programa de formacion eliminado exitosamente'
            ]);
        } catch (\Throwable $th) {
            $error = $th->errorInfo;
            if($error[1] == "1451"){
                return response()->json([
                    'status'=>500,
                    'success'=>false,
                    'message'=>'No se puede eliminar el registro porque está vinculado a grupos'
                ]);
            }
        }
    }

    public function mass()
    {
        $this->authorize('create', [FormationProgram::class]);
        
        try {
            $response = Http::post('https://cronode.herokuapp.com/api/authenticate', [
                'misena_email'=>"consulta@misena.edu.co",
                'password'=> "123456789110",
            ]);
            $token = $response->json()['token'];
            $response = Http::withHeaders([
                'Authorization' => 'Bearer '.$token
            ])->get('https://cronode.herokuapp.com/api/ces/formationPrograms');
            $data = $response->json()['formationPrograms'];
            for ($i=0; $i < count($data); $i++) {
                $formation_program_types = FormationProgram::all();
                if(!$formation_program_types->find($data[$i]['id'])){
                    FormationProgram::create([
                        'id'=>$data[$i]['id'],
                        'name'=>$data[$i]['name'],
                        'code'=>$data[$i]['code'],
                        'formation_program_type_id'=>$data[$i]['formationTypeId'],
                    ]);
                }
            }
            return response()->json([
                'status'=>200,
                'success'=>true,
                'message'=>'Programas de formacion actualizados'
            ]);
        } catch (\Throwable $th) {
            $error = $th->errorInfo;
            if($error[1] == "1452"){
                return response()->json([
                    'status'=>500,
                    'success'=>false,
                    'message'=>'Actualizar tipo de programa formacion'
                ]);
            }
        }
    }
}
