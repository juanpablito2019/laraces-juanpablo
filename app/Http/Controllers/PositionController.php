<?php

namespace App\Http\Controllers;

use App\Position;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Requests\PositionRequest;
use Illuminate\Auth\Access\AuthorizationException;

class PositionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $this->authorize('viewAny', [Position::class]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

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
        try {
            $this->authorize('create', [Position::class]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

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
        try {
            $this->authorize('view', [Position::class, $position]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

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
        try {
            $this->authorize('update', [Position::class, $position]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

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
        try {
            $this->authorize('delete', [Position::class, $position]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

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
                    'message'=>'No se puede eliminar'
                ]);
            }
        }
    }

    public function mass()
    {
        try {
            $this->authorize('create', [Position::class]);
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
