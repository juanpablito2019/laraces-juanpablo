import React, { Component } from 'react';
import { get, store, find, update, destroy, rules,storeMass } from '../containers/ResponsiblesFormativeMeasures';
import { get as getContractTypes } from '../containers/ContractTypes';
import { get as getPositions } from '../containers/Positions';
import { validate, formValid, setRules } from '../containers/Validator';
import Loader from '../components/Loader';
import Select from 'react-select';

class ResponsiblesFormativeMeasures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responsibles: null,
            edit: false,
            id: null,
            rules: rules,
            message:null,
            positionId: 0,
            optionsPositions: null,
            contractTypes: null,
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
        this.selectPosition = this.selectPosition.bind(this);
        this.selectContractType = this.selectContractType.bind(this);
        this.search = this.search.bind(this);
        this.getPositions = this.getPositions.bind(this);
        this.getContractTypes = this.getContractTypes.bind(this);
    }

    async getResponsibles() {
        let data = await get();
        this.setState({ responsibles: data });
    }

    handleUpdate() {
        this.setState({ responsibles: null });
        storeMass().then(data => {
            if(data.success){
                this.getResponsibles();
            }
        })
    }

    async handleDetail(e) {
        let id = $(e.target).data('id');
        let data = await find(id);
        $('#detail').find('.modal-title').text(`Informacion de ${data.username}`);
        $('#detail').find('#username').text(data.username);
        $('#detail').find('#document').text(`${data.document_type} ${data.document}`);
        $('#detail').find('#misena_email').text(data.misena_email);
        $('#detail').find('#institutional_email').text(data.institutional_email);
        $('#detail').find('#birthdate').text(data.birthdate);
        $('#detail').find('#phone').text(data.phone);
        $('#detail').find('#gender').text(data.gender);
        $('#detail').find('#position_id').text(data.position_id);
        $('#detail').find('#contract_type_id').text(data.contract_type_id);
        $('#detail').find('#type').text(data.type);
        $('#detail').find('#state').text(data.state);
        $('#detail').find('#photo').attr('src', data.photo ? "/storage/" + data.photo : '/img/no-photo.png');
        $('#detail').modal('toggle');

    }

    getPositions() {
        getPositions().then(data => {
            let d = [];
            for (let i = 0; i < data.length; i++) {
                d.push({ label: data[i].name, value: data[i].id });
            }
            this.setState({ optionsPositions: d });
        })
    }

    getContractTypes() {
        getContractTypes().then(data => {
            this.setState({ contractTypes: data });
        })
    }

    handleClick() {
        console.log('click');
    }


    selectPosition(value) {
        this.setState({ positionId: value });
        rules.position_id.isInvalid = false;
    }

    selectContractType(value) {
        rules.contract_type_id.isInvalid = false;
        this.setState({ contracTypeId: value });
    }

    selectPhoto(e) {
        let input = e.target;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('.img').attr('src', e.target.result).hide().fadeIn(1000);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }



    handleInput(e) {
        let { name, value } = e.target;
        let newRules = validate(name, value, rules)
        this.setState({ rules: newRules });
    }

    async handleEdit(e) {
        let id = $(e.target).data('id');
        this.setState({ edit: true, id });
        setRules(rules,false);

        let data = await find(id);
        $('#modal').find('#modal-title').text('Editar responsable');
        $('#modal').find('#username').val(data.username);
        $('#modal').find('#misena_email').val(data.misena_email);
        $('#modal').find('#institutional_email').val(data.institutional_email);
        $('#modal').find('#document_type').val(data.document_type);
        $('#modal').find('#document').val(data.document);
        $('#modal').find('#birthdate').val(data.birthdate);
        $('#modal').find('#phone').val(data.phone);
        $('#modal').find('#phone_ip').val(data.phone_ip);
        $('#modal').find('#gender').val(data.gender);
        $('#modal').find('#position_id').val(data.position_id);
        $('#modal').find('#contract_type_id').val(data.contract_type_id);
        $('#modal').find('#type').val(data.type);
        $('#modal').find('#state').val(data.state);

        if (data.photo) {
            $('#modal').find('#temp').attr('src', `/storage/${data.photo}`);
        } else {
            $('#modal').find('.img').attr('src', `/img/no-photo.png`);
        }
        this.setState({ positionId: this.state.optionsPositions.find(o => o.value === data.position_id) })
        $('#modal').modal('toggle');
    }

    handleModal() {
        $('#form').trigger('reset');
        $('#temp').attr('src', '/img/no-photo.png')
        setRules(rules);
        this.setState({
            message: 'Te recomendamos importar antes de agregar uno nuevo',
            edit: false,
            positionId: null
        });
        $('#modal').find('.modal-title').text('Agregar responsable de medida formativa');
        $('#modal').modal('toggle');
    }

    async handleDelete(e) {
        let id = $(e.target).data('id');
        let res = confirm('¿Estas seguro de eliminar este responsable?');
        if (res) {
            let data = await destroy(id);
            this.getResponsibles();
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (formValid(rules)) {
            if (this.state.edit) {
                update(e.target, this.state.id).then(data => {
                    if (data.success) {
                        this.getResponsibles();
                        $('.modal').modal('toggle');
                    } else {
                        this.setState({ message: data.errors.name })
                    }
                })
            } else {
                store(e.target).then(data => {
                    if (data.success) {
                        this.getResponsibles();
                        $('.modal').modal('hide');
                    } else {
                        this.setState({ message: data.errors.name })
                    }
                });
            }
        } else {
            this.setState({ message: 'Por favor completa el formulario' })
        }
    }

    tooltip(e) {
        $(e.target).tooltip();
    }

    search(e) {
        let { value } = e.target;
        let matchs = this.state.responsibles.filter(responsible => {
            const rgex = new RegExp(`^${value}`, 'gi');
            return responsible.document.match(rgex) || responsible.username.normalize('NFD').replace(/[\u0300-\u036f]/g, "").match(rgex)
        });
        if (value.length === 0) {
            this.getResponsibles();
        }
        this.setState({ responsibles: matchs });
    }

    componentDidMount() {
        this.getResponsibles();
        this.getPositions();
        this.getContractTypes();
    }



    render() {
        const { rules } = this.state;
        if (!this.state.responsibles || !this.state.contractTypes) {
            return (
                <Loader />
            )
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Responsables de medidas formativas</h3>
                        <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Agregar <span className="d-none d-md-inline ">nuevo responsable</span></a>
                        <a href="#" onClick={this.handleUpdate} className="ml-3"><i className="fa fa-download" aria-hidden="true"></i> Actualizar </a>
                    </div>
                    <div className="d-6 d-lg-3 mr-3 ml-3 mt-3">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <button className="btn btn-outline-primary" type="button" id="button-addon1">
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </button>
                            </div>
                            <input type="text" className="form-control" onInput={this.search} />
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Documento</th>
                                    <th>Nombre</th>
                                    <th className="d-none d-lg-table-cell" >Correo</th>
                                    <th className="d-none d-md-table-cell">telefono</th>
                                    <th className="d-none d-lg-table-cell" >Cargo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.responsibles.length > 0 ? (
                                    this.state.responsibles.map(responsible => (
                                        <tr key={responsible.id}>
                                            <td>{responsible.document_type} {responsible.document}</td>
                                            <td>{responsible.username}</td>
                                            <td className="d-none d-lg-table-cell">{responsible.misena_email}</td>
                                            <td className="d-none d-md-table-cell">{responsible.phone}</td>
                                            <td className="d-none d-lg-table-cell">{responsible.position.name}</td>
                                            <td>
                                                <div className="btn-group" role="responsible" aria-label="Basic example">
                                                    <button data-id={responsible.id} onClick={this.handleEdit} className="btn btn-sm btn-outline-primary">Editar</button>
                                                    <button data-id={responsible.id} onClick={this.handleDetail} className="btn btn-sm btn-outline-primary">Detalle</button>
                                                    <button data-id={responsible.id} onClick={this.handleDelete} className="btn btn-sm btn-outline-danger">Eliminar</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">No hay datos disponibles</td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>


                <div className="modal fade" data-backdrop="static" id="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handleSubmit} id="form">
                                    {this.state.message ? (
                                        <div className="alert alert-info" role="alert">
                                            <span><i className="fa fa-info-circle" aria-hidden="true"></i> {this.state.message}</span>
                                        </div>
                                    ) : (
                                            <div className=""></div>
                                        )}
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#personal" role="tab" aria-controls="home" aria-selected="true">Datos personales</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#formation" role="tab" aria-controls="profile" aria-selected="false">Mas datos</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active mt-1" id="personal" role="tabpanel" aria-labelledby="home-tab">
                                            <div className="row">
                                                <div className="col-4 mx-auto text-center">
                                                    <input
                                                        type="file"
                                                        name="photo"
                                                        id="photo"
                                                        className="d-none"
                                                        onChange={this.selectPhoto}
                                                    />
                                                    <label htmlFor="photo">
                                                        <img
                                                            src="/img/no-photo.png"
                                                            alt="no-photo"
                                                            className="img-thumbnail img"
                                                            data-toggle="tooltip"
                                                            data-placement="left"
                                                            title="Subir foto"
                                                            id="temp"
                                                            onMouseOver={this.tooltip}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Nombre</label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    className={rules.username.isInvalid && rules.username.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                    onInput={this.handleInput}
                                                />
                                                <div className="invalid-feedback">
                                                    {rules.username.isInvalid && rules.username.message != '' ? rules.username.message : ''}
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="form-row">
                                                    <div className="col">
                                                        <label htmlFor="">Tipo de documento</label>
                                                        <select
                                                            name="document_type"
                                                            id="document_type"
                                                            className={rules.document_type.isInvalid && rules.document_type.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                            onInput={this.handleInput}
                                                        >
                                                            <option value="">Selecciona uno</option>
                                                            <option value="CC">Cedula de ciudadania</option>
                                                            <option value="TI">Tarjeta de identidad</option>
                                                            <option value="CE">Cedula extranjera</option>
                                                        </select>
                                                        <div className="invalid-feedback">
                                                            {rules.document_type.isInvalid && rules.document_type.message != '' ? rules.document_type.message : ''}
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <label htmlFor="">Numero de documento</label>
                                                        <input
                                                            type="number"
                                                            name="document"
                                                            id="document"
                                                            className={rules.document.isInvalid && rules.document.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                            onInput={this.handleInput}
                                                        />
                                                        <div className="invalid-feedback">
                                                            {rules.document.isInvalid && rules.document.message != '' ? rules.document.message : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Correo mi Sena</label>
                                                <input
                                                    type="email"
                                                    name="misena_email"
                                                    id="misena_email"
                                                    className={rules.misena_email.isInvalid && rules.misena_email.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                    onInput={this.handleInput}
                                                />
                                                <div className="invalid-feedback">
                                                    {rules.misena_email.isInvalid && rules.misena_email.message != '' ? rules.misena_email.message : ''}
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Correo institucional</label>
                                                <input
                                                    type="email"
                                                    name="institutional_email"
                                                    id="institutional_email"
                                                    className={rules.institutional_email.isInvalid && rules.institutional_email.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                    onInput={this.handleInput}
                                                />
                                                <div className="invalid-feedback">
                                                    {rules.institutional_email.isInvalid && rules.institutional_email.message != '' ? rules.institutional_email.message : ''}
                                                </div>
                                            </div>

                                        </div>
                                        <div className="tab-pane fade mt-3" id="formation" role="tabpanel" aria-labelledby="profile-tab">
                                            <div className="form-group">
                                                <label htmlFor="position_id">Cargo</label>
                                                <Select
                                                    defaultValue={this.state.positionId}
                                                    value={this.state.positionId}
                                                    name="position_id"
                                                    id="position_id"
                                                    options={this.state.optionsPositions}
                                                    onChange={value => this.selectPosition(value)}
                                                />
                                                <div className="invalid-feedback d-block">
                                                    {rules.position_id.isInvalid && rules.position_id.message != '' ? rules.position_id.message : ''}
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="">Tipo contrato</label>
                                                <select
                                                    className={rules.contract_type_id.isInvalid  && rules.contract_type_id.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                    name="contract_type_id"
                                                    id="contract_type_id"
                                                    onInput={this.handleInput} >
                                                    <option value="">Seleccione uno</option>
                                                    {this.state.contractTypes.length > 0 ? (
                                                        this.state.contractTypes.map(contractType =>(
                                                            <option key={contractType.id} value={contractType.id} >{contractType.name}</option>
                                                        ))
                                                    ) : (
                                                            <option>No hay tipos de contratos</option>
                                                    )}
                                                </select>

                                                <div className="invalid-feedback">
                                                    {rules.contract_type_id.isInvalid && rules.contract_type_id.message != '' ? rules.contract_type_id.message : ''}
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="form-row">
                                                    <div className="col">
                                                        <label htmlFor="">Celular</label>
                                                        <input
                                                            type="number"
                                                            name="phone"
                                                            id="phone"
                                                            className={rules.phone.isInvalid && rules.phone.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                            onInput={this.handleInput}
                                                        />
                                                        <div className="invalid-feedback">
                                                            {rules.phone.isInvalid && rules.phone.message != '' ? rules.phone.message : 'form-control'}
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <label htmlFor="">Telefono</label>
                                                        <input
                                                            type="number"
                                                            name="phone_ip"
                                                            id="phone_ip"
                                                            className={rules.phone_ip.isInvalid && rules.phone_ip.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                            onInput={this.handleInput}
                                                        />
                                                        <div className="invalid-feedback">
                                                            {rules.phone_ip.isInvalid && rules.phone_ip.message != '' ? rules.phone_ip.message : 'form-control'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="form-row">

                                                        <div className="col">
                                                            <label htmlFor="">Fecha de nacimiento</label>
                                                            <input
                                                                type="date"
                                                                name="birthdate"
                                                                id="birthdate"
                                                                className={rules.birthdate.isInvalid && rules.birthdate.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                                onInput={this.handleInput}
                                                            />
                                                            <div className="invalid-feedback">
                                                                {rules.birthdate.isInvalid && rules.birthdate.message != '' ? rules.birthdate.message : ''}
                                                            </div>

                                                        </div>

                                                        <div className="col">
                                                        <label htmlFor="">Genero</label>
                                                        <select
                                                            name="gender"
                                                            id="gender"
                                                            className={rules.gender.isInvalid && rules.gender.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                            onInput={this.handleInput}
                                                        >
                                                            <option value="">Selecciona uno</option>
                                                            <option value="M">Masculino</option>
                                                            <option value="F">Femenino</option>
                                                        </select>
                                                        <div className="invalid-feedback">
                                                            {rules.gender.isInvalid && rules.gender.message != '' ? rules.gender.message : ''}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="form-group">

                                                <div className="form-row">

                                                    <div className="col">
                                                        <label htmlFor="">Tipo</label>
                                                        <input
                                                            type="text"
                                                            name="type"
                                                            id="type"
                                                            className={rules.type.isInvalid && rules.type.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                            onInput={this.handleInput}
                                                        />
                                                        <div className="invalid-feedback">
                                                            {rules.type.isInvalid && rules.type.message != '' ? rules.type.message : 'form-control'}
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <label htmlFor="">Estado</label>
                                                        <input
                                                            type="text"
                                                            name="state"
                                                            id="state"
                                                            className={rules.state.isInvalid && rules.state.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                            onInput={this.handleInput}
                                                        />
                                                        <div className="invalid-feedback">
                                                            {rules.state.isInvalid && rules.state.message != '' ? rules.state.message : 'form-control'}
                                                        </div>
                                                    </div>



                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="submit" form="form" className="btn btn-primary">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" data-backdrop="static" id="detail" tabIndex="-1">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-3">
                                        <div className="row">
                                            <div className="col mx-auto">
                                                <div className="card">
                                                    <img src="" id="photo" className="card-img-top" alt="photo" />
                                                    <div className="card-body">
                                                        <h5 className="card-title" id="name">
                                                        </h5>
                                                        <div className="card-subtitle text-muted" id="username">
                                                        </div>
                                                        <div className="card-subtitle text-muted" id="document">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#information" role="tab" aria-controls="home" aria-selected="true">Informacion</a>
                                            </li>
                                            {/* <li className="nav-item" role="presentation">
                                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#stimuli" role="tab" aria-controls="profile" aria-selected="false">Estimulos</a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link" id="contact-tab" data-toggle="tab" href="#history" role="tab" aria-controls="contact" aria-selected="false">Historial</a>
                                            </li> */}
                                        </ul>
                                        <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active" id="information" role="tabpanel" aria-labelledby="home-tab">
                                                <div className="row mt-3">
                                                    <div className="col-6">
                                                        <h6>Correo Mi Sena</h6>
                                                        <h6 className="text-muted" id="misena_email"></h6>
                                                    </div>
                                                    <div className="col-6">
                                                        <h6>Correo Institucional</h6>
                                                        <h6 className="text-muted" id="institutional_email"></h6>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <h6>Fecha nacimiento</h6>
                                                        <h6 className="text-muted" id="birthdate"></h6>
                                                    </div>
                                                    <div className="col">
                                                        <h6>Celular</h6>
                                                        <h6 className="text-muted" id="phone"></h6>
                                                    </div>
                                                    <div className="col">
                                                        <h6>Telefono</h6>
                                                        <h6 className="text-muted" id="phone_ip"></h6>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <h6>Cargo</h6>
                                                        <h6 className="text-muted" id="position_id"></h6>
                                                    </div>
                                                    <div className="col">
                                                        <h6>Tipo de contrato</h6>
                                                        <h6 className="text-muted" id="contract_type_id"></h6>
                                                    </div>
                                                    <div className="col">
                                                        <h6>Estado</h6>
                                                        <h6 className="text-muted" id="state"></h6>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <h6>Genero</h6>
                                                        <h6 className="text-muted ml-3" id="gender"></h6>
                                                    </div>
                                                    <div className="col">
                                                        <h6>Tipo</h6>
                                                        <h6 className="text-muted" id="type"></h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="stimuli" role="tabpanel" aria-labelledby="profile-tab">...</div>
                                            <div className="tab-pane fade" id="history" role="tabpanel" aria-labelledby="contact-tab">...</div>
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
        );
    }
}

export default ResponsiblesFormativeMeasures;
