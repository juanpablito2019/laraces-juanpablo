<?php

namespace App\Http\Controllers;

use App\ContractType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Requests\ContractTypeRequest;


class ContractTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('viewAny', [ContractType::class]);
        return ContractType::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ContractTypeRequest $request)
    {
        $this->authorize('create', [ContractType::class]);

        ContractType::create([
            'name' => $request->get('name')
        ]);
        return response()->json([
            'status'=>201,
            'success'=>true,
            'message' => 'Tipo de contrato guardado exitosamente'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(ContractType $contractType)
    {
        $this->authorize('view', [ContractType::class, $contractType]);
        return $contractType;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ContractTypeRequest $request, ContractType $contractType)
    {
        $this->authorize('update', [ContractType::class, $contractType]);

        $contractType->name = $request->get('name');
        $contractType->save();
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Tipo de contrato actualizado exitosamente'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ContractType $contractType)
    {
        $this->authorize('delete', [ContractType::class, $contractType]);

        try {
            $contractType->delete();
            return response()->json([
                'status'=>200,
                'success'=>true,
                'message'=>'Tipo de contrato eliminado exitosamente'
            ]);
        } catch (\Throwable $th) {
            $error = $th->errorInfo;
            if($error[1] == "1451"){
                return response()->json([
                    'status'=>500,
                    'success'=>false,
                    'message'=>'No se puede eliminar el registro porque está vinculado a responsables de medida formativa'
                ]);
            }
        }
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
        ])->get('https://cronode.herokuapp.com/api/ces/contractTypes');
        $data = $response->json()['contractTypes'];
        for ($i=0; $i < count($data); $i++) {
            $ContractTypes = ContractType::all();
            if(!$ContractTypes->find($data[$i]['id'])){
                ContractType::create([
                    'id'=>$data[$i]['id'],
                    'name'=>$data[$i]['name'],
                ]);
            }
        }
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Tipos de contratos actualizados'
        ]);
    }
}
