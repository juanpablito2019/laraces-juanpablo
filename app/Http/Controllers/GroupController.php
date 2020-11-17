<?php

namespace App\Http\Controllers;

use App\Group;
use App\Http\Requests\GroupRequest;
use Illuminate\Support\Facades\Http;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('viewAny', [Group::class]);
        return Group::with('modality', 'formationProgram', 'formationProgram.formationProgramType')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(GroupRequest $request)
    {
        $this->authorize('create', [Group::class]);
        
        Group::create([
            'code_tab' => $request->get('code_tab'),
            'modality_id' => $request->get('modality_id'),
            'formation_program_id' => $request->get('formation_program_id'),
            'quantity_learners' => $request->get('quantity_learners'),
            'active_learners' => $request->get('active_learners'),
            'elective_start_date' => $request->get('elective_start_date'),
            'elective_end_date' => $request->get('elective_end_date'),
            'practice_start_date' => $request->get('practice_start_date'),
            'practice_end_date' => $request->get('practice_end_date'),
        ]);
        return response()->json([
            'status' => 201,
            'success' => true,
            'message' => 'Grupo agregado con exito'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Group $group)
    {
        $this->authorize('view', [Group::class, $group]);
        $group->modality;
        $group->formationProgram->formationProgramType;
        $group->learners;
        return $group;
    }

    public function getByFormationProgram($id)
    {
        return Group::where('formation_program_id', $id)->get();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(GroupRequest $request, Group $group)
    {
        $this->authorize('update', [Group::class, $group]);

        $group->code_tab = $request->get('code_tab');
        $group->modality_id = $request->get('modality_id');
        $group->formation_program_id = $request->get('formation_program_id');
        $group->quantity_learners = $request->get('quantity_learners');
        $group->active_learners = $request->get('active_learners');
        $group->elective_start_date = $request->get('elective_start_date');
        $group->elective_end_date = $request->get('elective_end_date');
        $group->practice_start_date = $request->get('practice_start_date');
        $group->practice_end_date = $request->get('practice_end_date');
        $group->save();

        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Grupo actualizado con exito'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Group $group)
    {
        $this->authorize('delete', [Group::class, $group]);
        try {
            $group->delete();
            return response()->json([
                'status' => 200,
                'success' => true,
                'message' => 'Grupo eliminado con exito'
            ]);
        } catch (\Throwable $th) {
            $error = $th->errorInfo;
            if($error[1] == "1451"){
                return response()->json([
                    'status'=>500,
                    'success'=>false,
                    'message'=>'No se puede eliminar el registro porque está vinculado a un proceso de comité'
                ]);
            }
        }
    }

    public function mass()
    {
        $this->authorize('create', [Group::class]);

        try {
            $response = Http::post('https://cronode.herokuapp.com/api/authenticate', [
                'misena_email'=>"consulta@misena.edu.co",
                'password'=> "123456789110",
            ]);
            $token = $response->json()['token'];
            $response = Http::withHeaders([
                'Authorization' => 'Bearer '.$token
            ])->get('https://cronode.herokuapp.com/api/ces/groups');
            $data = $response->json()['groups'];
            for ($i=0; $i < count($data); $i++) {
                $groups = Group::all();
                if(!$groups->find($data[$i]['id'])){
                    $elective_start_date = date_parse($data[$i]['electiveStartDate']);
                    $elective_end_date = date_parse($data[$i]['electiveEndDate']);
                    $practice_start_date = date_parse($data[$i]['practiceStartDate']);
                    $practice_end_date = date_parse($data[$i]['practiceEndDate']);
                    Group::create([
                        'id'=>$data[$i]['id'],
                        'code_tab'=>$data[$i]['codeTab'],
                        'modality_id'=>$data[$i]['modalityId'],
                        'formation_program_id'=>$data[$i]['formationProgramId'],
                        'quantity_learners'=>$data[$i]['quantityLearners'],
                        'active_learners'=>$data[$i]['activeLearners'],
                        'elective_start_date'=>$elective_start_date['year']."-".$elective_start_date['month']."-".$elective_start_date['day'],
                        'elective_end_date'=>$elective_end_date['year']."-".$elective_end_date['month']."-".$elective_end_date['day'],
                        'practice_start_date'=>$practice_start_date['year']."-".$practice_start_date['month']."-".$practice_start_date['day'],
                        'practice_end_date'=>$practice_end_date['year']."-".$practice_end_date['month']."-".$practice_end_date['day'],
                    ]);
                }
            }
            return response()->json([
                'status'=>200,
                'success'=>true,
                'message'=>'Grupos actualizados'
            ]);
        } catch (\Throwable $th) {
            $error = $th->errorInfo;
            if($error[1] == "1452"){
                return response()->json([
                    'status'=>500,
                    'success'=>false,
                    'message'=>'Actualizar modalidades(Parametros Generales) y/o programa formacion(Parametros Generales) correspondientes'
                ]);
            }
        }
    }
}
