<?php

namespace App\Http\Controllers;

use App\Modality;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Requests\ModalityRequest;
use Illuminate\Auth\Access\AuthorizationException;

class ModalityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $this->authorize('viewAny', [Modality::class]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        return Modality::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ModalityRequest $request)
    {
        try {
            $this->authorize('create', [Modality::class]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        Modality::create([
            'name' => $request->get('name')
        ]);
        return response()->json([
            'status'=>201,
            'success'=>true,
            'message'=>'Modalidad agregada con exito'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Modality $modality)
    {
        try {
            $this->authorize('view', [Modality::class, $modality]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        return $modality;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ModalityRequest $request, Modality $modality)
    {
        try {
            $this->authorize('update', [Modality::class, $modality]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        // dd($request->all());
        $modality->name = $request->get('name');
        $modality->save();
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Modalidad actualizada con exito'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Modality $modality)
    {
        try {
            $this->authorize('delete', [Modality::class, $modality]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        try {
            $modality->delete();
            return response()->json([
            'success'=>true,
            'status'=>200,
            'message'=>'Modalidad eliminada con exito'
            ]);
        } catch (\Throwable $th) {
            $error = $th->errorInfo;
            if($error[1] == "1451"){
                return response()->json([
                    'status'=>500,
                    'success'=>false,
                    'message'=>'No se puede eliminar porque está relacionado con otro registro'
                ]);
            }
        }
    }

    public function mass()
    {
        try {
            $this->authorize('create', [Modality::class]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }
        
        $response = Http::post('https://cronode.herokuapp.com/api/authenticate', [
            'misena_email'=>"consulta@misena.edu.co",
            'password'=> "123456789110",
        ]);
        $token = $response->json()['token'];
        $response = Http::withHeaders([
            'Authorization' => 'Bearer '.$token
        ])->get('https://cronode.herokuapp.com/api/ces/modalities');
        $data = $response->json()['modalities'];
        for ($i=0; $i < count($data); $i++) {
            $modalities = Modality::all();
            if(!$modalities->find($data[$i]['id'])){
                Modality::create([
                    'id'=>$data[$i]['id'],
                    'name'=>$data[$i]['name']
                ]);
            }
        }
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Modalidades actualizadas'
        ]);
    }
}
