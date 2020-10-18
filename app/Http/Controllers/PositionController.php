<?php

namespace App\Http\Controllers;

use App\Position;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Requests\PositionRequest;

class PositionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('viewAny', [Position::class]);
        return Position::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PositionRequest $request)
    {
        $this->authorize('create', [Position::class]);

        Position::create([
            'name' => $request->get('name'),
            'type' => $request->get('type'),
        ]);
        return response()->json([
            'status'=>201,
            'success'=>true,
            'message' => 'Cargo agregado exitosamente'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Position $position)
    {
        $this->authorize('view', [Position::class, $position]);
        return $position;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(PositionRequest $request, Position $position)
    {
        $this->authorize('update', [Position::class, $position]);
        $position->name = $request->get('name');
        $position->type = $request->get('type');
        $position->save();
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Cargo actualizado exitosamente'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Position $position)
    {
        $this->authorize('delete', [Position::class, $position]);
        try {
            $position->delete();
            return response()->json([
                'status'=>200,
                'success'=>true,
                'message'=>'Cargo eliminado exitosamente'
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
        $this->authorize('create', [Position::class]);
        $response = Http::post('https://cronode.herokuapp.com/api/authenticate', [
            'misena_email'=>"consulta@misena.edu.co",
            'password'=> "123456789110",
        ]);
        $token = $response->json()['token'];
        $response = Http::withHeaders([
            'Authorization' => 'Bearer '.$token
        ])->get('https://cronode.herokuapp.com/api/ces/positions');
        $data = $response->json()['positions'];
        for ($i=0; $i < count($data); $i++) {
            $Positions = Position::all();
            if(!$Positions->find($data[$i]['id'])){
                Position::create([
                    'id'=>$data[$i]['id'],
                    'name'=>$data[$i]['name'],
                    'type'=>$data[$i]['type']
                ]);
            }
        }
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Cargos actualizados'
        ]);
    }
}
