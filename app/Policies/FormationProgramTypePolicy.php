<?php

namespace App\Policies;

use App\FormationProgramType;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class FormationProgramTypePolicy
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
        if($user->hasPermissionTo('list_formation_program_type')){
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\User  $user
     * @param  \App\FormationProgramType  $formationProgramType
     * @return mixed
     */
    public function view(User $user, FormationProgramType $formationProgramType)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('list_formation_program_type')){
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
        if($user->hasPermissionTo('create_formation_program_type')){
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\FormationProgramType  $formationProgramType
     * @return mixed
     */
    public function update(User $user, FormationProgramType $formationProgramType)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('edit_formation_program_type')){
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\FormationProgramType  $formationProgramType
     * @return mixed
     */
    public function delete(User $user, FormationProgramType $formationProgramType)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('delete_formation_program_type')){
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\FormationProgramType  $formationProgramType
     * @return mixed
     */
    public function restore(User $user, FormationProgramType $formationProgramType)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\FormationProgramType  $formationProgramType
     * @return mixed
     */
    public function forceDelete(User $user, FormationProgramType $formationProgramType)
    {
        //
    }
}
