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




    function permission(name) {
        var arreglo = new Array;
        var permis = new Array;


        const getPemissionsByRoles = async ()=>{
            let data = await fetch('/userPermissions');
            let res = await data.json();

            res.permissions.map(permiso =>{
                permis.push(permiso.name)
            })

            localStorage.setItem( "permis", JSON.stringify( permis));

            if(res.superAdmin == true){
                localStorage.setItem( "rol_id", JSON.stringify( 1 ) ) ;
            }else{
                localStorage.setItem( "rol_id", JSON.stringify( 2 ) ) ;
            }


            arreglo = JSON.parse(localStorage.getItem( "permis"));


        }

        getPemissionsByRoles();

        arreglo = JSON.parse(localStorage.getItem( "permis"));
        var rol_id = JSON.parse(localStorage.getItem( "rol_id"));
        var bool;

        if(rol_id == 1){
            bool = true
        }


        if(arreglo){

            arreglo.map(element => {

                if(name == element){
                    bool = true
                }
            });

        }

        return bool

    }

    permission('name');



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
        visible:  true,
        routes: [
            {
                name: 'Plantillas de actas',
                path: '/act-templates',
                visible: permission('list_act_template'),
                component: ActTemplates
            },
            {
                name: 'Parámetros de acta',
                path: '/committee-parameters',
                visible: permission('list_committee_parameter'),
                component: CommitteeParameters
            },
            {
                name: 'Parámetros generales',
                path: '/general-parameters',
                visible: permission('list_general_parameter'),
                component: GeneralParameters
            },
            {
                name: 'Sanciones',
                path: '/sanctions',
                visible: permission('list_sanction'),
                component: Sanctions
            },
            {
                name: 'Medidas formativas',
                path: '/formative-measures',
                visible: permission('list_formative_measure'),
                component: FormativeMeasures
            },
            {
                name: 'Clasificacion de las faltas',
                path: '/infringement-classifications',
                visible:  permission('list_infringement_classification'),
                component: InfringementClassifications
            },
            {
                name: 'Tipos de faltas',
                path: '/infringement-types',
                visible: permission('list_infringement_type'),
                component: InfringementTypes
            },
            {
                name: 'Tipos de novedades',
                path: '/novelty-types',
                visible: permission('list_novelty_type'),
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
                visible: permission('list_position'),
                component: Positions
            },
            {
                name: 'Tipos de contratos',
                path: '/contract-types',
                visible: permission('list_contract_type'),
                component: ContractTypes
            },
            {
                name: 'Modalidades',
                path: '/modalities',
                visible: permission('list_modality'),
                component: Modalities
            },
            {
                name: 'Programas de formacion',
                path: '/formation-programs',
                visible: permission('list_formation_program'),
                component: FormationPrograms
            },
            {
                name: 'Tipos de programas de formacion',
                path: '/formation-program-types',
                visible: permission('list_formation_program_type'),
                component: FormationProgramTypes
            },
        ]
    },
    {
        name: 'Aprendices',
        path: '/learners',
        visible: permission('list_learner'),
        component: Learners
    },
    {
        name: 'Grupos',
        path: '/groups',
        visible: permission('list_group'),
        component: Groups
    },
    {
        name: 'Comités',
        path: '/committees',
        visible: permission('list_committee'),
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
        visible: permission('list_learner_novelty'),
        component: LearnerNovelties
    },
    {
        name: 'Responsables de medida formativa',
        path: '/formative-measure-responsibles',
        visible: permission('list_formative-measure-responsibles'),
        component: ResponsiblesFormativeMeasures
    },
    {
        name: 'Roles',
        path: '/roles/create',
        visible: false,
        component: Rol
    },

]
