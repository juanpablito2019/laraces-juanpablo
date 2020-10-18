<?php

namespace App\Providers;

use App\User;
use App\Group;
use App\Learner;
use App\Modality;
use App\Position;
use App\Sanction;
use App\Stimulus;
use App\Committee;
use App\ActTemplate;
use App\NoveltyType;
use App\ContractType;
use App\LearnerNovelty;
use App\CommitteeSession;
use App\FormationProgram;
use App\FormativeMeasure;
use App\GeneralParameter;
use App\InfringementType;
use App\CommitteeParameter;
use App\Policies\RolePolicy;
use App\Policies\UserPolicy;
use App\FormationProgramType;
use App\Policies\GroupPolicy;
use App\CommitteeSessionState;
use App\Policies\LearnerPolicy;
use App\Policies\ModalityPolicy;
use App\Policies\PositionPolicy;
use App\Policies\SanctionPolicy;
use App\Policies\StimulusPolicy;
use App\Policies\CommitteePolicy;
use Spatie\Permission\Models\Role;
use App\InfringementClassification;
use App\Policies\ActTemplatePolicy;
use App\Policies\NoveltyTypePolicy;
use App\FormativeMeasureResponsible;
use App\Policies\ContractTypePolicy;
use Illuminate\Support\Facades\Gate;
use App\Policies\LearnerNoveltyPolicy;
use App\Policies\CommitteeSessionPolicy;
use App\Policies\FormationProgramPolicy;
use App\Policies\FormativeMeasurePolicy;
use App\Policies\GeneralParameterPolicy;
use App\Policies\InfringementTypePolicy;
use App\Policies\CommitteeParameterPolicy;
use App\Policies\FormationProgramTypePolicy;
use App\Policies\CommitteeSessionStatePolicy;
use App\Policies\InfringementClassificationPolicy;
use App\Policies\FormativeMeasureResponsiblePolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        ActTemplate::class => ActTemplatePolicy::class,
        Committee::class => CommitteePolicy::class,
        CommitteeParameter::class => CommitteeParameterPolicy::class,
        CommitteeSession::class => CommitteeSessionPolicy::class,
        CommitteeSessionState::class => CommitteeSessionStatePolicy::class,
        ContractType::class => ContractTypePolicy::class,
        Group::class => GroupPolicy::class,
        Learner::class => LearnerPolicy::class,
        Position::class => PositionPolicy::class,
        LearnerNovelty::class => LearnerNoveltyPolicy::class,
        Stimulus::class => StimulusPolicy::class,
        GeneralParameter::class => GeneralParameterPolicy::class,
        FormationProgram::class => FormationProgramPolicy::class,
        FormationProgramType::class => FormationProgramTypePolicy::class,
        FormativeMeasure::class => FormativeMeasurePolicy::class,
        InfringementClassification::class => InfringementClassificationPolicy::class,
        InfringementType::class => InfringementTypePolicy::class,
        Modality::class => ModalityPolicy::class,
        NoveltyType::class => NoveltyTypePolicy::class,
        Role::class => RolePolicy::class,
        Sanction::class => SanctionPolicy::class,
        User::class => UserPolicy::class,
        FormativeMeasureResponsible::class => FormativeMeasureResponsiblePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::before(function ($user, $ability) {
            return $user->hasRole('SuperAdmin') ? true : null;
        });
    }
}
