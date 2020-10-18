<?php

namespace App\Http\Controllers;

use App\ActTemplate;
use Illuminate\Http\Request;
use App\CommitteeSessionState;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\ActTemplateRequest;

class ActTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return ActTemplate[]|\Illuminate\Database\Eloquent\Collection
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function index()
    {
        $this->authorize('viewAny', [ActTemplate::class]);
        return ActTemplate::all();
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(ActTemplateRequest $request)
    {
        $this->authorize('create', [ActTemplate::class]);

        $act_template = ActTemplate::where([
            ['act_type','=', $request->get('act_type')],
            ['version','=', $request->get('version')],
        ])->first();
        if($act_template){
            return response()->json([
                'status'=>422,
                'sucesss'=>false,
                'message'=>'Ya existe una plantilla con este tipo y esta version'
            ]);
        }
        $act_template = ActTemplate::where([
            ['act_type','=',$request->get('act_type')],
            ['is_active','=',1]
        ])->first();
        if($act_template){
            return response()->json([
                'status'=>422,
                'sucesss'=>false,
                'message'=>'Ya existe una plantilla con este tipo y esta activa',
            ]);
        }
        $path = '';
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $ext = $file->extension();
            $fileName = intval(time()) .".$ext";
            Storage::putFileAs(
                'public/act_templates', $file, $fileName
            );
            $path  = "act_templates/$fileName";
        }
        ActTemplate::create([
            'act_type'=>$request->get('act_type'),
            'version'=>$request->get('version'),
            'date'=>$request->get('date'),
            'is_active'=>$request->get('is_active'),
            'path'=>$path
        ]);

        return response()->json([
            'status'=>201,
            'success'=>true,
            'message'=>'Plantilla de acta guardada con exito'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ActTemplate  $actTemplate
     * @return ActTemplate
     */
    public function show(ActTemplate $actTemplate)
    {
        $this->authorize('view', [ActTemplate::class, $actTemplate]);
        return $actTemplate;
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ActTemplate  $actTemplate
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(ActTemplateRequest $request, ActTemplate $actTemplate)
    {
        $this->authorize('update', [ActTemplate::class, $actTemplate]);
        $act_template = ActTemplate::where([
            ['act_type','=', $request->get('act_type')],
            ['version','=', $request->get('version')],
        ])->first();
        if($act_template && $act_template->id != $actTemplate->id){
            return response()->json([
                'status'=>422,
                'sucesss'=>false,
                'message'=>'Ya existe una plantilla con este tipo y esta version',
            ]);
        }
        $act_template = ActTemplate::where([
            ['act_type','=',$request->get('act_type')],
            ['is_active','=',1]
        ])->first();
        if($act_template && $act_template->id != $actTemplate->id){
            return response()->json([
                'status'=>422,
                'sucesss'=>false,
                'message'=>'Ya existe una plantilla con este tipo y esta activa',
            ]);
        }
        $actTemplate->act_type = $request->get('act_type');
        $actTemplate->version = $request->get('version');
        $actTemplate->date = $request->get('date');
        if ($request->hasFile('file')) {
            if($actTemplate->path){
                if(File::exists(public_path("/storage/".$actTemplate->path))){
                    File::delete(public_path("/storage/".$actTemplate->path));
                }
            }
            $file = $request->file('file');
            $ext = $file->extension();
            $fileName = intval(time()) .".$ext";
            Storage::putFileAs(
                'public/act_templates', $file, $fileName
            );
            $actTemplate->path  = "act_templates/$fileName";
        }
        $actTemplate->is_active = $request->get('is_active');
        $actTemplate->save();
        return response()->json([
            'success'=>true,
            'status'=>200,
            'message'=>'Plantilla de acta actualizada con exito'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ActTemplate  $actTemplate
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(ActTemplate $actTemplate)
    {
        $this->authorize('delete', [ActTemplate::class, $actTemplate]);

        if($actTemplate->path){
            if(File::exists(public_path("/storage/".$actTemplate->path))){
                File::delete(public_path("/storage/".$actTemplate->path));
            }
        }

        try {
            $actTemplate->delete();
            return response()->json([
                'success'=>true,
                'status'=>200,
                'message'=>'Plantilla de acta eliminada con exito'
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

    public function findActive()
    {
        return ActTemplate::where('is_active', 1)->get();
    }

    public function findByType($act_type)
    {
        $act = ActTemplate::with('parameters.committeeSessions')->where([
            ['is_active', '=', 1],
            ['act_type', '=', $act_type]
        ])->first();
        if($act){
            return $act;
        }else{
            abort(404);
        }
    }
}
