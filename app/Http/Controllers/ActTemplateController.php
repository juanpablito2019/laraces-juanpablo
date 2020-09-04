<?php

namespace App\Http\Controllers;

use App\ActTemplate;
use App\Http\Requests\ActTemplateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class ActTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ActTemplate::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ActTemplateRequest $request)
    {
        $act_template = ActTemplate::where([
            ['name','=', $request->get('name')],
            ['version','=', $request->get('version')],
        ])->first();
        if($act_template){
            return response()->json([
                'status'=>422,
                'sucesss'=>false,
                'message'=>'Ya existe una plantilla con este nombre y esta version'
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
            'name'=>$request->get('name'),
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
     * @return \Illuminate\Http\Response
     */
    public function show(ActTemplate $actTemplate)
    {
        return $actTemplate;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ActTemplate  $actTemplate
     * @return \Illuminate\Http\Response
     */
    public function edit(ActTemplate $actTemplate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ActTemplate  $actTemplate
     * @return \Illuminate\Http\Response
     */
    public function update(ActTemplateRequest $request, ActTemplate $actTemplate)
    {
        $act_template = ActTemplate::where([
            ['name','=', $request->get('name')],
            ['version','=', $request->get('version')],
        ])->first();
        if($act_template && $act_template->id != $actTemplate->id){
            return response()->json([
                'status'=>422,
                'sucesss'=>false,
                'message'=>'Ya existe una plantilla con este nombre y esta version',
            ]);
        }
        $actTemplate->name = $request->get('name');
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
                'public/learner-photos', $file, $fileName
            );
            $actTemplate->path  = "learner-photos/$fileName";
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
     * @return \Illuminate\Http\Response
     */
    public function destroy(ActTemplate $actTemplate)
    {
        if($actTemplate->path){
            if(File::exists(public_path("/storage/".$actTemplate->path))){
                File::delete(public_path("/storage/".$actTemplate->path));
            }
        }
        $actTemplate->delete();
        return response()->json([
            'success'=>true,
            'status'=>200,
            'message'=>'Plantilla de acta eliminada con exito'
        ]);
    }

    public function findActive()
    {
        return ActTemplate::where('is_active', 1)->get();
    }
}
