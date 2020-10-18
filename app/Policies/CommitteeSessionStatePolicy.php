<?php

namespace App\Policies;

use App\CommitteeSessionState;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CommitteeSessionStatePolicy
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
        if($user->hasPermissionTo('list_committee_session_state')){
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\User  $user
     * @param  \App\CommitteeSessionState  $committeeSessionState
     * @return mixed
     */
    public function view(User $user, CommitteeSessionState $committeeSessionState)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('list_committee_session_state')){
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
        if($user->hasPermissionTo('create_committee_session_state')){
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\CommitteeSessionState  $committeeSessionState
     * @return mixed
     */
    public function update(User $user, CommitteeSessionState $committeeSessionState)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('edit_committee_session_state')){
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\CommitteeSessionState  $committeeSessionState
     * @return mixed
     */
    public function delete(User $user, CommitteeSessionState $committeeSessionState)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('delete_committee_session_state')){
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\CommitteeSessionState  $committeeSessionState
     * @return mixed
     */
    public function restore(User $user, CommitteeSessionState $committeeSessionState)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\CommitteeSessionState  $committeeSessionState
     * @return mixed
     */
    public function forceDelete(User $user, CommitteeSessionState $committeeSessionState)
    {
        //
    }
}
