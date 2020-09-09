<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /* Act Templates */
        Permission::create(['name'=>'list_act_template']);
        Permission::create(['name'=>'create_act_template']);
        Permission::create(['name'=>'edit_act_template']);
        Permission::create(['name'=>'update_act_template']);
        Permission::create(['name'=>'delete_act_template']);
        /* Committee */
        Permission::create(['name'=>'list_committee']);
        Permission::create(['name'=>'create_committee']);
        Permission::create(['name'=>'edit_committee']);
        Permission::create(['name'=>'update_committee']);
        Permission::create(['name'=>'delete_committee']);
        /* Committee Parameter */
        Permission::create(['name'=>'list_committee_parameter']);
        Permission::create(['name'=>'create_committee_parameter']);
        Permission::create(['name'=>'edit_committee_parameter']);
        Permission::create(['name'=>'update_committee_parameter']);
        Permission::create(['name'=>'delete_committee_parameter']);
        /* Committee Session */
        Permission::create(['name'=>'list_committee_session']);
        Permission::create(['name'=>'create_committee_session']);
        Permission::create(['name'=>'edit_committee_session']);
        Permission::create(['name'=>'update_committee_session']);
        Permission::create(['name'=>'delete_committee_session']);
        /* Committee Session State */
        Permission::create(['name'=>'list_committee_session_state']);
        Permission::create(['name'=>'create_committee_session_state']);
        Permission::create(['name'=>'edit_committee_session_state']);
        Permission::create(['name'=>'update_committee_session_state']);
        Permission::create(['name'=>'delete_committee_session_state']);
        /* Contract Type */
        Permission::create(['name'=>'list_contract_type']);
        Permission::create(['name'=>'create_contract_type']);
        Permission::create(['name'=>'edit_contract_type']);
        Permission::create(['name'=>'update_contract_type']);
        Permission::create(['name'=>'delete_contract_type']);
        /* Formation Program */
        Permission::create(['name'=>'list_formation_program']);
        Permission::create(['name'=>'create_formation_program']);
        Permission::create(['name'=>'edit_formation_program']);
        Permission::create(['name'=>'update_formation_program']);
        Permission::create(['name'=>'delete_formation_program']);
        /* Formation Program Type */
        Permission::create(['name'=>'list_formation_program_type']);
        Permission::create(['name'=>'create_formation_program_type']);
        Permission::create(['name'=>'edit_formation_program_type']);
        Permission::create(['name'=>'update_formation_program_type']);
        Permission::create(['name'=>'delete_formation_program_type']);
        /* Formative Measure */
        Permission::create(['name'=>'list_formative_measure']);
        Permission::create(['name'=>'create_formative_measure']);
        Permission::create(['name'=>'edit_formative_measure']);
        Permission::create(['name'=>'update_formative_measure']);
        Permission::create(['name'=>'delete_formative_measure']);
        /* General Parameter */
        Permission::create(['name'=>'list_general_parameter']);
        Permission::create(['name'=>'create_general_parameter']);
        Permission::create(['name'=>'edit_general_parameter']);
        Permission::create(['name'=>'update_general_parameter']);
        Permission::create(['name'=>'delete_general_parameter']);
        /* Group */
        Permission::create(['name'=>'list_group']);
        Permission::create(['name'=>'create_group']);
        Permission::create(['name'=>'edit_group']);
        Permission::create(['name'=>'update_group']);
        Permission::create(['name'=>'delete_group']);
        /* Infringement Classification */
        Permission::create(['name'=>'list_infringement_classification']);
        Permission::create(['name'=>'create_infringement_classification']);
        Permission::create(['name'=>'edit_infringement_classification']);
        Permission::create(['name'=>'update_infringement_classification']);
        Permission::create(['name'=>'delete_infringement_classification']);
        /* Infringement Type */
        Permission::create(['name'=>'list_infringement_type']);
        Permission::create(['name'=>'create_infringement_type']);
        Permission::create(['name'=>'edit_infringement_type']);
        Permission::create(['name'=>'update_infringement_type']);
        Permission::create(['name'=>'delete_infringement_type']);
        /* Learner */
        Permission::create(['name'=>'list_learner']);
        Permission::create(['name'=>'create_learner']);
        Permission::create(['name'=>'edit_learner']);
        Permission::create(['name'=>'update_learner']);
        Permission::create(['name'=>'delete_learner']);
        /* Learner Novelty */
        Permission::create(['name'=>'list_learner_novelty']);
        Permission::create(['name'=>'create_learner_novelty']);
        Permission::create(['name'=>'edit_learner_novelty']);
        Permission::create(['name'=>'update_learner_novelty']);
        Permission::create(['name'=>'delete_learner_novelty']);
        /* Modality */
        Permission::create(['name'=>'list_modality']);
        Permission::create(['name'=>'create_modality']);
        Permission::create(['name'=>'edit_modality']);
        Permission::create(['name'=>'update_modality']);
        Permission::create(['name'=>'delete_modality']);
        /* Novelty Type */
        Permission::create(['name'=>'list_novelty_type']);
        Permission::create(['name'=>'create_novelty_type']);
        Permission::create(['name'=>'edit_novelty_type']);
        Permission::create(['name'=>'update_novelty_type']);
        Permission::create(['name'=>'delete_novelty_type']);
        /* Position */
        Permission::create(['name'=>'list_position']);
        Permission::create(['name'=>'create_position']);
        Permission::create(['name'=>'edit_position']);
        Permission::create(['name'=>'update_position']);
        Permission::create(['name'=>'delete_position']);
        /* Role */
        Permission::create(['name'=>'list_role']);
        Permission::create(['name'=>'create_role']);
        Permission::create(['name'=>'edit_role']);
        Permission::create(['name'=>'update_role']);
        Permission::create(['name'=>'delete_role']);
        /* Sanction */
        Permission::create(['name'=>'list_sanction']);
        Permission::create(['name'=>'create_sanction']);
        Permission::create(['name'=>'edit_sanction']);
        Permission::create(['name'=>'update_sanction']);
        Permission::create(['name'=>'delete_sanction']);
        /* Stimulus */
        Permission::create(['name'=>'list_stimulus']);
        Permission::create(['name'=>'create_stimulus']);
        Permission::create(['name'=>'edit_stimulus']);
        Permission::create(['name'=>'update_stimulus']);
        Permission::create(['name'=>'delete_stimulus']);
        /* User */
        Permission::create(['name'=>'list_user']);
        Permission::create(['name'=>'create_user']);
        Permission::create(['name'=>'edit_user']);
        Permission::create(['name'=>'update_user']);
        Permission::create(['name'=>'delete_user']);
    }
}
