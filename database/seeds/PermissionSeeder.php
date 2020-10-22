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
        /* Reports */
        Permission::create(['model'=>'Reportes','name'=>'list_report', 'spanish_name' => 'Listar reportes']);
        /* Act Templates */
        Permission::create(['model'=>'Plantillas de acta','name'=>'list_act_template', 'spanish_name' => 'Listar plantilla actas']);
        Permission::create(['model'=>'Plantillas de acta','name'=>'create_act_template', 'spanish_name' => 'Crear plantilla actas']);
        Permission::create(['model'=>'Plantillas de acta','name'=>'edit_act_template', 'spanish_name' => 'Editar plantilla actas']);
        Permission::create(['model'=>'Plantillas de acta','name'=>'delete_act_template','spanish_name' => 'Eliminar plantilla actas']);
        /* Committee */
        Permission::create(['model'=>'Comités','name'=>'list_committee', 'spanish_name' => 'Listar comite']);
        Permission::create(['model'=>'Comités','name'=>'create_committee','spanish_name' => 'Crear comite']);
        Permission::create(['model'=>'Comités','name'=>'edit_committee', 'spanish_name' => 'Editar comite']);
        Permission::create(['model'=>'Comités','name'=>'delete_committee', 'spanish_name' => 'Eliminar comite']);
        /* Committee Parameter */
        Permission::create(['model'=>'Parametros de plantillas','name'=>'list_committee_parameter', 'spanish_name' => 'Listar parametro comite']);
        Permission::create(['model'=>'Parametros de plantillas','name'=>'create_committee_parameter', 'spanish_name' => 'Crear parametro comite']);
        Permission::create(['model'=>'Parametros de plantillas','name'=>'edit_committee_parameter', 'spanish_name' => 'Editar parametro comite']);
        Permission::create(['model'=>'Parametros de plantillas','name'=>'delete_committee_parameter', 'spanish_name' => 'Eliminar parametro comite']);
        /* Committee Session */
        Permission::create(['model'=>'Sessiones de comité','name'=>'list_committee_session', 'spanish_name' => 'Listar sesion comite']);
        Permission::create(['model'=>'Sessiones de comité','name'=>'create_committee_session', 'spanish_name' => 'Crear sesion comite']);
        Permission::create(['model'=>'Sessiones de comité','name'=>'edit_committee_session', 'spanish_name' => 'Editar sesion comite']);
        Permission::create(['model'=>'Sessiones de comité','name'=>'delete_committee_session', 'spanish_name' => 'Eliminar sesion comite']);
        /* Committee Session State */
        Permission::create(['model'=>'Estado sesion de comité','name'=>'list_committee_session_state', 'spanish_name' => 'Listar estado sesion comite']);
        Permission::create(['model'=>'Estado sesion de comité','name'=>'create_committee_session_state', 'spanish_name' => 'Crear estado sesion comite']);
        Permission::create(['model'=>'Estado sesion de comité','name'=>'edit_committee_session_state', 'spanish_name' => 'Editar estado sesion comite']);
        Permission::create(['model'=>'Estado sesion de comité','name'=>'delete_committee_session_state', 'spanish_name' => 'Eliminar estado sesion comite']);
        /* Contract Type */
        Permission::create(['model'=>'Tipo de contrato','name'=>'list_contract_type', 'spanish_name' => 'Listar tipos de contratos']);
        Permission::create(['model'=>'Tipo de contrato','name'=>'create_contract_type','spanish_name' => 'Crear tipos de contratos']);
        Permission::create(['model'=>'Tipo de contrato','name'=>'edit_contract_type','spanish_name' => 'Editar tipos de contratos']);
        Permission::create(['model'=>'Tipo de contrato','name'=>'delete_contract_type','spanish_name' => 'Eliminar tipos de contratos']);
        /* Formation Program */
        Permission::create(['model'=>'Programa de formación','name'=>'list_formation_program','spanish_name' => 'Listar programas de formacion']);
        Permission::create(['model'=>'Programa de formación','name'=>'create_formation_program','spanish_name' => 'Crear programas de formacion']);
        Permission::create(['model'=>'Programa de formación','name'=>'edit_formation_program','spanish_name' => 'Editar programas de formacion']);
        Permission::create(['model'=>'Programa de formación','name'=>'delete_formation_program','spanish_name' => 'Eliminar programas de formacion']);
        /* Formation Program Type */
        Permission::create(['model'=>'Tipo de programa de formación','name'=>'list_formation_program_type','spanish_name' => 'Listar tipos de programas de formacion']);
        Permission::create(['model'=>'Tipo de programa de formación','name'=>'create_formation_program_type','spanish_name' => 'Crear tipos de programas de formacion']);
        Permission::create(['model'=>'Tipo de programa de formación','name'=>'edit_formation_program_type','spanish_name' => 'Editar tipos de programas de formacion']);
        Permission::create(['model'=>'Tipo de programa de formación','name'=>'delete_formation_program_type','spanish_name' => 'Eliminar tipos de programas de formacion']);
        /* Formative Measure */
        Permission::create(['model'=>'Medida formativa','name'=>'list_formative_measure','spanish_name' => 'Listar medidas formativas']);
        Permission::create(['model'=>'Medida formativa','name'=>'create_formative_measure','spanish_name' => 'Crear medidas formativas']);
        Permission::create(['model'=>'Medida formativa','name'=>'edit_formative_measure','spanish_name' => 'Editar medidas formativas']);
        Permission::create(['model'=>'Medida formativa','name'=>'delete_formative_measure','spanish_name' => 'Eliminar medidas formativas']);
        /* General Parameter */
        Permission::create(['model'=>'Parametro general','name'=>'list_general_parameter','spanish_name' => 'Listar parametros generales']);
        Permission::create(['model'=>'Parametro general','name'=>'create_general_parameter','spanish_name' => 'Crear parametros generales']);
        Permission::create(['model'=>'Parametro general','name'=>'edit_general_parameter','spanish_name' => 'Editar parametros generales']);
        Permission::create(['model'=>'Parametro general','name'=>'delete_general_parameter','spanish_name' => 'Eliminar parametros generales']);
        /* Group */
        Permission::create(['model'=>'Grupo','name'=>'list_group','spanish_name' => 'Listar grupos']);
        Permission::create(['model'=>'Grupo','name'=>'create_group','spanish_name' => 'Crear grupos']);
        Permission::create(['model'=>'Grupo','name'=>'edit_group','spanish_name' => 'Editar grupos']);
        Permission::create(['model'=>'Grupo','name'=>'delete_group','spanish_name' => 'Eliminar grupos']);
        /* Infringement Classification */
        Permission::create(['model'=>'Clasificacion de la falta','name'=>'list_infringement_classification','spanish_name' => 'Listar clasificacion de faltas']);
        Permission::create(['model'=>'Clasificacion de la falta','name'=>'create_infringement_classification','spanish_name' => 'Crear clasificacion de faltas']);
        Permission::create(['model'=>'Clasificacion de la falta','name'=>'edit_infringement_classification','spanish_name' => 'Editar clasificacion de faltas']);
        Permission::create(['model'=>'Clasificacion de la falta','name'=>'delete_infringement_classification','spanish_name' => 'Eliminar clasificacion de faltas']);
        /* Infringement Type */
        Permission::create(['model'=>'Tipo de falta','name'=>'list_infringement_type','spanish_name' => 'Listar tipos de faltas']);
        Permission::create(['model'=>'Tipo de falta','name'=>'create_infringement_type','spanish_name' => 'Crear tipos de faltas']);
        Permission::create(['model'=>'Tipo de falta','name'=>'edit_infringement_type','spanish_name' => 'Editar tipos de faltas']);
        Permission::create(['model'=>'Tipo de falta','name'=>'delete_infringement_type','spanish_name' => 'Eliminar tipos de faltas']);
        /* Learner */
        Permission::create(['model'=>'Aprendiz','name'=>'list_learner','spanish_name' => 'Listar aprendices']);
        Permission::create(['model'=>'Aprendiz','name'=>'create_learner','spanish_name' => 'Crear aprendices']);
        Permission::create(['model'=>'Aprendiz','name'=>'edit_learner','spanish_name' => 'Editar aprendices']);
        Permission::create(['model'=>'Aprendiz','name'=>'delete_learner','spanish_name' => 'Eliminar aprendices']);
        /* Learner Novelty */
        Permission::create(['model'=>'Novedades del aprendiz','name'=>'list_learner_novelty','spanish_name' => 'Listar novedades de aprendices']);
        Permission::create(['model'=>'Novedades del aprendiz','name'=>'create_learner_novelty','spanish_name' => 'Crear novedades de aprendices']);
        Permission::create(['model'=>'Novedades del aprendiz','name'=>'edit_learner_novelty','spanish_name' => 'Editar novedades de aprendices']);
        Permission::create(['model'=>'Novedades del aprendiz','name'=>'delete_learner_novelty','spanish_name' => 'Eliminar novedades de aprendices']);
        /* Modality */
        Permission::create(['model'=>'Modalidad','name'=>'list_modality','spanish_name' => 'Listar modalidades']);
        Permission::create(['model'=>'Modalidad','name'=>'create_modality','spanish_name' => 'Crear modalidades']);
        Permission::create(['model'=>'Modalidad','name'=>'edit_modality','spanish_name' => 'Editar modalidades']);
        Permission::create(['model'=>'Modalidad','name'=>'delete_modality','spanish_name' => 'Eliminar modalidades']);
        /* Novelty Type */
        Permission::create(['model'=>'Tipo de novedad','name'=>'list_novelty_type','spanish_name' => 'Listar tipos de novedades']);
        Permission::create(['model'=>'Tipo de novedad','name'=>'create_novelty_type','spanish_name' => 'Crear tipos de novedades']);
        Permission::create(['model'=>'Tipo de novedad','name'=>'edit_novelty_type','spanish_name' => 'Editar tipos de novedades']);
        Permission::create(['model'=>'Tipo de novedad','name'=>'delete_novelty_type','spanish_name' => 'Eliminar tipos de novedades']);
        /* Position */
        Permission::create(['model'=>'Cargo','name'=>'list_position','spanish_name' => 'Listar cargos']);
        Permission::create(['model'=>'Cargo','name'=>'create_position','spanish_name' => 'Crear cargos']);
        Permission::create(['model'=>'Cargo','name'=>'edit_position','spanish_name' => 'Editar cargos']);
        Permission::create(['model'=>'Cargo','name'=>'delete_position','spanish_name' => 'Eliminar cargos']);
        /* Role */
        Permission::create(['model'=>'Rol','name'=>'list_role','spanish_name' => 'Listar roles']);
        Permission::create(['model'=>'Rol','name'=>'create_role','spanish_name' => 'Crear roles']);
        Permission::create(['model'=>'Rol','name'=>'edit_role','spanish_name' => 'Editar roles']);
        Permission::create(['model'=>'Rol','name'=>'delete_role','spanish_name' => 'Eliminar roles']);
        /* Sanction */
        Permission::create(['model'=>'Sancion','name'=>'list_sanction','spanish_name' => 'Listar sanciones']);
        Permission::create(['model'=>'Sancion','name'=>'create_sanction','spanish_name' => 'Crear sanciones']);
        Permission::create(['model'=>'Sancion','name'=>'edit_sanction','spanish_name' => 'Editar sanciones']);
        Permission::create(['model'=>'Sancion','name'=>'delete_sanction','spanish_name' => 'Eliminar sanciones']);
        /* Stimulus */
        Permission::create(['model'=>'Estimulo','name'=>'list_stimulus','spanish_name' => 'Listar estimulos']);
        Permission::create(['model'=>'Estimulo','name'=>'create_stimulus','spanish_name' => 'Crear estimulos']);
        Permission::create(['model'=>'Estimulo','name'=>'edit_stimulus','spanish_name' => 'Editar estimulos']);
        Permission::create(['model'=>'Estimulo','name'=>'delete_stimulus','spanish_name' => 'Eliminar estimulos']);
        /* User */
        Permission::create(['model'=>'Usuario','name'=>'list_user','spanish_name' => 'Listar usuarios']);
        Permission::create(['model'=>'Usuario','name'=>'create_user','spanish_name' => 'Crear usuarios']);
        Permission::create(['model'=>'Usuario','name'=>'edit_user','spanish_name' => 'Editar usuarios']);
        Permission::create(['model'=>'Usuario','name'=>'delete_user','spanish_name' => 'Eliminar usuarios']);
        /* Formative measure responsibles */
        Permission::create(['model'=>'Responsable de medida formativa','name'=>'list_formative_measure_responsible','spanish_name' => 'Listar responsables de medidas formativas']);
        Permission::create(['model'=>'Responsable de medida formativa','name'=>'create_formative_measure_responsible','spanish_name' => 'Crear responsables de medidas formativas']);
        Permission::create(['model'=>'Responsable de medida formativa','name'=>'edit_formative_measure_responsible','spanish_name' => 'Editar responsables de medidas formativas']);
        Permission::create(['model'=>'Responsable de medida formativa','name'=>'delete_formative_measure_responsible','spanish_name' => 'Eliminar responsables de medidas formativas']);
    }
}
