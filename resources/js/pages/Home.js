import React, {Component} from 'react';
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import moment from 'moment';


class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            committes: null,
            id: null,
            message: null,

        }
    }

    componentDidMount() {
        // this.getCommites();
    }

    render(){
        if (
            !this.state.committes
        ) {
            return <Loader />;
        }
        return (
            <>
                <div className="row">
                        <div className="col">
                                <h3>Comites agregados recientemente</h3>
                        </div>
                </div>
                <div className="row mt-3">
                    {this.state.committes.length > 0 ? (
                        this.state.committes.map((committe, i) => (
                            <div className="col-sm-12 col-md-6 col-lg-4" key={i}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <div className="card-title border-bottom">
                                                    <Link to={"/app/committees/"+committe.id}>
                                                        <h5>
                                                            {moment(committe.date).format('LL')}
                                                            {committe.id}
                                                        </h5>
                                                    </Link>
                                                </div>
                                                <div className="card-text">
                                                    <h6>
                                                        Numero de acta:{" "}
                                                        <span className="text-muted">
                                                            {committe.record_number}
                                                        </span>
                                                    </h6>
                                                    <h6>
                                                        Hora:{" "}
                                                        <span className="text-muted">
                                                            {moment(committe.start_hour, 'HH:mm').format('hh:mm A')} a {moment(committe.end_hour, 'HH:mm').format('hh:mm A')}
                                                        </span>
                                                    </h6>
                                                    <h6>
                                                        Lugar:{" "}
                                                        <span className="text-muted">
                                                            {committe.place}
                                                        </span>
                                                    </h6>
                                                    <h6 className="mb-3">
                                                        Centro de formacion:{" "}
                                                        <span className="text-muted">
                                                            {committe.formation_center}
                                                        </span>
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                            <div className="col">
                                <p>No hay datos disponibles</p>
                            </div>
                        )}
                </div>
                <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-6 mt-3">
                                <h3>Aprendices recientes en comites</h3>

                                <ul className="list-group ml-5 mr-5 mt-2">
                                    <li className="alert alert-primary">Juan carlos marin soto <span className="alert-warning"> ID 1835415 </span>  </li>

                                    <li className="alert alert-primary">Roberto carlos muñoz <span className="alert-warning"> ID 1835274 </span> </li>

                                    <li className="alert alert-primary">Santiago robledo <span className="alert-warning"> ID 1748562 </span>  </li>
                                </ul>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 mt-3">
                                <h3>Grupos</h3>

                                <canvas id="myChart" width="400" height="400"></canvas>
                        </div>
                </div>
            </>
        )
    }


}
export default Home;
