import React, { Component } from "react";
import { find } from "../containers/Committees";
import {
    store as storeStimulus,
    get as fetchStimuli,
    rules as stimuliRules,
} from "../containers/Stimuli";
import {
    rules as noveltiesRules,
    store as storeNovelty,
    get as fetchLearnerNovelties,
} from "../containers/LearnerNovelties";
import {
    rules as academicsRules,
    store as storeAcademic,
} from "../containers/CommitteeSessions";
import Loader from "../components/Loader";
import moment from "moment";
import StimuliForm from "../forms/Committee/StimuliForm";
import NoveltyForm from "../forms/Committee/NoveltyForm";
import AcademicForm from "../forms/Committee/AcademicForm";
import DataTable from "../components/DataTable";
import { validate, formValid, setRules } from "../containers/Validator";

class Committee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            committee: null,
            committee_session_type: null,
            stimuli: null,
            learnerNovelties: null,
            message: null,
            stimuliRules,
            noveltiesRules,
            academicsRules,
        };

        this.handleCommitteeSessionType = this.handleCommitteeSessionType.bind(
            this
        );
        this.handleModal = this.handleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.selectLearner = this.selectLearner.bind(this);
    }

    async getCommittee() {
        let data = await find(this.state.id);
        this.setState({ committee: data });
    }
    async getStimuli() {
        this.setState({ stimuli: null });
        let data = await fetchStimuli(this.state.id);
        this.setState({ stimuli: data });
    }
    async getLearnerNovelties() {
        this.setState({ learnerNovelties: null });
        let data = await fetchLearnerNovelties(this.state.id);
        this.setState({ learnerNovelties: data });
    }

    handleCommitteeSessionType(e) {
        let { value } = e.target;
        this.setState({ committee_session_type: value });
    }

    handleModal() {
        setRules(stimuliRules);
        this.setState({ committee_session_type: null });
        $(".modal")
            .find(".modal-title")
            .text("Agregar caso");
        $(".modal").modal("toggle");
    }

    selectLearner(value) {
        if (this.state.committee_session_type == 1) {
            stimuliRules.learner_id.isInvalid = false;
        } else if (this.state.committee_session_type == 2) {
            noveltiesRules.learner_id.isInvalid = false;
        } else {
        }
    }

    handleInput(e) {
        let { name, value } = e.target;
        if (this.state.committee_session_type == 1) {
            let nextRules = validate(name, value, stimuliRules);
            this.setState({ stimuliRules: nextRules });
        } else if (this.state.committee_session_type == 2) {
            let nextRules = validate(name, value, noveltiesRules);
            this.setState({ noveltiesRules: nextRules });
        } else {
            let nextRules = validate(name, value, academicsRules);
            this.setState({ academicsRules: nextRules });
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (this.state.committee_session_type == 1) {
            if (formValid(stimuliRules)) {
                let data = await storeStimulus(e.target);
                if (data.success) {
                    $(".modal").modal("toggle");
                    await this.getStimuli();
                } else {
                    console.log(data);
                }
            } else {
                this.setState({ message: "Por favor complete el formulario" });
            }
        } else if (this.state.committee_session_type == 2) {
            if (formValid(noveltiesRules)) {
                let data = await storeNovelty(e.target);
                if (data.success) {
                    $(".modal").modal("toggle");
                    await this.getLearnerNovelties();
                } else {
                    console.log(data);
                }
            } else {
                this.setState({ message: "Por favor complete el formulario" });
            }
        } else {
            if (formValid(academicsRules)) {
                let data = await storeAcademic(e.target);
                console.log(data);
            }
        }
    }

    componentDidMount() {
        this.getCommittee();
        this.getStimuli();
        this.getLearnerNovelties();
    }

    render() {
        if (
            !this.state.committee ||
            !this.state.stimuli ||
            !this.state.learnerNovelties
        ) {
            return <Loader />;
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h4 className="text-primary">
                            {moment(this.state.committee.date).format("LL")}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a
                                    className="nav-link active"
                                    id="detail-tab"
                                    data-toggle="tab"
                                    href="#detail"
                                    role="tab"
                                    aria-controls="home"
                                    aria-selected="true"
                                >
                                    Detalle
                                </a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a
                                    className="nav-link"
                                    id="cases-tab"
                                    data-toggle="tab"
                                    href="#committee_sessions"
                                    role="tab"
                                    aria-controls="profile"
                                    aria-selected="false"
                                >
                                    Casos a tratar{" "}
                                    <span className="badge badge-primary">
                                        {this.state.stimuli.length +
                                            this.state.learnerNovelties.length}
                                    </span>
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div
                                className="tab-pane fade show active"
                                id="detail"
                                role="tabpanel"
                                aria-labelledby="home-tab"
                            >
                                <div className="row mt-3">
                                    <div className="col">
                                        <h5>Numero de acta</h5>
                                        <p>
                                            {this.state.committee.record_number}
                                        </p>
                                        <h5>Fecha</h5>
                                        <p>
                                            {moment(
                                                this.state.committee.date
                                            ).format("LL")}
                                        </p>
                                        <h5>Hora </h5>
                                        <p>
                                            {moment(
                                                this.state.committee.start_hour,
                                                "HH:mm"
                                            ).format("hh:mm A")}{" "}
                                            a{" "}
                                            {moment(
                                                this.state.committee.end_hour,
                                                "HH:mm"
                                            ).format("hh:mm A")}
                                        </p>
                                        <h5>Lugar </h5>
                                        <p>{this.state.committee.place}</p>
                                        <h5>Centro de formacion </h5>
                                        <p>
                                            {
                                                this.state.committee
                                                    .formation_center
                                            }
                                        </p>
                                        <h5>Subdirector </h5>
                                        <p>
                                            {
                                                this.state.committee
                                                    .subdirector_name
                                            }
                                        </p>
                                        <h5>Qourum </h5>
                                        <p>
                                            {this.state.committee.qourum == 1
                                                ? "Si"
                                                : "No"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="committee_sessions"
                                role="tabpanel"
                                aria-labelledby="profile-tab"
                            >
                                <div className="row mt-3">
                                    <div className="col">
                                        <a href="#" onClick={this.handleModal}>
                                            <i
                                                className="fa fa-plus"
                                                aria-hidden="true"
                                            ></i>{" "}
                                            Agregar caso
                                        </a>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <DataTable>
                                            <thead>
                                                <tr>
                                                    <th>Documento</th>
                                                    <th>Aprendiz</th>
                                                    <th>Tipo de caso</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.stimuli.map(
                                                    (stimulus, i) => (
                                                        <tr key={i}>
                                                            <td>
                                                                {
                                                                    stimulus
                                                                        .learner
                                                                        .document_type
                                                                }{" "}
                                                                {
                                                                    stimulus
                                                                        .learner
                                                                        .document
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    stimulus
                                                                        .learner
                                                                        .name
                                                                }
                                                            </td>
                                                            <td>
                                                                Estimulos e
                                                                incentivos
                                                            </td>
                                                            <td>
                                                                <div
                                                                    className="btn-group"
                                                                    role="group"
                                                                    aria-label="Basic example"
                                                                >
                                                                    <button
                                                                        data-id={
                                                                            stimulus.id
                                                                        }
                                                                        className="btn btn-sm btn-outline-primary"
                                                                    >
                                                                        Editar
                                                                    </button>
                                                                    <button
                                                                        data-id={
                                                                            stimulus.id
                                                                        }
                                                                        className="btn btn-sm btn-outline-primary"
                                                                    >
                                                                        Detalle
                                                                    </button>
                                                                    <button
                                                                        data-id={
                                                                            stimulus.id
                                                                        }
                                                                        className="btn btn-sm btn-outline-danger"
                                                                    >
                                                                        Eliminar
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                                {this.state.learnerNovelties.map(
                                                    (learnerNovelty, i) => (
                                                        <tr key={i}>
                                                            <td>
                                                                {
                                                                    learnerNovelty
                                                                        .learner
                                                                        .document_type
                                                                }{" "}
                                                                {
                                                                    learnerNovelty
                                                                        .learner
                                                                        .document
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    learnerNovelty
                                                                        .learner
                                                                        .name
                                                                }
                                                            </td>
                                                            <td>
                                                                Novedades del
                                                                aprendiz
                                                            </td>
                                                            <td>
                                                                <div
                                                                    className="btn-group"
                                                                    role="group"
                                                                    aria-label="Basic example"
                                                                >
                                                                    <button
                                                                        data-id={
                                                                            learnerNovelty.id
                                                                        }
                                                                        className="btn btn-sm btn-outline-primary"
                                                                    >
                                                                        Editar
                                                                    </button>
                                                                    <button
                                                                        data-id={
                                                                            learnerNovelty.id
                                                                        }
                                                                        className="btn btn-sm btn-outline-primary"
                                                                    >
                                                                        Detalle
                                                                    </button>
                                                                    <button
                                                                        data-id={
                                                                            learnerNovelty.id
                                                                        }
                                                                        className="btn btn-sm btn-outline-danger"
                                                                    >
                                                                        Eliminar
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </DataTable>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="modal fade"
                    tabIndex="-1"
                    data-backdrop="static"
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-check form-check-inline" >
                                    <input
                                        className="form-check-input"
                                        onClick={
                                            this.handleCommitteeSessionType
                                        }
                                        type="radio"
                                        name="inlineRadioOptions"
                                        id="radio1"
                                        value={1}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="radio1"
                                    >
                                        Estimulos e incentivos
                                    </label>
                                </div>
                                <div className="form-check form-check-inline" >
                                    <input
                                        className="form-check-input"
                                        onClick={
                                            this.handleCommitteeSessionType
                                        }
                                        type="radio"
                                        name="inlineRadioOptions"
                                        id="radio2"
                                        value={2}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="radio2"
                                    >
                                        Novedades del aprendiz
                                    </label>
                                </div>
                                <div className="form-check form-check-inline" >
                                    <input
                                        className="form-check-input"
                                        onClick={
                                            this.handleCommitteeSessionType
                                        }
                                        type="radio"
                                        name="inlineRadioOptions"
                                        id="radio3"
                                        value={3}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="radio3"
                                    >
                                        Academicos disciplinarios
                                    </label>
                                </div>

                                {this.state.committee_session_type ? (
                                    <div className="row mt-2">
                                        <div className="col">
                                            {this.state.message ? (
                                                <div
                                                    className="alert alert-info"
                                                    role="alert"
                                                >
                                                    <span>
                                                        <i
                                                            className="fa fa-info-circle"
                                                            aria-hidden="true"
                                                        ></i>{" "}
                                                        {this.state.message}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className=""></div>
                                            )}
                                            {this.state
                                                .committee_session_type == 1 ? (
                                                <StimuliForm
                                                    onSubmit={this.handleSubmit}
                                                    committee={this.state.id}
                                                    rules={
                                                        this.state.stimuliRules
                                                    }
                                                    handleInput={
                                                        this.handleInput
                                                    }
                                                    handleSelect={
                                                        this.selectLearner
                                                    }
                                                />
                                            ) : this.state
                                                  .committee_session_type ==
                                              2 ? (
                                                <NoveltyForm
                                                    onSubmit={this.handleSubmit}
                                                    committee={this.state.id}
                                                    rules={
                                                        this.state
                                                            .noveltiesRules
                                                    }
                                                    handleInput={
                                                        this.handleInput
                                                    }
                                                    handleSelect={
                                                        this.selectLearner
                                                    }
                                                />
                                            ) : (
                                                <AcademicForm
                                                    onSubmit={this.handleSubmit}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Cerrar
                                </button>
                                <button form="form" className="btn btn-primary">
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Committee;
