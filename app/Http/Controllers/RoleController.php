<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Models\Permission;


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
        $this->authorize('viewAny', [Role::class]);
        return Role::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RoleRequest $request)
    {

        $this->authorize('create', [Role::class]);
        $request->validate([
            'name'=>'required| unique:roles',
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
        $this->authorize('view', [Role::class, $role]);

        $role->permissions;
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
    public function update(RoleRequest $request, Role $role)
    {
        $this->authorize('update', [Role::class, $role]);

        $role->name = $request->get('name');
        $role->save();
        $role->syncPermissions($request->get('permissions'));

        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Rol actualizado exitosamente'
        ]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
        $this->authorize('delete', [Role::class, $role]);
        $role->syncPermissions();
        $role->delete();
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Rol eliminado exitosamente'
         ]);
    }
}
