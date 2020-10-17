<?php

namespace App\Policies;

use App\Stimulus;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class StimulusPolicy
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
        if($user->hasPermissionTo('list_stimulus')){
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\User  $user
     * @param  \App\Stimulus  $stimulus
     * @return mixed
     */
    public function view(User $user, Stimulus $stimulus)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('list_stimulus')){
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
        if($user->hasPermissionTo('create_stimulus')){
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\Stimulus  $stimulus
     * @return mixed
     */
    public function update(User $user, Stimulus $stimulus)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('edit_stimulus')){
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Stimulus  $stimulus
     * @return mixed
     */
    public function delete(User $user, Stimulus $stimulus)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('delete_stimulus')){
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\Stimulus  $stimulus
     * @return mixed
     */
    public function restore(User $user, Stimulus $stimulus)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Stimulus  $stimulus
     * @return mixed
     */
    public function forceDelete(User $user, Stimulus $stimulus)
    {
        //
    }
}
