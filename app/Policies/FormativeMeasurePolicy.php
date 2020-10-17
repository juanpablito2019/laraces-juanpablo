<?php

namespace App\Policies;

use App\FormativeMeasure;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class FormativeMeasurePolicy
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
        if($user->hasPermissionTo('list_formative_measure')){
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\User  $user
     * @param  \App\FormativeMeasure  $formativeMeasure
     * @return mixed
     */
    public function view(User $user, FormativeMeasure $formativeMeasure)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('list_formative_measure')){
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
        if($user->hasPermissionTo('create_formative_measure')){
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\FormativeMeasure  $formativeMeasure
     * @return mixed
     */
    public function update(User $user, FormativeMeasure $formativeMeasure)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('edit_formative_measure')){
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\FormativeMeasure  $formativeMeasure
     * @return mixed
     */
    public function delete(User $user, FormativeMeasure $formativeMeasure)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('delete_formative_measure')){
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\FormativeMeasure  $formativeMeasure
     * @return mixed
     */
    public function restore(User $user, FormativeMeasure $formativeMeasure)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\FormativeMeasure  $formativeMeasure
     * @return mixed
     */
    public function forceDelete(User $user, FormativeMeasure $formativeMeasure)
    {
        //
    }
}
