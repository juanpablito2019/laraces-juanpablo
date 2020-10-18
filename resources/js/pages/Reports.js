import React, { Component } from 'react';
import { getReports } from '../containers/User';

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            dataReports: null
        }
    }

    async getReports() {
        let data = await getReports();
        this.setState({ dataReports : data });
    }

    componentDidMount() {
        this.getReports();
    }

    render() {
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Reportes</h3>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-6">
                        <div className="card">
                            <div className="card-body">
                                <h4>Novedades</h4>
                                <p>Cuantos y cuales estudiantes reportaron alguna novedad este año</p>
                                <a href="#" className="btn btn-outline-primary">Detalle</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="card">
                            <div className="card-body">
                                <h4>Recomendados para estimulos</h4>
                                <p>Estudiantes que destacaron por su buen comportamiento</p>
                                <a href="#" className="btn btn-outline-primary">Detalle</a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Reports;