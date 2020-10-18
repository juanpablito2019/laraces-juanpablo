<?php

namespace App\Policies;

use App\InfringementType;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class InfringementTypePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('list_infringement_type')){
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\User  $user
     * @param  \App\InfringementType  $infringementType
     * @return mixed
     */
    public function view(User $user, InfringementType $infringementType)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('list_infringement_type')){
            return true;
        }
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('create_infringement_type')){
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\InfringementType  $infringementType
     * @return mixed
     */
    public function update(User $user, InfringementType $infringementType)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('edit_infringement_type')){
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\InfringementType  $infringementType
     * @return mixed
     */
    public function delete(User $user, InfringementType $infringementType)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('delete_infringement_type')){
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\InfringementType  $infringementType
     * @return mixed
     */
    public function restore(User $user, InfringementType $infringementType)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\InfringementType  $infringementType
     * @return mixed
     */
    public function forceDelete(User $user, InfringementType $infringementType)
    {
        //
    }
}
