import React, { Component } from 'react';
import { getAllCommittes, getAllStimulus, getAllSanction } from '../containers/User';
import DataTable from '../components/DataTable';

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            allCommittes: [],
            allStimulus: [],
            allSanctions: [],
        }
        this.handleModalstimuli = this.handleModalstimuli.bind(this);
        this.handleModalsanction = this.handleModalsanction.bind(this);
        this.handleModalgroup = this.handleModalgroup.bind(this);
    }

    async getCommittes() {
        this.setState({ allCommittes: [] });
        let data = await getAllCommittes();
        this.setState({ allCommittes: data });
    }

    async getStimulus() {
        this.setState({ allStimulus: [] });
        let data = await getAllStimulus();
        this.setState({ allStimulus: data });
    }

    async getSanction() {
        this.setState({ allSanctions: [] });
        let data = await getAllSanction();
        console.log(data);
        this.setState({ allSanctions: data });
    }

    handleModalstimuli() {
        $('.modal.stimuli').find('.modal-title').text('Aprendices recomendados para Estimulos');
        $('.modal.stimuli').modal('toggle');
    }

    handleModalsanction() {
        $('.modal.sanction').find('.modal-title').text('Aprendices con sanciones');
        $('.modal.sanction').modal('toggle');
    }

    handleModalgroup() {
        $('.modal.group').find('.modal-title').text('Grupos asociados a comité');
        $('.modal.group').modal('toggle');
    }

    componentDidMount() {
        this.getCommittes();
        this.getStimulus();
        this.getSanction();
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
                                <h4>Recomendados para estimulos</h4>
                                <p>Aprendices que destacaron por su buen comportamiento</p>
                                <a onClick={this.handleModalstimuli} className="btn btn-outline-primary">Detalle</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="card">
                            <div className="card-body">
                                <h4>Sanciones</h4>
                                <p>Aprendices que tienen procesos de sancion en espera</p>
                                <a onClick={this.handleModalsanction} className="btn btn-outline-primary">Detalle</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-6">
                        <div className="card">
                            <div className="card-body">
                                <h4>Grupos</h4>
                                <p>Grupos mas candidatos a comité</p>
                                <a onClick={this.handleModalgroup} className="btn btn-outline-primary">Detalle</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal Stimuli */}
                <div className="modal stimuli fade" data-backdrop="static" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th className="hide">Aprendiz</th>
                                            <th>Grupo</th>
                                            <th className="hide">Programa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        {this.state.allStimulus.map(allstimulu => (
                                            <tr key={allstimulu.id}>
                                                <td>{allstimulu.learner.name}</td>
                                                <td>{allstimulu.learner.group.code_tab}</td>
                                                <td>{allstimulu.learner.group.formation_program.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal Sanction */}
                <div className="modal sanction fade" data-backdrop="static" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th className="hide">Aprendiz</th>
                                            <th>Grupo</th>
                                            <th className="hide">Programa</th>
                                            <th>Sanción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        {this.state.allSanctions.map(allSanction => (
                                            <tr key={allSanction.id}>
                                                <td>{allSanction.learner.name}</td>
                                                <td>{allSanction.learner.group.code_tab}</td>
                                                <td>{allSanction.learner.group.formation_program.name}</td>
                                                <td>{allSanction.sanction.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>    
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal Groups */}
                <div className="modal group fade" data-backdrop="static" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                               
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Reports;