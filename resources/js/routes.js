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
import Rol from "./pages/CreateRoles";
import Profile from "./pages/Profile";

function hasPermission(permission){
    const permissions = localStorage.getItem('permissions');

    return true;
}

export default [

    {
        name: 'Home',
        path: '/',
        visible: true,
        component: Home
    },
    {
        name: 'Parámetros comité',
        type: 'menu',
        visible: hasPermission('list_committee_parameter'),
        routes: [
            {
                name: 'Plantillas de actas',
                path: '/act-templates',
                visible: hasPermission('list_act_template'),
                component: ActTemplates
            },
            {
                name: 'Parámetros de acta',
                path: '/committee-parameters',
                visible: hasPermission('list_committee_parameter'),
                component: CommitteeParameters
            },
            {
                name: 'Parámetros generales',
                path: '/general-parameters',
                visible: hasPermission('list_general_parameter'),
                component: GeneralParameters
            },
            {
                name: 'Sanciones',
                path: '/sanctions',
                visible: hasPermission('list_sanction'),
                component: Sanctions
            },
            {
                name: 'Medidas formativas',
                path: '/formative-measures',
                visible: hasPermission('list_formative_measure'),
                component: FormativeMeasures
            },
            {
                name: 'Clasificacion de las faltas',
                path: '/infringement-classifications',
                visible: hasPermission('list_infringement_classification'),
                component: InfringementClassifications
            },
            {
                name: 'Tipos de faltas',
                path: '/infringement-types',
                visible: hasPermission('list_infringement_type'),
                component: InfringementTypes
            },
            {
                name: 'Tipos de novedades',
                path: '/novelty-types',
                visible: hasPermission('list_novelty_type'),
                component: NoveltyTypes
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
                visible: hasPermission('list_position'),
                component: Positions
            },
            {
                name: 'Tipos de contratos',
                path: '/contract-types',
                visible: hasPermission('list_contract_type'),
                component: ContractTypes
            },
            {
                name: 'Modalidades',
                path: '/modalities',
                visible: hasPermission('list_modality'),
                component: Modalities
            },
            {
                name: 'Programas de formacion',
                path: '/formation-programs',
                visible: hasPermission('list_formation_program'),
                component: FormationPrograms
            },
            {
                name: 'Tipos de programas de formacion',
                path: '/formation-program-types',
                visible: hasPermission('list_formation_program_type'),
                component: FormationProgramTypes
            },
        ]
    },
    {
        name: 'Aprendices',
        path: '/learners',
        visible: hasPermission('list_learner'),
        component: Learners
    },
    {
        name: 'Grupos',
        path: '/groups',
        visible: hasPermission('list_group'),
        component: Groups
    },
    {
        name: 'Comités',
        path: '/committees',
        visible: hasPermission('list_committee'),
        component: Committees
    },
    {
        name: 'Committee',
        path: '/committees/:id',
        visible: false,
        component: Committee
    },
    {
        name: 'Committee',
        path: '/committees/:id/committee-session/:id',
        visible: false,
        component: CommitteeSession
    },
    {
        name: 'Novedades del aprendiz',
        path: '/learner-novelties',
        visible: hasPermission('list_learner_novelty'),
        component: LearnerNovelties
    },
    {
        name: 'Responsables de medida formativa',
        path: '/formative-measure-responsibles',
        visible: hasPermission('list_formative-measure-responsibles'),
        component: ResponsiblesFormativeMeasures
    },
    {
        name: 'Roles',
        path: '/roles/create',
        visible: false,
        component: Rol
    },
    {
        name: 'Profile',
        path: '/profile/:id',
        visible: false,
        component: Profile
    },

]
