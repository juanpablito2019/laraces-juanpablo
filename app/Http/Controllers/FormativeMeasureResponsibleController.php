<?php

namespace App\Http\Controllers;

use App\FormativeMeasureResponsible;
use App\Http\Requests\FormativeMeasureResponsibleRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;

class FormativeMeasureResponsibleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return FormativeMeasureResponsible::with('position','contractType')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(FormativeMeasureResponsibleRequest $request)
    {
        $formativeMeasureResponsible = new FormativeMeasureResponsible();
        $formativeMeasureResponsible->username = $request->get('username');
        $formativeMeasureResponsible->misena_email = $request->get('misena_email');
        $formativeMeasureResponsible->institutional_email = $request->get('institutional_email');
        $formativeMeasureResponsible->document_type = $request->get('document_type');
        $formativeMeasureResponsible->document = $request->get('document');
        $formativeMeasureResponsible->birthdate = $request->get('birthdate');
        $formativeMeasureResponsible->phone = $request->get('phone');
        $formativeMeasureResponsible->phone_ip = $request->get('phone_ip');
        $formativeMeasureResponsible->gender = $request->get('gender');
        $formativeMeasureResponsible->position_id = $request->get('position_id');
        $formativeMeasureResponsible->contract_type_id = $request->get('contract_type_id');
        $formativeMeasureResponsible->type = $request->get('type');
        $formativeMeasureResponsible->state = $request->get('state');
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $ext = $file->extension();
            $fileName = intval(time()) .".$ext";
            Storage::putFileAs(
                'public/formativeMeasureResponsible-photos', $file, $fileName
            );
            $formativeMeasureResponsible->photo  = "formativeMeasureResponsible-photos/$fileName";
        }
        $formativeMeasureResponsible->save();
        return response()->json([
            'success'=>true,
            'status'=>200,
            'message'=>'Responsable agregado con exito'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(FormativeMeasureResponsible $formativeMeasureResponsible)
    {
        return $formativeMeasureResponsible;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(FormativeMeasureResponsibleRequest $request,FormativeMeasureResponsible $formativeMeasureResponsible)
    {
        $formativeMeasureResponsible->username = $request->get('username');
        $formativeMeasureResponsible->misena_email = $request->get('misena_email');
        $formativeMeasureResponsible->institutional_email = $request->get('institutional_email');
        $formativeMeasureResponsible->document_type = $request->get('document_type');
        $formativeMeasureResponsible->document = $request->get('document');
        $formativeMeasureResponsible->birthdate = $request->get('birthdate');
        $formativeMeasureResponsible->phone = $request->get('phone');
        $formativeMeasureResponsible->phone_ip = $request->get('phone_ip');
        $formativeMeasureResponsible->gender = $request->get('gender');
        $formativeMeasureResponsible->position_id = $request->get('position_id');
        $formativeMeasureResponsible->contract_type_id = $request->get('contract_type_id');
        $formativeMeasureResponsible->type = $request->get('type');
        $formativeMeasureResponsible->state = $request->get('state');
        if ($request->hasFile('photo')) {
            if($formativeMeasureResponsible->photo){
                if(File::exists(public_path("/storage/".$formativeMeasureResponsible->photo))){
                    File::delete(public_path("/storage/".$formativeMeasureResponsible->photo));
                }
            }
            $file = $request->file('photo');
            $ext = $file->extension();
            $fileName = intval(time()) .".$ext";
            Storage::putFileAs(
                'public/formativeMeasureResponsible-photos', $file, $fileName
            );
            $formativeMeasureResponsible->photo  = "formativeMeasureResponsible-photos/$fileName";
        }
        $formativeMeasureResponsible->save();

        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Responsable actualizado con exito'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(FormativeMeasureResponsible $formativeMeasureResponsible)
    {
        if($formativeMeasureResponsible->photo){
            if(File::exists(public_path("/storage/".$formativeMeasureResponsible->photo))){
                File::delete(public_path("/storage/".$formativeMeasureResponsible->photo));
            }
        }
        $formativeMeasureResponsible->delete();
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Responsable eliminado con exito'
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
        ])->get('https://cronode.herokuapp.com/api/ces/instructors');
        $data = $response->json()['instructors'];
        // for ($i=0; $i < count($data); $i++) {
        //     $FormativeMeasureResponsibles = FormativeMeasureResponsible::all();
        //     if(!$FormativeMeasureResponsibles->find($data[$i]['id'])){
        //         $elective_start_date = date_parse($data[$i]['electiveStartDate']);
        //         $elective_end_date = date_parse($data[$i]['electiveEndDate']);
        //         $practice_start_date = date_parse($data[$i]['practiceStartDate']);
        //         $practice_end_date = date_parse($data[$i]['practiceEndDate']);
        //         FormativeMeasureResponsible::create([
        //             'id'=>$data[$i]['id'],
        //             'code_tab'=>$data[$i]['codeTab'],
        //             'modality_id'=>$data[$i]['modalityId'],
        //             'formation_program_id'=>$data[$i]['formationProgramId'],
        //             'quantity_learners'=>$data[$i]['quantityLearners'],
        //             'active_learners'=>$data[$i]['activeLearners'],
        //             'elective_start_date'=>$elective_start_date['year']."-".$elective_start_date['month']."-".$elective_start_date['day'],
        //             'elective_end_date'=>$elective_end_date['year']."-".$elective_end_date['month']."-".$elective_end_date['day'],
        //             'practice_start_date'=>$practice_start_date['year']."-".$practice_start_date['month']."-".$practice_start_date['day'],
        //             'practice_end_date'=>$practice_end_date['year']."-".$practice_end_date['month']."-".$practice_end_date['day'],
        //         ]);
        //     }
        // }
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Responsables de medidas formativas actualizados',
            'FormativeMeasureResponsibles'=> $data
        ]);
    }
}
