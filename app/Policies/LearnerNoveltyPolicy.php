<?php

namespace App\Policies;

use App\LearnerNovelty;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class LearnerNoveltyPolicy
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
        if($user->hasPermissionTo('list_learner_novelty')){
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\User  $user
     * @param  \App\LearnerNovelty  $learnerNovelty
     * @return mixed
     */
    public function view(User $user, LearnerNovelty $learnerNovelty)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('list_learner_novelty')){
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
        if($user->hasPermissionTo('create_learner_novelty')){
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\LearnerNovelty  $learnerNovelty
     * @return mixed
     */
    public function update(User $user, LearnerNovelty $learnerNovelty)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('edit_learner_novelty')){
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\LearnerNovelty  $learnerNovelty
     * @return mixed
     */
    public function delete(User $user, LearnerNovelty $learnerNovelty)
    {
        if($user->hasRole('SuperAdmin')){
            return true;
        }
        if($user->hasPermissionTo('delete_learner_novelty')){
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\LearnerNovelty  $learnerNovelty
     * @return mixed
     */
    public function restore(User $user, LearnerNovelty $learnerNovelty)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\LearnerNovelty  $learnerNovelty
     * @return mixed
     */
    public function forceDelete(User $user, LearnerNovelty $learnerNovelty)
    {
        //
    }
}
