<?php

namespace App\Http\Controllers;

use App\User;
use App\Stimulus;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Hash;
use App\Committee;
use App\CommitteeSession;
use App\Mail\MessageSend;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return User[]|\Illuminate\Database\Eloquent\Collection
     */
    public function index()
    {
        $this->authorize('viewAny', [User::class]);
        return User::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(UserRequest $request)
    {
        if (isset($request)) {
            //Carácteres para la contraseña
            $str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
            $password = "";
            //Reconstruimos la contraseña segun la longitud que se quiera
            for($i=0;$i<8;$i++) {
               //obtenemos un caracter aleatorio escogido de la cadena de caracteres
               $password .= substr($str,rand(0,62),1);
            }

            $email = [
                'name' =>ucwords($request->get('name')),
                'email' =>$request->get('email'),
                'password' =>$password
            ];


        }


        $this->authorize('create', [User::class]);
        $user = User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' =>Hash::make($password)
        ]);

        $user->assignRole($request->get('rol'));

        Mail::to($request->get('email'))->send(new MessageSend($email));

        return response()->json([
            'status'=>201,
            'success'=>true,
            'message' => 'Usuario agregado exitosamente'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return User
     */
    public function show(User $user)
    {
        $this->authorize('view', [User::class, $user]);
        $user->load('roles');
        return $user;

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserRequest $request, User $user)
    {
        $this->authorize('update', [User::class, $user]);
        $user->name = $request->get('name');
        $user->email = $request->get('email');
        $user->save();
        $user->syncRoles($request->get('rol'));

        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Usuario actualizado exitosamente'
        ]);


    }

    public function updatePersonalInformation(Request $request, User $user)
    {
        $user->name = $request->get('name');
        $user->email = $request->get('email');
        $user->save();
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Informacion personal actualizada con exito'
        ]);
    }

    public function updatePassword(Request $request, User $user)
    {
        if($request->get('password') != $request->get('password_confirm')){
            return response()->json([
                'status'=>400,
                'success'=>false,
                'message'=>'Las contraseñas no coinciden'
            ]);
        }
        $user->password = Hash::make($request->get('password'));
        $user->save();
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Contraseña actualizada con exito'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     * @throws \Exception
     */
    public function destroy(User $user)
    {
        $this->authorize('delete', [User::class, $user]);

        $user->delete();
            return response()->json([
                'status'=>200,
                'success'=>true,
                'message'=>'Usuario eliminado exitosamente'
        ]);
    }

    public function getAllCommittee()
    {
        $committeeSessions = CommitteeSession::with(
            'sanction',
            'learner.group.formationProgram',
            'learner.stimuli',
            'responsibles',
            'committee',
        )->get();
        foreach ($committeeSessions as $committeeSession) {
            foreach($committeeSession->responsibles as $responsible){
                $formative_measure = $responsible->pivot->formativeMeasure;
                $responsible->pivot->formative_measure = $formative_measure;
            }
        }
        return $committeeSessions;
    }

    public function getAllStimulus()
    {
        return Stimulus::with('learner.group.formationProgram')->get();
    }
}
