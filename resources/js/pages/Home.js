import React, { Component } from 'react';
import { getAllCommittes, getAllStimulus } from '../containers/User';
import LineChart from '../components/LineChart';
import DoughnutChart from '../components/DoughnutChart';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCommittes: [],
            allStimulus: [],
        }
    }

    async getCommittes() {
        let data = await getAllCommittes();
        this.setState({ allCommittes: data });
    }

    async getStimulus() {
        let data = await getAllStimulus();
        this.setState({ allStimulus: data });
    }

    componentDidMount() {
        this.getCommittes();
        this.getStimulus();
    }

    render() {
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Dashboard</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-6 mb-1">
                        <div className="card">
                            <div className="card-body">
                                <h5>Aprendices en comité</h5>
                                <LineChart
                                    label={'Aprendices en comite'}
                                    color={'rgba(255, 99, 132, 0.2)'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <h5>Comites por tipo de falta</h5>
                                <DoughnutChart
                                    label=""
                                />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-12 col-lg-6 mb-1">
                        <div className="card">
                            <div className="card-body">
                                <h5>Comites por tipo de falta</h5>
                                <DoughnutChart
                                    label=""
                                />
                            </div>
                        </div>

                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <h5>Aprendices por sus estimulos</h5>
                                <LineChart
                                    label={'Aprendices por estimulos'}
                                    color={'rgba(54, 162, 235, 0.2)'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }


}
export default Home;
