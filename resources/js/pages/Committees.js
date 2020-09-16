import React, { Component } from "react";
import { Link } from "react-router-dom";
import { get, store, rules, destroy, find, update } from "../containers/Committees";
import { getByRol } from "../containers/User";
import {find as findGeneralParameter} from '../containers/GeneralParameters';
import Loader from "../components/Loader";
import { formValid, validate, setRules } from "../containers/Validator";
import moment from 'moment';

class Committees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            committes: null,
            id: null,
            edit: false,
            message: null,
            rules,
            subdirector: null,
            coordinador: null,
            place: null,
            formation_center: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    async getCommittees() {
        let data = await get();
        this.setState({ committes: data });
    }

    async getSubdirectors() {
        let data = await getByRol(3);
        for (let i = 0; i < data.users.length; i++) {
            if (data.users[i].is_active === 1) {
                this.setState({ subdirector: data.users[i] });
            }
        }
    }
    async getCoordinadores() {
        let data = await getByRol(2);
        for (let i = 0; i < data.users.length; i++) {
            if (data.users[i].is_active === 1) {
                this.setState({ coordinador: data.users[i] });
            }
        }
    }

    async getGeneralParameters(){
        let parameter1 = await findGeneralParameter(1);
        let parameter2 = await findGeneralParameter(2);
        this.setState({formation_center: parameter1.content, place: parameter2.content});
    }

    handleDelete(e) {
        let id = $(e.target).data('id');
        let res = confirm('¿Estas seguro que deseas eliminar este comite?');
        if (res) {
            destroy(id).then(data => {
                if (data.success) {
                    this.getCommittees();
                    toastr.success('', data.message, {
                        closeButton: true
                    });
                }else {
                    toastr.error('', data.message, {
                        closeButton: true
                    });
                }
            })
        }
    }

    async handleModal() {
        setRules(rules);
        rules.end_hour.isInvalid = false;
        rules.subdirector_name.isInvalid = false;
        rules.coordinador_name.isInvalid = false;
        rules.place.isInvalid = false;
        rules.formation_center.isInvalid = false;
        this.setState({edit: false });
        $('#form').trigger('reset');
        $(".modal")
            .find(".modal-title")
            .text("Agregar comité");
        $(".modal").modal("toggle");
    }

    async handleEdit(e) {
        setRules(rules, false);
        let id = $(e.target).data('id');
        let data = await find(id);
        this.setState({ edit: true, id });
        $('.modal').find('.modal-title').text('Editar comité');
        $('.modal').find('#record_number').val(data.record_number);
        $('.modal').find('#date').val(data.date);
        $('.modal').find('#start_hour').val(data.start_hour);
        $('.modal').find('#end_hour').val(data.end_hour);
        $('.modal').find('#place').val(data.place);
        $('.modal').find('#formation_center').val(data.formation_center);
        $('.modal').find('#subdirector_name').val(data.subdirector_name);
        $('.modal').modal('toggle');
    }

    handleInput(e) {
        const { name, value } = e.target;
        let newRules = validate(name, value, rules);
        this.setState({ rules: newRules });
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (formValid(rules)) {
            if (this.state.edit) {
                let data = await update(e.target, this.state.id);
                if (data.success) {
                    await this.getCommittees();
                    $('.modal').modal('toggle');
                    this.setState({ edit: false });
                }
            } else {
                let data = await store(e.target);
                if (data.success) {
                    await this.getCommittees();
                    $(".modal").modal("toggle");
                } else {
                    this.setState({
                        message: data.errors.assistants || data.errors.end_hour
                    });
                }
            }
        } else {
            this.setState({ message: "Por favor complete el formulario" });
        }
    }
    componentDidMount() {
        this.getCommittees();
        this.getSubdirectors();
        this.getCoordinadores();
        this.getGeneralParameters();
    }
    render() {
        const { rules } = this.state;
        if (!this.state.committes || !this.state.subdirector || !this.state.coordinador || !this.state.formation_center || !this.state.place) {
            return <Loader />;
        }
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <h3>Comités</h3>
                        <a href="#" onClick={this.handleModal}>
                            <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                            Nuevo comité
                        </a>
                    </div>
                </div>
                <div className="row mt-3">
                    {this.state.committes.length > 0 ? (
                        this.state.committes.map((committe, i) => (
                            <div className="col-4" key={i}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <div className="card-title border-bottom">
                                                    <Link to={"/app/committees/" + committe.id}>
                                                        <h5>
                                                            {moment(committe.date).format('LL')}
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
                                                    <a href="#" data-id={committe.id} onClick={this.handleEdit}>Editar</a>
                                                    <a href="#" data-id={committe.id} onClick={this.handleDelete} className="ml-3 text-danger">Eliminar</a>
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
                <div className="modal fade" tabIndex="-1" data-backdrop="static">
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
                                <form onSubmit={this.handleSubmit} id="form">
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
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <div className="form-row">
                                                    <div className="col">
                                                        <label htmlFor="">
                                                            Numero de acta{" "}
                                                            <span className="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="record_number"
                                                            id="record_number"
                                                            className={
                                                                rules
                                                                    .record_number
                                                                    .isInvalid &&
                                                                    rules
                                                                        .record_number
                                                                        .message !=
                                                                    ""
                                                                    ? "form-control is-invalid"
                                                                    : "form-control"
                                                            }
                                                            autoComplete="off"
                                                            onInput={
                                                                this.handleInput
                                                            }
                                                        />
                                                        <div className="invalid-feedback">
                                                            {rules.record_number
                                                                .isInvalid &&
                                                                rules.record_number
                                                                    .message != ""
                                                                ? rules
                                                                    .record_number
                                                                    .message
                                                                : ""}
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <label htmlFor="">
                                                            Fecha{" "}
                                                            <span className="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="date"
                                                            name="date"
                                                            id="date"
                                                            className={
                                                                rules.date
                                                                    .isInvalid &&
                                                                    rules.date
                                                                        .message !=
                                                                    ""
                                                                    ? "form-control is-invalid"
                                                                    : "form-control"
                                                            }
                                                            onInput={
                                                                this.handleInput
                                                            }
                                                        />
                                                        <div className="invalid-feedback">
                                                            {rules.date
                                                                .isInvalid &&
                                                                rules.date
                                                                    .message != ""
                                                                ? rules.date
                                                                    .message
                                                                : ""}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col">
                                                        <label htmlFor="">
                                                            Hora inicio{" "}
                                                            <span className="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="time"
                                                            name="start_hour"
                                                            id="start_hour"
                                                            className={
                                                                rules.start_hour
                                                                    .isInvalid &&
                                                                    rules.start_hour
                                                                        .message !=
                                                                    ""
                                                                    ? "form-control is-invalid"
                                                                    : "form-control"
                                                            }
                                                            onInput={
                                                                this.handleInput
                                                            }
                                                        />
                                                        <div className="invalid-feedback">
                                                            {rules.start_hour
                                                                .isInvalid &&
                                                                rules.start_hour
                                                                    .message != ""
                                                                ? rules
                                                                    .start_hour
                                                                    .message
                                                                : ""}
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <label htmlFor="">
                                                            Hora fin
                                                        </label>
                                                        <input
                                                            type="time"
                                                            name="end_hour"
                                                            id="end_hour"
                                                            className={
                                                                rules.end_hour
                                                                    .isInvalid &&
                                                                    rules.end_hour
                                                                        .message !=
                                                                    ""
                                                                    ? "form-control is-invalid"
                                                                    : "form-control"
                                                            }
                                                            onInput={
                                                                this.handleInput
                                                            }
                                                        />
                                                        <div className="invalid-feedback">
                                                            {rules.end_hour
                                                                .isInvalid &&
                                                                rules.end_hour
                                                                    .message != ""
                                                                ? rules.end_hour
                                                                    .message
                                                                : ""}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">
                                                    Lugar{" "}
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="place"
                                                    id="place"
                                                    defaultValue={this.state.place}
                                                    className={
                                                        rules.place.isInvalid &&
                                                            rules.place.message !=
                                                            ""
                                                            ? "form-control is-invalid"
                                                            : "form-control"
                                                    }
                                                    onInput={this.handleInput}
                                                />
                                                <div className="invalid-feedback">
                                                    {rules.place.isInvalid &&
                                                        rules.place.message != ""
                                                        ? rules.place.message
                                                        : ""}
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">
                                                    Centro de formación{" "}
                                                    <span className="text-danger">
                                                        *
                                                            </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="formation_center"
                                                    id="formation_center"
                                                    defaultValue={this.state.formation_center}
                                                    className={
                                                        rules.formation_center
                                                            .isInvalid &&
                                                            rules.formation_center
                                                                .message != ""
                                                            ? "form-control is-invalid"
                                                            : "form-control"
                                                    }
                                                    onInput={this.handleInput}
                                                />
                                                <div className="invalid-feedback">
                                                    {rules.formation_center
                                                        .isInvalid &&
                                                        rules.formation_center
                                                            .message != ""
                                                        ? rules.formation_center
                                                            .message
                                                        : ""}
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="form-row">
                                                    <div className="col">
                                                        <label htmlFor="">
                                                            Subdirector{" "}
                                                            <span className="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input type="text" name="subdirector_name" id="subdirector_name" className="form-control" defaultValue={this.state.subdirector.name} />
                                                        <div className="invalid-feedback">
                                                            {rules.subdirector_name
                                                                .isInvalid &&
                                                                rules.subdirector_name
                                                                    .message != ""
                                                                ? rules.subdirector_name
                                                                    .message
                                                                : ""}
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <label htmlFor="">
                                                            Coordinador{" "}
                                                            <span className="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input type="text" name="coordinador_name" id="coordinador_name" className="form-control" defaultValue={this.state.coordinador.name} />
                                                        <div className="invalid-feedback">
                                                            {rules.coordinador_name
                                                                .isInvalid &&
                                                                rules.coordinador_name
                                                                    .message != ""
                                                                ? rules.coordinador_name
                                                                    .message
                                                                : ""}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Cancelar
                                </button>
                                <button form="form" className="btn btn-primary">
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Committees;
