import Learners from "./pages/Learners";
import Sanctions from './pages/Sanctions';
import CommitteeParameters from "./pages/CommitteeParameters";
import FormativeMeasures from './pages/FormativeMeasures';
import Home from "./pages/Home";
import Positions from "./pages/Positions";
import FormationProgramTypes from "./pages/FormationProgramTypes";
import FormationPrograms from "./pages/FormationPrograms";
import ContractTypes from "./pages/ContractTypes";
import ResponsiblesFormativeMeasures from "./pages/ResponsiblesFormativeMeasures";
import Modalities from "./pages/Modalities";
import Groups from "./pages/Groups";
import Committees from "./pages/Committees";
import Committee from "./pages/Committee";
import InfringementTypes from "./pages/InfringementTypes";
import InfringementClassifications from "./pages/InfringementClassifications";
import NoveltyTypes from "./pages/NoveltyTypes";
import CommitteeSession from "./pages/CommitteeSession";
import LearnerNovelties from "./pages/LearnerNovelties";
import GeneralParameters from "./pages/GeneralParameters";
import ActTemplates from "./pages/ActTemplates";
import CreateRol from "./pages/CreateRoles";
import EditRol from "./pages/EditRoles";
import Profile from "./pages/Profile";
import Reports from './pages/Reports';

export default [
    {
        name: 'Parámetros comité',
        type: 'menu',
        visible: true,
        routes: [
            {
                name: 'Plantillas de actas',
                path: '/act-templates',
                visible: true,
                component: ActTemplates,
                permission: 'list_act_template'
            },
            {
                name: 'Parámetros de acta',
                path: '/committee-parameters',
                visible: true,
                component: CommitteeParameters,
                permission: 'list_committee_parameter'
            },
            {
                name: 'Parámetros generales',
                path: '/general-parameters',
                visible: true,
                component: GeneralParameters,
                permission: 'list_general_parameter'
            },
            {
                name: 'Sanciones',
                path: '/sanctions',
                visible: true,
                component: Sanctions,
                permission: 'list_sanction'
            },
            {
                name: 'Medidas formativas',
                path: '/formative-measures',
                visible: true,
                component: FormativeMeasures,
                permission: 'list_formative_measure'
            },
            {
                name: 'Clasificacion de las faltas',
                path: '/infringement-classifications',
                visible: true,
                component: InfringementClassifications,
                permission: 'list_infringement_classification'
            },
            {
                name: 'Tipos de faltas',
                path: '/infringement-types',
                visible: true,
                component: InfringementTypes,
                permission: 'list_infringement_type'
            },
            {
                name: 'Tipos de novedades',
                path: '/novelty-types',
                visible: true,
                component: NoveltyTypes,
                permission: 'list_novelty_type'
            },
        ]
    },
    {
        name: 'Parámetros generales',
        type: 'menu',
        visible: true,
        routes: [
            {
                name: 'Cargos',
                path: '/positions',
                visible: true,
                component: Positions,
                permission: 'list_position'
            },
            {
                name: 'Tipos de contratos',
                path: '/contract-types',
                visible: true,
                component: ContractTypes,
                permission: 'list_contract_type'
            },
            {
                name: 'Modalidades',
                path: '/modalities',
                visible: true,
                component: Modalities,
                permission: 'list_modality'
            },
            {
                name: 'Programas de formacion',
                path: '/formation-programs',
                visible: true,
                component: FormationPrograms,
                permission: 'list_formation_program'
            },
            {
                name: 'Tipos de programas de formacion',
                path: '/formation-program-types',
                visible: true,
                component: FormationProgramTypes,
                permission: 'list_formation_program_type'
            },
        ]
    },
    {
        name: 'Aprendices',
        path: '/learners',
        visible: true,
        component: Learners,
        permission: 'list_learner'
    },
    {
        name: 'Grupos',
        path: '/groups',
        visible: true,
        component: Groups,
        permission: 'list_group'
    },
    {
        name: 'Comités',
        path: '/committees',
        visible: true,
        component: Committees,
        permission: 'list_committee'
    },
    {
        name: 'Committee',
        path: '/committees/:id',
        visible: false,
        component: Committee,
        permission: 'list_committee'
    },
    {
        name: 'Committee',
        path: '/committees/:id/committee-session/:id',
        visible: false,
        component: CommitteeSession,
        permission: 'list_committee'
    },
    {
        name: 'Novedades del aprendiz',
        path: '/learner-novelties',
        visible: true,
        component: LearnerNovelties,
        permission: 'list_learner_novelty'
    },
    {
        name: 'Responsables de medida formativa',
        path: '/formative-measure-responsibles',
        visible: true,
        component: ResponsiblesFormativeMeasures,
        permission: 'list_formative_measure_responsible'
    },
    {
        name: 'Create Rol',
        path: '/roles/create',
        visible: false,
        component: CreateRol,
        permission: 'create_role'
    },
    {
        name: 'Edit Rol',
        path: '/roles/edit/:id',
        visible: false,
        component: EditRol,
        permission: 'edit_role'
    },

]
