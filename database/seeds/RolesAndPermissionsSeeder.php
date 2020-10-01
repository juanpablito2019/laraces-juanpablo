<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin  = Role::find(2);  // Permisos Administrador

        // $admin->givePermissionTo('list_act_template');
        // $admin->givePermissionTo('create_act_template');
        // $admin->givePermissionTo('edit_act_template');
        // $admin->givePermissionTo('update_act_template');
        // $admin->givePermissionTo('delete_act_template');
        
        $admin->givePermissionTo('list_committee');
        $admin->givePermissionTo('create_committee');
        $admin->givePermissionTo('edit_committee');
        $admin->givePermissionTo('update_committee');
        $admin->givePermissionTo('delete_committee');

        $admin->givePermissionTo('list_committee_parameter');
        $admin->givePermissionTo('create_committee_parameter');
        $admin->givePermissionTo('edit_committee_parameter');
        $admin->givePermissionTo('update_committee_parameter');
        $admin->givePermissionTo('delete_committee_parameter');

        $admin->givePermissionTo('list_committee_session');
        $admin->givePermissionTo('create_committee_session');
        $admin->givePermissionTo('edit_committee_session');
        $admin->givePermissionTo('update_committee_session');
        $admin->givePermissionTo('delete_committee_session');

        $admin->givePermissionTo('list_committee_session_state');
        $admin->givePermissionTo('create_committee_session_state');
        $admin->givePermissionTo('edit_committee_session_state');
        $admin->givePermissionTo('update_committee_session_state');
        $admin->givePermissionTo('delete_committee_session_state');

        $admin->givePermissionTo('list_contract_type');
        $admin->givePermissionTo('create_contract_type');
        $admin->givePermissionTo('edit_contract_type');
        $admin->givePermissionTo('update_contract_type');
        $admin->givePermissionTo('delete_contract_type');

        $admin->givePermissionTo('list_formation_program');
        $admin->givePermissionTo('create_formation_program');
        $admin->givePermissionTo('edit_formation_program');
        $admin->givePermissionTo('update_formation_program');
        $admin->givePermissionTo('delete_formation_program');

        $admin->givePermissionTo('list_formation_program_type');
        $admin->givePermissionTo('create_formation_program_type');
        $admin->givePermissionTo('edit_formation_program_type');
        $admin->givePermissionTo('update_formation_program_type');
        $admin->givePermissionTo('delete_formation_program_type');

        $admin->givePermissionTo('list_formative_measure');
        $admin->givePermissionTo('create_formative_measure');
        $admin->givePermissionTo('edit_formative_measure');
        $admin->givePermissionTo('update_formative_measure');
        $admin->givePermissionTo('delete_formative_measure');

        // $admin->givePermissionTo('list_general_parameter');
        // $admin->givePermissionTo('create_general_parameter');
        // $admin->givePermissionTo('edit_general_parameter');
        // $admin->givePermissionTo('update_general_parameter');
        // $admin->givePermissionTo('delete_general_parameter');

        $admin->givePermissionTo('list_group');
        $admin->givePermissionTo('create_group');
        $admin->givePermissionTo('edit_group');
        $admin->givePermissionTo('update_group');
        $admin->givePermissionTo('delete_group');

        $admin->givePermissionTo('list_infringement_classification');
        $admin->givePermissionTo('create_infringement_classification');
        $admin->givePermissionTo('edit_infringement_classification');
        $admin->givePermissionTo('update_infringement_classification');
        $admin->givePermissionTo('delete_infringement_classification');

        $admin->givePermissionTo('list_infringement_type');
        $admin->givePermissionTo('create_infringement_type');
        $admin->givePermissionTo('edit_infringement_type');
        $admin->givePermissionTo('update_infringement_type');
        $admin->givePermissionTo('delete_infringement_type');

        $admin->givePermissionTo('list_learner');
        $admin->givePermissionTo('create_learner');
        $admin->givePermissionTo('edit_learner');
        $admin->givePermissionTo('update_learner');
        $admin->givePermissionTo('delete_learner');

        $admin->givePermissionTo('list_learner_novelty');
        $admin->givePermissionTo('create_learner_novelty');
        $admin->givePermissionTo('edit_learner_novelty');
        $admin->givePermissionTo('update_learner_novelty');
        $admin->givePermissionTo('delete_learner_novelty');

        $admin->givePermissionTo('list_modality');
        $admin->givePermissionTo('create_modality');
        $admin->givePermissionTo('edit_modality');
        $admin->givePermissionTo('update_modality');
        $admin->givePermissionTo('delete_modality');

        $admin->givePermissionTo('list_novelty_type');
        $admin->givePermissionTo('create_novelty_type');
        $admin->givePermissionTo('edit_novelty_type');
        $admin->givePermissionTo('update_novelty_type');
        $admin->givePermissionTo('delete_novelty_type');

        $admin->givePermissionTo('list_position');
        $admin->givePermissionTo('create_position');
        $admin->givePermissionTo('edit_position');
        $admin->givePermissionTo('update_position');
        $admin->givePermissionTo('delete_position');
        
        $admin->givePermissionTo('list_role');
        $admin->givePermissionTo('create_role');
        $admin->givePermissionTo('edit_role');
        $admin->givePermissionTo('update_role');
        $admin->givePermissionTo('delete_role');

        $admin->givePermissionTo('list_sanction');
        $admin->givePermissionTo('create_sanction');
        $admin->givePermissionTo('edit_sanction');
        $admin->givePermissionTo('update_sanction');
        $admin->givePermissionTo('delete_sanction');

        $admin->givePermissionTo('list_stimulus');
        $admin->givePermissionTo('create_stimulus');
        $admin->givePermissionTo('edit_stimulus');
        $admin->givePermissionTo('update_stimulus');
        $admin->givePermissionTo('delete_stimulus');

        $admin->givePermissionTo('list_user');
        $admin->givePermissionTo('create_user');
        $admin->givePermissionTo('edit_user');
        $admin->givePermissionTo('update_user');
        $admin->givePermissionTo('delete_user');
        
        $cordi  = Role::find(3); // Permisos Coordinador

        $cordi->givePermissionTo('list_committee');
        $cordi->givePermissionTo('list_committee_session');
        $cordi->givePermissionTo('list_formation_program');
        $cordi->givePermissionTo('list_group');
        $cordi->givePermissionTo('list_learner');
        $admin->givePermissionTo('list_position');
        $cordi->givePermissionTo('list_learner_novelty');
        $cordi->givePermissionTo('list_stimulus');

        $subdi  = Role::find(4); // Permisos Subdirector

        $subdi->givePermissionTo('list_committee');
        $subdi->givePermissionTo('list_committee_session');
        $subdi->givePermissionTo('list_formation_program');
        $subdi->givePermissionTo('list_group');
        $subdi->givePermissionTo('list_learner');
        $admin->givePermissionTo('list_position');
        $subdi->givePermissionTo('list_learner_novelty');
        $subdi->givePermissionTo('list_stimulus');
    }
}
