import React, { Component } from 'react';
import { getAllCommittes, getAllStimulus } from '../containers/User';
import Loader from '../components/Loader';

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            allCommittes: [],
            allStimulus: [],
            allSanctions: [],
            allFormativeMeasures: [],
        }
        this.handleModalstimuli = this.handleModalstimuli.bind(this);
        this.handleModalsanction = this.handleModalsanction.bind(this);
        this.handleModalFormativeMeasure = this.handleModalFormativeMeasure.bind(this);
    }

    async getCommittes() {
        let data = await getAllCommittes();
        let sanctions = data.filter(session => session.sanction != null);
        this.setState({ allSanctions: sanctions });
        let formativeMeasure = data.filter(session => session.responsibles.length > 0);
        this.setState({ allFormativeMeasures: formativeMeasure });
    }

    async getStimulus() {
        let data = await getAllStimulus();
        this.setState({ allStimulus: data });
        $('table.display').DataTable({
            language:{
                url: 'https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
            },
            info: false,
        });
    }

    handleModalstimuli() {
        $('.modal.stimuli').find('.modal-title').text('Estimulos');
        $('.modal.stimuli').modal('toggle');
    }

    handleModalsanction() {
        $('.modal.sanction').find('.modal-title').text('Aprendices con sanciones');
        $('.modal.sanction').modal('toggle');
    }

    handleModalFormativeMeasure() {
        $('.modal.formativeMeasure').find('.modal-title').text('Planes de mejoramiento');
        $('.modal.formativeMeasure').modal('toggle');
    }

    componentDidMount() {
        this.getCommittes();
        this.getStimulus();
    }

    render() {
        if (!this.state.allStimulus || !this.state.allCommittes || !this.state.allSanctions) {
            return <Loader />
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Reportes</h3>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 col-md-6 col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <h4>Estimulos</h4>
                                <p>Aprendices que destacaron por su buen comportamiento</p>
                                <a onClick={this.handleModalstimuli} className="btn btn-outline-primary">Detalle</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 mt-3 mt-md-0 mt-lg-0">
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
                    <div className="col-12 col-md-6 col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <h4>Planes de mejoramiento</h4>
                                <p>Aprendices con plan de mejoramiento en proceso</p>
                                <a onClick={this.handleModalFormativeMeasure} className="btn btn-outline-primary">Detalle</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 mt-3 mt-md-0 mt-lg-0">
                        <div className="card">
                            <div className="card-body">
                                <h4>Cuarto</h4>
                                <p>Cuarto reporte</p>
                                <a className="btn btn-outline-primary">Detalle</a>
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
                                <table className="display table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Aprendiz</th>
                                            <th>Grupo</th>
                                            <th className="hide">Programa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.allStimulus.length > 0 ? (
                                        this.state.allStimulus.map(allstimulu => (
                                            <tr key={allstimulu.id}>
                                                <td>{allstimulu.learner.name}</td>
                                                <td>{allstimulu.learner.group.code_tab}</td>
                                                <td className="hide">{allstimulu.learner.group.formation_program.name}</td>
                                            </tr>
                                        )) ) : (
                                            <tr className="col">
                                                <td>No hay datos disponibles</td>
                                            </tr>
                                        )}
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
                                <table className="display table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Aprendiz</th>
                                            <th className="hide">Grupo</th>
                                            <th className="hide">Programa</th>
                                            <th>Sanción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.allSanctions.length > 0 ? (
                                        this.state.allSanctions.map(allSanction => (
                                            <tr key={allSanction.id}>
                                                <td>{allSanction.learner.name}</td>
                                                <td className="hide">{allSanction.learner.group.code_tab}</td>
                                                <td className="hide">{allSanction.learner.group.formation_program.name}</td>
                                                <td>{allSanction.sanction.name}</td>
                                            </tr>
                                        ))) : (
                                            <tr className="col">
                                                <td>No hay datos disponibles</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal Formative Measures */}
                <div className="modal formativeMeasure fade" data-backdrop="static" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <table className="display table table-hover">
                                    <thead>
                                        <tr>
                                            <th className="hide">Fecha comité</th>
                                            <th>Aprendiz</th>
                                            <th>Medida formativa</th>
                                            <th className="hide">Responsable</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.allFormativeMeasures.length > 0 ? (
                                        this.state.allFormativeMeasures.map(allFormativeMeasure => (
                                            <tr key={allFormativeMeasure.id}>
                                                <td className="hide">{allFormativeMeasure.committee.date}</td>
                                                <td>{allFormativeMeasure.learner.name}</td>
                                                <td>{allFormativeMeasure.responsibles.length > 0 ? (
                                                        allFormativeMeasure.responsibles.map(responsible => (
                                                            `${responsible.pivot.formative_measure.name}`
                                                        ))
                                                    ) : (<h6 className="text-primary">Aun no se han asignado medidas formativas para este aprendiz</h6>)}
                                                </td>
                                                <td className="hide">{allFormativeMeasure.responsibles.length > 0 ? (
                                                        allFormativeMeasure.responsibles.map(responsible => (
                                                            `${responsible.username}`
                                                        ))
                                                    ) : (<h6 className="text-primary">Aun no se han asignado medidas formativas para este aprendiz</h6>)}
                                                </td>
                                            </tr>
                                        ))) : (
                                            <tr className="col">
                                                <td>No hay datos disponibles</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
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
