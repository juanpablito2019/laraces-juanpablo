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
        routes: [
            {
                name: 'Parámetros de acta',
                path: '/committee-parameters',
                component: CommitteeParameters
            },
            {
                name: 'Sanciones',
                path: '/sanctions',
                component: Sanctions
            },
            {
                name: 'Medidas formativas',
                path: '/formative-measures',
                component: FormativeMeasures
            },
            {
                name: 'Clasificacion de las faltas',
                path: '/infringement-classifications',
                component: InfringementClassifications
            },
            {
                name: 'Tipos de faltas',
                path: '/infringement-types',
                component: InfringementTypes
            },
            {
                name: 'Tipos de novedades',
                path: '/novelty-types',
                component: NoveltyTypes
            },
        ]
    },
    {
        name: 'Parámetros generales',
        type: 'menu',
        routes: [
            {
                name: 'Cargos',
                path: '/positions',
                component: Positions
            },
            {
                name: 'Tipos de contratos',
                path: '/contract-types',
                component: ContractTypes
            },
            {
                name: 'Modalidades',
                path: '/modalities',
                component: Modalities
            },
            {
                name: 'Programas de formacion',
                path: '/formation-programs',
                component: FormationPrograms
            },
            {
                name: 'Tipos de programas de formacion',
                path: '/formation-program-types',
                component: FormationProgramTypes
            },
        ]
    },
    {
        name: 'Aprendices',
        path: '/learners',
        visible: true,
        component: Learners
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
]
