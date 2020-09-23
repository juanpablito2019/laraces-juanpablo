<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Traits\HasRoles;


class RoleController extends Controller
{
    use HasRoles;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {


        $user = Auth::user();

        $user->hasAllRoles(Role::all());

        $role = Role::all();


        $permissions = DB::table('permissions')->get();


        if($user->hasPermissionTo('list_act_template')){

            return response()->json([
                'permissions' =>$permissions,
                'rols' =>Role::all(),
                'user'=>$user
            ], 200);

        }else{
            return response()->json([
                'message' =>'You have not permissions'
            ], 403);
        }


    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required',
            'permissions'=>'required'
        ]);
        $role = Role::create([
            'name'=>$request->get('name')
        ]);
        $role->givePermissionTo($request->get('permissions'));

        return response()->json([
            'status'=>201,
            'success'=>true,
            'message' => 'Rol agregado exitosamente'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Role $role)
    {
        $role->users;
        return $role;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Role $role)
    {
        $role->name = $request->get('name');
        $role->save();
        $role->syncPermissions($request->get('permissions'));
        return redirect()->route('roles.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
        $role->syncPermissions();
        $role->delete();
        return redirect()->route('roles.index');
    }
}
