import React, { Component } from "react";
import { Link } from "react-router-dom";
import { get, store, rules, destroy, find, update } from "../containers/Committees";
import { getByRol } from "../containers/User";
import Loader from "../components/Loader";
import Ckeditor from "../components/Ckeditor";
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
            subdirectors: null,
            ckdata: "",
            ckreset: false
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
        this.setState({ subdirectors: data.users });
    }

    async handleDelete(e){
        let id = $(e.target).data('id');
        let res = confirm('¿Estas seguro que deseas eliminar este elemento?');
        if(res){
            let data = await destroy(id);
            if(data.success){
                await this.getCommittees();
            }else{
                console.log(data);
            }
        }
    }

    async handleModal() {
        setRules(rules);
        this.setState({ckreset: true, ckdata: "", edit: false});
        $('#form').trigger('reset');
        $(".modal")
            .find(".modal-title")
            .text("Agregar comité");
        $(".modal").modal("toggle");
    }

    async handleEdit(e){
        setRules(rules, false);
        let id = $(e.target).data('id');
        let data = await find(id);
        this.setState({ckdata: data.assistants, ckreset: false, edit: true, id});
        $('.modal').find('.modal-title').text('Editar comité');
        $('.modal').find('#record_number').val(data.record_number);
        $('.modal').find('#date').val(data.date);
        $('.modal').find('#start_hour').val(data.start_hour);
        $('.modal').find('#end_hour').val(data.end_hour);
        $('.modal').find('#place').val(data.place);
        $('.modal').find('#formation_center').val(data.formation_center);
        if(data.qourum == 1){
            $('#radio1').attr('checked', true);
        }else{
            $('#radio2').attr('checked', true);
        }
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
                if(data.success){
                    await this.getCommittees();
                    $('.modal').modal('toggle');
                    this.setState({edit: false});
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
    }
    render() {
        const { rules } = this.state;
        if (!this.state.committes || !this.state.subdirectors) {
            return <Loader />;
        }
        return (
            <>
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
                                                    <Link to={"/app/committees/"+committe.id}>
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
                    <div className="modal-dialog modal-xl">
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
                                                            Hora fin{" "}
                                                            <span className="text-danger">
                                                                *
                                                            </span>
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
                                                <label htmlFor="" className="d-block">
                                                    ¿Quorum?{" "}
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="qourum"
                                                        id="radio1"
                                                        value="1"
                                                        onChange={this.handleInput}
                                                    />
                                                    <label className="form-check-label" htmlFor="radio1">Si</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="qourum"
                                                        id="radio2"
                                                        value="0"
                                                        onInput={this.handleInput}
                                                    />
                                                    <label className="form-check-label" htmlFor="radio2">No</label>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">
                                                    Subdirector{" "}
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <select
                                                    name="subdirector_name"
                                                    id="subdirector_name"
                                                    className={
                                                        rules.subdirector_name
                                                            .isInvalid &&
                                                            rules.subdirector_name
                                                                .message != ""
                                                            ? "form-control is-invalid"
                                                            : "form-control"
                                                    }
                                                    onInput={this.handleInput}
                                                >
                                                    <option value="">
                                                        Seleccion uno
                                                    </option>
                                                    {this.state.subdirectors
                                                        .length > 0 ? (
                                                            this.state.subdirectors.map(
                                                                (
                                                                    subdirector,
                                                                    i
                                                                ) => (
                                                                        <option
                                                                            key={i}
                                                                            value={
                                                                                subdirector.name
                                                                            }
                                                                        >
                                                                            {
                                                                                subdirector.name
                                                                            }
                                                                        </option>
                                                                    )
                                                            )
                                                        ) : (
                                                            <option value="">
                                                                No hay subdirectores
                                                                registrados en el
                                                                sistema
                                                            </option>
                                                        )}
                                                </select>
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
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="">
                                                    Asistentes{" "}
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <Ckeditor
                                                    name="assistants"
                                                    id="assistants"
                                                    data={this.state.ckdata}
                                                    reset={this.state.ckreset}
                                                />
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
            </>
        );
    }
}

export default Committees;
