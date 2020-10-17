<?php

namespace App\Policies;

use App\Sanction;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class SanctionPolicy
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
        if($user->hasPermissionTo('list_sanction')){
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\User  $user
     * @param  \App\Sanction  $sanction
     * @return mixed
     */
    public function view(User $user, Sanction $sanction)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('list_sanction')){
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
        if($user->hasPermissionTo('create_sanction')){
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\Sanction  $sanction
     * @return mixed
     */
    public function update(User $user, Sanction $sanction)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('edit_sanction')){
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Sanction  $sanction
     * @return mixed
     */
    public function delete(User $user, Sanction $sanction)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('delete_sanction')){
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\Sanction  $sanction
     * @return mixed
     */
    public function restore(User $user, Sanction $sanction)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Sanction  $sanction
     * @return mixed
     */
    public function forceDelete(User $user, Sanction $sanction)
    {
        //
    }
}
