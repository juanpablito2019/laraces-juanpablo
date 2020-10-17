<?php

namespace App\Policies;

use App\GeneralParameter;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class GeneralParameterPolicy
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
        if($user->hasPermissionTo('list_general_parameter')){
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\User  $user
     * @param  \App\GeneralParameter  $generalParameter
     * @return mixed
     */
    public function view(User $user, GeneralParameter $generalParameter)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('list_general_parameter')){
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
        if($user->hasPermissionTo('create_general_parameter')){
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\GeneralParameter  $generalParameter
     * @return mixed
     */
    public function update(User $user, GeneralParameter $generalParameter)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('edit_general_parameter')){
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\GeneralParameter  $generalParameter
     * @return mixed
     */
    public function delete(User $user, GeneralParameter $generalParameter)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('delete_general_parameter')){
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\GeneralParameter  $generalParameter
     * @return mixed
     */
    public function restore(User $user, GeneralParameter $generalParameter)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\GeneralParameter  $generalParameter
     * @return mixed
     */
    public function forceDelete(User $user, GeneralParameter $generalParameter)
    {
        //
    }
}
