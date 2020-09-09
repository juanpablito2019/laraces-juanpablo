import React, { Component } from 'react';
import { find } from '../containers/CommitteeSessions';
import { get as indexInfringementTypes } from '../containers/InfringementTypes';
import { get as indexInfringementClassifications } from '../containers/InfringementClassifications';
import { findActiveByState } from '../containers/ActTemplate';
import { save as saveCommunication, exportWord as exportWordCommunication } from '../containers/Communication';
import Loader from '../components/Loader';
import Ckeditor from '../components/Ckeditor';
import { param } from 'jquery';

class CommitteeSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            committeeSession: null,
            infringementTypes: null,
            infringementClassifications: null,
            communicationMessage: null,
            actCommunicationActive: null,
            exportCommunication: true
        }
        this.submitCommunication = this.submitCommunication.bind(this);
        this.exportCommunication = this.exportCommunication.bind(this);
    }

    async getCommitteeSession() {
        let data = await find(this.state.id);
        this.setState({ committeeSession: data });
    }
    async getInfringementTypes() {
        let data = await indexInfringementTypes();
        this.setState({ infringementTypes: data });
    }
    async getInfringementClassifications() {
        let data = await indexInfringementClassifications();
        this.setState({ infringementClassifications: data });
    }
    async getActCommunicationActive() {
        let data = await findActiveByState(1);
        this.setState({ actCommunicationActive: data });
        console.log(data);
    }
    async showHistory() {
        $('#learner-history').modal('toggle');
    }

    async submitCommunication(e) {
        e.preventDefault();
        let data = await saveCommunication(e.target, this.state.id);
        if (data.success) {
            toastr.success('', data.message, {
                closeButton: true
            });
            this.setState({ communicationMessage: null });
        } else {
            this.setState({ communicationMessage: data.message });
        }
    }

    async exportCommunication() {
        let res = await exportWordCommunication(this.state.id);
        let blob = await res.blob();
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = `Comunicacion - ${this.state.committeeSession.learner.name}.docx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    componentDidMount() {
        this.getCommitteeSession();
        this.getInfringementTypes();
        this.getInfringementClassifications();
        this.getActCommunicationActive();
    }
    render() {
        if (!this.state.committeeSession || !this.state.infringementTypes || !this.state.infringementClassifications || !this.state.actCommunicationActive) {
            return <Loader />
        }
        return (
            <>
                <div className="row">
                    <div className="col-3">
                        <div className="card">
                            <img src={this.state.committeeSession.learner.photo ? "/storage/" + this.state.committeeSession.learner.photo : '/img/no-photo.png'} alt="img-fluid" className="card-img-top" />
                            <div className="card-body">
                                <h5 className="text-primary">{this.state.committeeSession.learner.name}</h5>
                                <h6>{this.state.committeeSession.learner.document_type} {this.state.committeeSession.learner.document}</h6>
                                <h6>{this.state.committeeSession.learner.email}</h6>
                                <hr />
                                <h6>Grupo: <span className="text-primary">{this.state.committeeSession.learner.group.code_tab}</span></h6>
                                <h6>Programa: <span className="text-primary">{this.state.committeeSession.learner.group.formation_program.name}</span></h6>
                                <button onClick={this.showHistory} className="btn btn-block btn-outline-primary">Ver historial</button>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Comunicación</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Comité</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Acto sancionatorio</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                {this.state.communicationMessage ? (
                                    <div className="alert alert-primary mt-2" role="alert">
                                        {this.state.communicationMessage}
                                    </div>
                                ) : (
                                        <div className=""></div>
                                    )}
                                <form onSubmit={this.submitCommunication}>
                                    
                                    {this.state.actCommunicationActive.parameters.length > 0 ? (
                                        this.state.actCommunicationActive.parameters.map((parameter, i) => (
                                            <div key={i}>
                                                <div className="row mt-4" >
                                                    <div className="col">
                                                        <h6>
                                                            {parameter.name}
                                                        </h6>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <Ckeditor
                                                            name={"parameter_" + parameter.id}
                                                            id={"parameter_" + parameter.id}
                                                            d={this.state.committeeSession.committee_session_parameters.find(prm => prm.id == parameter.id) ? this.state.committeeSession.committee_session_parameters.find(prm => prm.id == parameter.id).pivot.description : parameter.content}
                                                            options={[
                                                                'heading',
                                                                'bold',
                                                                'italic',
                                                                'numberedList',
                                                                'bulletedList'
                                                            ]}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                            <div className="row mt-4">
                                                <div className="col">
                                                    <div className="alert alert-warning" role="alert">
                                                        Oops..., no hay parametros registrados para esta acta
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    <hr />
                                    <div className="row mt-4">
                                        <div className="col">
                                            <h6>
                                                TIPO DE FALTA
                                            </h6>
                                            {this.state.infringementTypes.length > 0 ? (
                                                this.state.infringementTypes.map((infringementType, i) => (
                                                    <div className="form-check" key={i}>
                                                        <input className="form-check-input" type="radio" name="infringement_type_id" id={"infringementType" + infringementType.id} value={infringementType.id} defaultChecked={this.state.committeeSession.infringement_type_id == infringementType.id ? true : false} />
                                                        <label className="form-check-label" htmlFor={"infringementType" + infringementType.id}>
                                                            {infringementType.name}
                                                        </label>
                                                    </div>
                                                ))
                                            ) : (
                                                    <p>No hay tipos de faltas disponibles</p>
                                                )}
                                        </div>
                                        <div className="col">
                                            <h6>
                                                CALIFICACIÓN PROVISIONAL DE LA(S) PROBABLE(S) FALTA(S)
                                            </h6>
                                            {this.state.infringementClassifications.length > 0 ? (
                                                this.state.infringementClassifications.map((infringementClassification, i) => (
                                                    <div className="form-check" key={i}>
                                                        <input className="form-check-input" type="radio" name="infringement_classification_id" id={"infringementClassification" + infringementClassification.id} value={infringementClassification.id} defaultChecked={this.state.committeeSession.infringement_classification_id == infringementClassification.id ? true : false} />
                                                        <label className="form-check-label" htmlFor={"infringementClassification" + infringementClassification.id}>
                                                            {infringementClassification.name}
                                                        </label>
                                                    </div>
                                                ))
                                            ) : (
                                                    <p>No hay clasificacion de faltas disponibles</p>
                                                )}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col">
                                            <h6>HORA DE CITACION</h6>
                                            <input
                                                type="time"
                                                name="start_hour"
                                                id="start_hour"
                                                className="form-control"
                                                defaultValue={this.state.committeeSession.start_hour}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col text-right">
                                            <button className="btn btn-outline-primary">Guardar</button>
                                            <button disabled={this.state.cannotExportCommunication} onClick={this.exportCommunication} type="button" className="btn btn-link"><i className="far fa-file-word"></i> Exportar</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
                            <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" tabIndex="-1" id="learner-history">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Historial</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#stimuli" role="tab" aria-controls="home" aria-selected="true">Estimulos</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#novelty" role="tab" aria-controls="profile" aria-selected="false">Novedades</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link" id="contact-tab" data-toggle="tab" href="#academic" role="tab" aria-controls="contact" aria-selected="false">Academicos</a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="stimuli" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row mt-3">
                                            {this.state.committeeSession.learner.stimuli.length > 0 ? (
                                                this.state.committeeSession.learner.stimuli.map((stimulus, i) => (
                                                    <div className="col-4" key={i}>
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <h5>{stimulus.stimulus}</h5>
                                                                <p>{stimulus.justification}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                    <div className="col">
                                                        <p>No tiene estimulos registrados</p>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="novelty" role="tabpanel" aria-labelledby="profile-tab">
                                        <div className="row mt-3">
                                            {this.state.committeeSession.learner.novelties.length > 0 ? (
                                                this.state.committeeSession.learner.novelties.map((novelty, i) => (
                                                    <div className="col-4" key={i}>
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <h5>{novelty.novelty_type_id}</h5>
                                                                <p>{novelty.justification}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                    <div className="col">
                                                        <p>No tiene novedades registradas</p>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="academic" role="tabpanel" aria-labelledby="contact-tab">
                                        <div className="row mt-3">
                                            {this.state.committeeSession.learner.academics.length > 0 ? (
                                                this.state.committeeSession.learner.academics.map((academic, i) => (
                                                    <div className="col-4" key={i}>
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <h5>{academic.id}</h5>
                                                                <p>{academic.learner_id}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                    <div className="col">
                                                        <p>No tiene novedades registradas</p>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default CommitteeSession;