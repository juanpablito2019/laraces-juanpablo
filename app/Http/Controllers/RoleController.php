<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Models\Permission;
use Illuminate\Auth\Access\AuthorizationException;


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

        try {
            $this->authorize('viewAny', [Role::class]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        $user = Auth::user();


        return response()->json([
            'rols'=>Role::all(),
            'permissions'=>Permission::all(),
            'user'=>$user = Auth::user(),
            'userPermissions'=>$user->getPermissionsViaRoles()
        ]);


    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        try {
            $this->authorize('create', [Role::class]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

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
        try {
            $this->authorize('view', [Role::class, $role]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

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
        try {
            $this->authorize('update', [Role::class, $role]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

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
        try {
            $this->authorize('delete', [Role::class, $role]);
        } catch (\Throwable $th) {
            if ($th instanceof AuthorizationException)
            {
                return response()->json(403);
            }
        }

        $role->syncPermissions();
        $role->delete();
        return redirect()->route('roles.index');
    }
}
