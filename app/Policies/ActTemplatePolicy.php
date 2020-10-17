<?php

namespace App\Policies;

use App\ActTemplate;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ActTemplatePolicy
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
        if($user->hasPermissionTo('list_act_template')){
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\User  $user
     * @param  \App\ActTemplate  $actTemplate
     * @return mixed
     */
    public function view(User $user, ActTemplate $actTemplate)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('list_act_template')){
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
        if($user->hasPermissionTo('create_act_template')){
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\ActTemplate  $actTemplate
     * @return mixed
     */
    public function update(User $user, ActTemplate $actTemplate)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('edit_act_template')){
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\ActTemplate  $actTemplate
     * @return mixed
     */
    public function delete(User $user, ActTemplate $actTemplate)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('delete_act_template')){
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\ActTemplate  $actTemplate
     * @return mixed
     */
    public function restore(User $user, ActTemplate $actTemplate)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\ActTemplate  $actTemplate
     * @return mixed
     */
    public function forceDelete(User $user, ActTemplate $actTemplate)
    {
        //
    }
}
