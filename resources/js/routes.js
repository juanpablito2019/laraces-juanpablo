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
        visible: true,
        routes: [
            {
                name: 'Plantillas de actas',
                path: '/act-templates',
                visible: true,
                component: ActTemplates
            },
            {
                name: 'Parámetros de acta',
                path: '/committee-parameters',
                visible: true,
                component: CommitteeParameters
            },
            {
                name: 'Parámetros generales',
                path: '/general-parameters',
                visible: true,
                component: GeneralParameters
            },
            {
                name: 'Sanciones',
                path: '/sanctions',
                visible: true,
                component: Sanctions
            },
            {
                name: 'Medidas formativas',
                path: '/formative-measures',
                visible: true,
                component: FormativeMeasures
            },
            {
                name: 'Clasificacion de las faltas',
                path: '/infringement-classifications',
                visible: true,
                component: InfringementClassifications
            },
            {
                name: 'Tipos de faltas',
                path: '/infringement-types',
                visible: true,
                component: InfringementTypes
            },
            {
                name: 'Tipos de novedades',
                path: '/novelty-types',
                visible: true,
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
                visible: true,
                component: Positions
            },
            {
                name: 'Tipos de contratos',
                path: '/contract-types',
                visible: true,
                component: ContractTypes
            },
            {
                name: 'Modalidades',
                path: '/modalities',
                visible: true,
                component: Modalities
            },
            {
                name: 'Programas de formacion',
                path: '/formation-programs',
                visible: true,
                component: FormationPrograms
            },
            {
                name: 'Tipos de programas de formacion',
                path: '/formation-program-types',
                visible: true,
                component: FormationProgramTypes
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
        component: Groups
    },
    {
        name: 'Comités',
        path: '/committees',
        visible: true,
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
        visible: true,
        component: LearnerNovelties
    },
    {
        name: 'Responsables de medida formativa',
        path: '/formative-measure-responsibles',
        visible: true,
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
