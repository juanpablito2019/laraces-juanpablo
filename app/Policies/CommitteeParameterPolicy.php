<?php

namespace App\Policies;

use App\CommitteeParameter;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CommitteeParameterPolicy
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
        if($user->hasPermissionTo('list_committee_parameter')){
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\User  $user
     * @param  \App\CommitteeParameter  $committeeParameter
     * @return mixed
     */
    public function view(User $user, CommitteeParameter $committeeParameter)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('list_committee_parameter')){
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
        if($user->hasPermissionTo('create_committee_parameter')){
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\CommitteeParameter  $committeeParameter
     * @return mixed
     */
    public function update(User $user, CommitteeParameter $committeeParameter)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('edit_committee_parameter')){
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\CommitteeParameter  $committeeParameter
     * @return mixed
     */
    public function delete(User $user, CommitteeParameter $committeeParameter)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('delete_committee_parameter')){
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\CommitteeParameter  $committeeParameter
     * @return mixed
     */
    public function restore(User $user, CommitteeParameter $committeeParameter)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\CommitteeParameter  $committeeParameter
     * @return mixed
     */
    public function forceDelete(User $user, CommitteeParameter $committeeParameter)
    {
        //
    }
}
