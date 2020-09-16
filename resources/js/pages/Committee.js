import React, { Component } from "react";
import { find } from "../containers/Committees";
import {
    store as storeStimulus,
    get as fetchStimuli,
    find as fetchStimulus,
    rules as stimuliRules,
    destroy as destroyStimulus,
    update as updateStimulus
} from "../containers/Stimuli";
import {
    rules as noveltiesRules,
    store as storeNovelty,
    get as fetchLearnerNovelties,
    find as fetchLearnerNovelty,
    destroy as destroyLearnerNovelty,
    update as updateLearnerNovelty
} from "../containers/LearnerNovelties";
import {
    rules as academicsRules,
    store as storeAcademic,
    find as fetchAcademic,
    destroy as destroyAcademic,
    update as updateAcademic
} from "../containers/CommitteeSessions";

import Loader from "../components/Loader";
import moment from "moment";
import StimuliForm from "../forms/Committee/StimuliForm";
import NoveltyForm from "../forms/Committee/NoveltyForm";
import AcademicForm from "../forms/Committee/AcademicForm";
import DataTable from "../components/DataTable";
import { validate, formValid, setRules } from "../containers/Validator";
import { Link } from "react-router-dom";

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
            stimulus: null,
            learnerNovelty: null,
            academic: null
        };

        this.handleCommitteeSessionType = this.handleCommitteeSessionType.bind(
            this
        );
        this.handleModal = this.handleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.selectLearner = this.selectLearner.bind(this);
        this.handleDeleteAcademic = this.handleDeleteAcademic.bind(this);
        this.handleDeleteLearnerNovelty = this.handleDeleteLearnerNovelty.bind(this);
        this.handleDeleteStimulus = this.handleDeleteStimulus.bind(this);
        this.handleEditStimulus = this.handleEditStimulus.bind(this);
        this.handleUpdateStimulus = this.handleUpdateStimulus.bind(this);
        this.handleInputStimulus = this.handleInputStimulus.bind(this);
        this.handleEditLearnerNovelty = this.handleEditLearnerNovelty.bind(this);
        this.handleUpdateLearnerNovelty = this.handleUpdateLearnerNovelty.bind(this);
        this.handleInputLearnerNovelty = this.handleInputLearnerNovelty.bind(this);
        this.handleEditAcademic = this.handleEditAcademic.bind(this);
        this.handleUpdateAcademic = this.handleUpdateAcademic.bind(this);
        this.handleInputAcademic = this.handleInputAcademic.bind(this);

    }

    async getCommittee() {
        this.setState({ committee: null });
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
        $("#modal-add")
            .find(".modal-title")
            .text("Agregar caso");
        $("#modal-add").modal("toggle");
    }

    async handleModalStimuli(e) {
        let id = $(e.target).data('id');
        let data = await fetchStimulus(id);
        $('#modal-stimuli-novelty').find('.modal-title').text('Detalle del estimulo');
        $('#modal-stimuli-novelty').find('#learner_name').text(data.learner.name);
        if (data.learner.photo) {
            $('#learner_photo').attr('src', "/storage/" + data.learner.photo);
        }
        $('#modal-stimuli-novelty').find('#learner_email').text(data.learner.email);
        $('#modal-stimuli-novelty').find('#learner_document').text(`${data.learner.document_type} ${data.learner.document}`);
        $('#modal-stimuli-novelty').find('#learner_group').text(`Grupo: ${data.learner.group.code_tab}`);
        $('#modal-stimuli-novelty').find('#learner_formation_program').text(data.learner.group.formation_program.name);
        $('#modal-stimuli-novelty').find('#case_type').text('Estimulo');
        $('#modal-stimuli-novelty').find('#case_type_text').text(data.stimulus);
        $('#modal-stimuli-novelty').find('#justification').text(data.justification);
        $('#modal-stimuli-novelty').modal('toggle');
    }
    async handleDeleteStimulus(e) {
        let id = $(e.target).data('id');
        let res = confirm('¿Estas seguro que deseas eliminar este elemento?');
        if (res) {
            let data = await destroyStimulus(id);
            if (data.success) {
                await this.getStimuli();
            }
        }
    }

    async handleEditStimulus(e) {
        let id = $(e.target).data('id');
        let data = await fetchStimulus(id);
        this.setState({ stimulus: data });
        setRules(stimuliRules, false);
        $('#stimulus-edit').modal('toggle');
    }

    async handleUpdateStimulus(e) {
        e.preventDefault();
        if (formValid(stimuliRules)) {
            let data = await updateStimulus(e.target, this.state.stimulus.id);
            if (data.success) {
                $('#stimulus-edit').modal('toggle');
                await this.getStimuli();
            } else {
                console.log(data);
            }
        } else {
            this.setState({ message: 'Por favor completa el formulario' });
        }
    }

    async handleModalNovelty(e) {
        let id = $(e.target).data('id');
        let data = await fetchLearnerNovelty(id);
        $('#modal-stimuli-novelty').find('.modal-title').text('Detalle del estimulo');
        $('#modal-stimuli-novelty').find('#learner_name').text(data.learner.name);
        if (data.learner.photo) {
            $('#learner_photo').attr('src', "/storage/" + data.learner.photo);
        }
        $('#modal-stimuli-novelty').find('#learner_email').text(data.learner.email);
        $('#modal-stimuli-novelty').find('#learner_document').text(`${data.learner.document_type} ${data.learner.document}`);
        $('#modal-stimuli-novelty').find('#learner_group').text(`Grupo: ${data.learner.group.code_tab}`);
        $('#modal-stimuli-novelty').find('#learner_formation_program').text(data.learner.group.formation_program.name);
        $('#modal-stimuli-novelty').find('#case_type').text('Tipo de novedad');
        $('#modal-stimuli-novelty').find('#case_type_text').text(data.novelty_type.name);
        $('#modal-stimuli-novelty').find('#justification').text(data.justification);
        $('#modal-stimuli-novelty').modal('toggle');
    }
    async handleDeleteLearnerNovelty(e) {
        let id = $(e.target).data('id');
        let res = confirm('¿Estas seguro que deseas eliminar este elemento?');
        if (res) {
            let data = await destroyLearnerNovelty(id);
            if (data.success) {
                await this.getLearnerNovelties();
            }
        }
    }

    async handleEditLearnerNovelty(e) {
        let id = $(e.target).data('id');
        let data = await fetchLearnerNovelty(id);
        this.setState({ learnerNovelty: data });
        setRules(noveltiesRules, false);
        $('#learner-novelty-edit').modal('toggle');
    }

    async handleUpdateLearnerNovelty(e) {
        e.preventDefault();
        if (formValid(noveltiesRules)) {
            let data = await updateLearnerNovelty(e.target, this.state.learnerNovelty.id);
            if (data.success) {
                $('#learner-novelty-edit').modal('toggle');
                await this.getLearnerNovelties();
            } else {
                console.log(data);
            }
        } else {
            this.setState({ message: 'Por favor completa el formulario' });
        }
    }

    async handleDeleteAcademic(e) {
        let id = $(e.target).data('id');
        let res = confirm('¿Estas seguro que deseas eliminar este elemento?');
        if (res) {
            let data = await destroyAcademic(id);
            if (data.success) {
                await this.getCommittee();
            }
        }
    }
    async handleEditAcademic(e) {
        this.setState({academic: null});
        let id = $(e.target).data('id');
        let data = await fetchAcademic(id);
        this.setState({ academic: data });
        setRules(academicsRules, false);
        $('#academic-edit').modal('toggle');
    }

    async handleUpdateAcademic(e) {
        e.preventDefault();
        if (formValid(academicsRules)) {
            let data = await updateAcademic(e.target, this.state.academic.id);
            if (data.success) {
                $('#academic-edit').modal('toggle');
                await this.getCommittee();
            } else {
                console.log(data);
            }
        } else {
            this.setState({ message: 'Por favor completa el formulario' });
        }
    }


    selectLearner(value) {
        if (this.state.committee_session_type == 1) {
            stimuliRules.learner_id.isInvalid = false;
        } else if (this.state.committee_session_type == 2) {
            noveltiesRules.learner_id.isInvalid = false;
        } else {
            academicsRules.learner_id.isInvalid = false;
        }
    }

    handleInputStimulus(e) {
        let { name, value } = e.target;
        let nextRules = validate(name, value, stimuliRules);
        this.setState({ stimuliRules: nextRules });
    }
    handleInputLearnerNovelty(e) {
        let { name, value } = e.target;
        let nextRules = validate(name, value, noveltiesRules);
        this.setState({ noveltiesRules: nextRules });
    }
    handleInputAcademic(e) {
        let { name, value } = e.target;
        let nextRules = validate(name, value, academicsRules);
        this.setState({ academicsRules: nextRules });
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
                    $("#modal-add").modal("toggle");
                    setTimeout(async () => {
                        await this.getStimuli();
                    }, 200);
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
                    $("#modal-add").modal("toggle");
                    setTimeout(async () => {
                        await this.getLearnerNovelties();
                    }, 200);
                } else {
                    console.log(data);
                }
            } else {
                this.setState({ message: "Por favor complete el formulario" });
            }
        } else {
            if (formValid(academicsRules)) {
                let data = await storeAcademic(e.target);
                if (data.success) {
                    $("#modal-add").modal('toggle');
                    setTimeout(async () => {
                        await this.getCommittee();
                    }, 200);
                } else {
                    this.setState({ message: data.errors.learners });
                }
            } else {
                this.setState({ message: 'Por favor complete el formulario' });
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
                                        {
                                            this.state.stimuli.length +
                                            this.state.learnerNovelties.length +
                                            this.state.committee.committee_sessions.length
                                        }
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
                                            {this.state.committee.end_hour ? moment(
                                                this.state.committee.end_hour,
                                                "HH:mm"
                                            ).format("hh:mm A"):'(Aún no se define la hora fin)'}
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
                                                                <span className="badge badge-success" style={{ width: '125px' }}>Estimulos e incentivos</span>
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
                                                                        onClick={this.handleEditStimulus}
                                                                    >
                                                                        Editar
                                                                    </button>
                                                                    <button
                                                                        data-id={
                                                                            stimulus.id
                                                                        }
                                                                        className="btn btn-sm btn-outline-primary"
                                                                        onClick={this.handleModalStimuli}
                                                                    >
                                                                        Detalle
                                                                    </button>
                                                                    <button
                                                                        data-id={
                                                                            stimulus.id
                                                                        }
                                                                        className="btn btn-sm btn-outline-danger"
                                                                        onClick={this.handleDeleteStimulus}
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
                                                                <span className="badge badge-secondary">
                                                                    Novedades del aprendiz
                                                                </span>
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
                                                                        onClick={this.handleEditLearnerNovelty}
                                                                    >
                                                                        Editar
                                                                    </button>
                                                                    <button
                                                                        data-id={
                                                                            learnerNovelty.id
                                                                        }
                                                                        className="btn btn-sm btn-outline-primary"
                                                                        onClick={this.handleModalNovelty}
                                                                    >
                                                                        Detalle
                                                                    </button>
                                                                    <button
                                                                        data-id={
                                                                            learnerNovelty.id
                                                                        }
                                                                        className="btn btn-sm btn-outline-danger"
                                                                        onClick={this.handleDeleteLearnerNovelty}
                                                                    >
                                                                        Eliminar
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                                {this.state.committee.committee_sessions.map((committee_session, i) => (
                                                    <tr key={i}>
                                                        <td>{committee_session.learner.document_type} {committee_session.learner.document}</td>
                                                        <td>{committee_session.learner.name}</td>
                                                        <td><span className="badge badge-primary">Academico disciplinarios</span></td>
                                                        <td>
                                                            <div
                                                                className="btn-group"
                                                                role="group"
                                                                aria-label="Basic example"
                                                            >
                                                                <button
                                                                    data-id={
                                                                        committee_session.id
                                                                    }
                                                                    className="btn btn-sm btn-outline-primary"
                                                                    onClick={this.handleEditAcademic}
                                                                >
                                                                    Editar
                                                                    </button>
                                                                <Link
                                                                    className="btn btn-sm btn-outline-primary"
                                                                    to={`/app/committees/${this.state.id}/committee-session/${committee_session.id}`}
                                                                >
                                                                    Detalle
                                                                </Link>
                                                                <button
                                                                    data-id={
                                                                        committee_session.id
                                                                    }
                                                                    className="btn btn-sm btn-outline-danger"
                                                                    onClick={this.handleDeleteAcademic}
                                                                >
                                                                    Eliminar
                                                                    </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </DataTable>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" tabIndex="-1" data-backdrop="static" id="stimulus-edit">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar estimulo</h5>
                            </div>
                            <div className="modal-body">
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
                                {this.state.stimulus ? (
                                    <StimuliForm
                                        onSubmit={this.handleUpdateStimulus}
                                        committee={this.state.id}
                                        id="stimulusForm"
                                        rules={
                                            this.state.stimuliRules
                                        }
                                        handleInput={
                                            this.handleInputStimulus
                                        }
                                        handleSelect={
                                            this.selectLearner
                                        }
                                        data={this.state.stimulus}
                                    />
                                ) : (
                                        <div className="">Cargando...</div>
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
                <div className="modal fade" tabIndex="-1" data-backdrop="static" id="learner-novelty-edit">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar novedad del aprendiz</h5>
                            </div>
                            <div className="modal-body">
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
                                {this.state.learnerNovelty ? (
                                    <NoveltyForm
                                        onSubmit={this.handleUpdateLearnerNovelty}
                                        committee={this.state.id}
                                        rules={
                                            this.state
                                                .noveltiesRules
                                        }
                                        handleInput={
                                            this.handleInputLearnerNovelty
                                        }
                                        handleSelect={
                                            this.selectLearner
                                        }
                                        data={this.state.learnerNovelty}
                                    />
                                ) : (
                                        <div className=""></div>
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
                <div className="modal fade" tabIndex="-1" data-backdrop="static" id="academic-edit">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar caso academico disciplinario</h5>
                            </div>
                            <div className="modal-body">
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
                                {this.state.academic ? (
                                    <AcademicForm
                                        onSubmit={this.handleUpdateAcademic}
                                        committee={this.state.id}
                                        rules={
                                            this.state.academicsRules
                                        }
                                        handleInput={
                                            this.handleInputAcademic
                                        }
                                        handleSelect={
                                            this.selectLearner
                                        }
                                        data={this.state.academic}
                                    />
                                ) : (
                                        <div className=""></div>
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
                <div className="modal fade" tabIndex="-1" data-backdrop="static" id="modal-stimuli-novelty">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal-title</h5>
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
                                <div className="row">
                                    <div className="col-3">
                                        <img id="learner_photo" src="/img/no-photo.png" alt="learner-img" className="img-thumbnail img-fluid" />
                                    </div>
                                    <div className="col">
                                        <h5 className="text-primary mb-3" id="learner_name"></h5>
                                        <h6 id="learner_email"></h6>
                                        <h6 id="learner_document"></h6>
                                        <hr />
                                        <h6 id="learner_group"></h6>
                                        <h6 id="learner_formation_program"></h6>
                                    </div>
                                </div>
                                <hr />
                                <div className="row mt-3">
                                    <div className="col">
                                        <h5 id="case_type" className="text-primary"></h5>
                                        <h6 id="case_type_text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam, doloribus!</h6>
                                        <h5 className="mt-3 text-primary">Justificacion</h5>
                                        <h6 id="justification">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste, voluptas?</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" tabIndex="-1" data-backdrop="static" id="modal-add">
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
                                                            committee={this.state.id}
                                                            rules={
                                                                this.state.academicsRules
                                                            }
                                                            handleInput={
                                                                this.handleInput
                                                            }
                                                            handleSelect={
                                                                this.selectLearner
                                                            }
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
