import Learners from "./pages/Learners";
import Sanctions from './pages/Sanctions';
import CommitteeParameters from "./pages/CommitteeParameters";
import CommitteeSessionTypes from './pages/CommitteeSessionTypes';
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
export default [
    {
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'Parámetros comité',
        type: 'menu',
        routes: [
            {
                name: 'Parametros de acta',
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
                component: Learners
            },
            {
                name: 'Tipos de faltas',
                path: '/infringement-types',
                component: Learners
            },
            {
                name: 'Tipos de novedades',
                path: '/novelty-types',
                component: Learners
            },
            {
                name: 'Tipos de casos',
                path: '/committee-session-types',
                component: CommitteeSessionTypes
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
        component: Learners
    },

    {
        name: 'Grupos',
        path: '/groups',
        component: Groups
    },


    {
        name: 'Comités',
        path: '/committees',
        component: Committees
    },

    {
        name: 'Novedades del aprendiz',
        path: '/learner-novelties',
        component: Learners
    },

    {
        name: 'Responsables de medida formativa',
        path: '/formative-measure-responsibles',
        component: ResponsiblesFormativeMeasures
    },
]
