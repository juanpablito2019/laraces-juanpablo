<?php

namespace App\Http\Controllers;

use App\Learner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Http\Requests\LearnerRequest;
use Illuminate\Support\Facades\Storage;

class LearnerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', [Learner::class]);
        return Learner::with('group.modality', 'group.formationProgram.formationProgramType')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(LearnerRequest $request)
    {
        $this->authorize('create', [Learner::class]);

        $learner = new Learner();
        $learner->name = $request->get('name');
        $learner->document_type = $request->get('document_type');
        $learner->document = $request->get('document');
        $learner->email = $request->get('email');
        $learner->birthdate = $request->get('birthdate');
        $learner->phone = $request->get('phone');
        $learner->group_id = $request->get('group_id');
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $ext = $file->extension();
            $fileName = intval(time()) .".$ext";
            Storage::putFileAs(
                'public/learner-photos', $file, $fileName
            );
            $learner->photo  = "learner-photos/$fileName";
        }
        $learner->save();
        return response()->json([
            'success'=>true,
            'status'=>200,
            'message'=>'Aprendiz agregado con exito'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Learner $learner)
    {
        $this->authorize('view', [Learner::class, $learner]);
        $learner->load(['group.formationProgram', 'stimuli','novelties.noveltyType', 'academics']);
        return $learner;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(LearnerRequest $request, Learner $learner)
    {
        $this->authorize('update', [Learner::class, $learner]);

        $learner->name = $request->get('name');
        $learner->document_type = $request->get('document_type');
        $learner->document = $request->get('document');
        $learner->email = $request->get('email');
        $learner->birthdate = $request->get('birthdate');
        $learner->phone = $request->get('phone');
        $learner->group_id = $request->get('group_id');
        if ($request->hasFile('photo')) {
            if($learner->photo){
                if(File::exists(public_path("/storage/".$learner->photo))){
                    File::delete(public_path("/storage/".$learner->photo));
                }
            }
            $file = $request->file('photo');
            $ext = $file->extension();
            $fileName = intval(time()) .".$ext";
            Storage::putFileAs(
                'public/learner-photos', $file, $fileName
            );
            $learner->photo  = "learner-photos/$fileName";
        }
        $learner->save();

        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Aprendiz actualizado con exito'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Learner $learner)
    {
        $this->authorize('delete', [Learner::class, $learner]);

        try {
            if($learner->photo){
                if(File::exists(public_path("/storage/".$learner->photo))){
                    File::delete(public_path("/storage/".$learner->photo));
                }
            }
            $learner->delete();
            return response()->json([
                'status'=>200,
                'success'=>true,
                'message'=>'Aprendiz eliminado con exito'
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

    public function import(Request $request)
    {
        $this->authorize('create', [Learner::class]);
        
        $group_id = $request->get('group_id');
        $file = $request->file('csv');
        $readCsv = array_map('str_getcsv', file($file));
        $data = [];
        for ($i=3; $i<count($readCsv) ; $i++) { 
            for ($j=0; $j < count($readCsv[$i]); $j++) { 
                array_push($data, explode(';', $readCsv[$i][$j]));
            }
        }
        foreach ($data as $d) {
            $learners = Learner::all();
            if(!$learners->where('document', '=', $d[1])->first()){
                Learner::create([
                    'document_type'=>$d[0],
                    'document'=>$d[1],
                    'name'=>"$d[2] $d[3]",
                    'phone'=>$d[4]!=''?$d[4]:null,
                    'email'=>$d[5],
                    'status'=>$d[6],
                    'group_id'=>$group_id
                ]);
            }
        }

        return response()->json([
            'success'=>true,
            'status'=>200,
            'message'=>'Aprendices importados con exito'
        ]);
    }
}
