<?php

namespace App\Policies;

use App\CommitteeSession;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CommitteeSessionPolicy
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
        if($user->hasPermissionTo('list_committee_session')){
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\User  $user
     * @param  \App\CommitteeSession  $committeeSession
     * @return mixed
     */
    public function view(User $user, CommitteeSession $committeeSession)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('list_committee_session')){
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
        if($user->hasPermissionTo('create_committee_session')){
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\CommitteeSession  $committeeSession
     * @return mixed
     */
    public function update(User $user, CommitteeSession $committeeSession)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('edit_committee_session')){
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\CommitteeSession  $committeeSession
     * @return mixed
     */
    public function delete(User $user, CommitteeSession $committeeSession)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('delete_committee_session')){
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\CommitteeSession  $committeeSession
     * @return mixed
     */
    public function restore(User $user, CommitteeSession $committeeSession)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\CommitteeSession  $committeeSession
     * @return mixed
     */
    public function forceDelete(User $user, CommitteeSession $committeeSession)
    {
        //
    }
}
