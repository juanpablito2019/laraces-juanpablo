import React, { Component } from 'react';
import moment from 'moment';
moment.locale('es')
import Select from 'react-select';
import { get, rules, store, find, update, destroy, storeMass } from '../containers/Groups';
import { get as getModalities } from '../containers/Modalities';
import { get as getFormationPrograms } from '../containers/FormationPrograms';
import Loader from '../components/Loader';
import { formValid, validate, setRules } from '../containers/Validator';
import VerifyPermission from '../components/VerifyPermission';
import { Link } from "react-router-dom";

class Groups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: null,
            modalities: null,
            formationPrograms: null,
            formationProgramId: 0,
            rules: rules,
            id: null,
            edit: false,
            message: null,
            options: null,
            learners: null,
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
        this.search = this.search.bind(this);
    }

    getGroups() {
        get().then(data => {
            this.setState({ groups: data });
        })
    }
    getModalities() {
        getModalities().then(data => {
            this.setState({ modalities: data });
        })
    }
    getFormationPrograms() {
        getFormationPrograms().then(data => {
            this.setState({ formationPrograms: data });
            let d = [];
            for (let i = 0; i < data.length; i++) {
                d.push({ value: data[i].id, label: data[i].name });
            }
            this.setState({ options: d });
        })
    }

    handleUpdate() {
        this.setState({ groups: null });
        storeMass().then(data => {
            if(data.success){
                this.getGroups();
                toastr.success('', data.message, {
                    closeButton: true
                });
            }else{
                this.getGroups();
                toastr.error('', data.message, {
                    closeButton: true
                });
            }
        })
    }

    handleDetail(e) {
        let id = $(e.target).data('id');
        find(id).then(data => {
            $('#modal-detail').find('.modal-title').text(`Grupo ${data.code_tab}`);
            $('#modal-detail').find('#code_tab').text(data.code_tab);
            $('#modal-detail').find('#modality').text(data.modality.name);
            $('#modal-detail').find('#formation_program').text(data.formation_program.name);
            $('#modal-detail').find('#quantity_learners').text(data.quantity_learners);
            $('#modal-detail').find('#active_learners').text(data.active_learners);
            $('#modal-detail').find('#elective_start_date').text(moment(data.elective_start_date).format('LL'));
            $('#modal-detail').find('#elective_end_date').text(moment(data.elective_end_date).format('LL'));
            $('#modal-detail').find('#practice_start_date').text(moment(data.practice_start_date).format('LL'));
            $('#modal-detail').find('#practice_end_date').text(moment(data.practice_end_date).format('LL'));
            this.setState({learners: data.learners});
            $('#modal-detail').modal('toggle');
        })
    }

    search(e) {
        let { value } = e.target;
        let matches = this.state.groups.filter(group => {
            const rgex = new RegExp(`^${value}`, 'gi');
            return group.code_tab.match(rgex);
        });
        if (value.length === 0) {
            this.getGroups();
        }
        this.setState({ groups: matches });
    }
    handleSubmit(e) {
        e.preventDefault();
        if (formValid(rules)) {
            if (this.state.edit) {
                update(e.target, this.state.id).then(data => {
                    if (data.success) {
                        this.getGroups();
                        $('#modal').modal('toggle');
                        toastr.success('', data.message, {
                            closeButton: true
                        });
                    } else {
                        this.setState({ message: data.errors.code_tab })
                    }
                })
            } else {
                store(e.target).then(data => {
                    if (data.success) {
                        this.getGroups();
                        $('#modal').modal('toggle');
                        toastr.success('', data.message, {
                            closeButton: true
                        });
                    } else {
                        this.setState({ message: data.errors.code_tab })
                    }
                });
            }
        } else {
            this.setState({ message: 'Por favor completa el formulario' })
        }
    }

    handleDelete(e) {
        let id = $(e.target).data('id');
        swal.fire({
            title: '¿Estas seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Si, eliminar`,
            cancelButtonText: `Cancelar`,
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                    destroy(id).then(data => {
                        if(data.success == false){
                            toastr.error('', data.message, {
                                closeButton: true
                            });
                        }if (data.success == true) {
                            this.getGroups();
                            toastr.success('', data.message, {
                                closeButton: true
                            });
                        }
                    })
            }
        })
    }

    handleChange(value) {
        this.setState({ formationProgramId: value });
        rules.formation_program_id.isInvalid = false;
    }

    handleInput(e) {
        const { name, value } = e.target;
        let newRules = validate(name, value, rules);
        this.setState({ rules: newRules });
    }

    handleModal() {
        $('#form').trigger('reset');
        setRules(rules);
        this.setState({ message: 'Te recomendamos actualizar antes de agregar uno nuevo', edit: false });
        $('#modal').find('.modal-title').text('Agregar grupo');
        $('#modal').modal('toggle');
    }

    handleEdit(e) {
        let id = $(e.target).data('id');
        this.setState({ id, edit: true, message: null });
        find(id).then(data => {
            rules.code_tab.isInvalid = false;
            rules.modality_id.isInvalid = false;
            rules.formation_program_id.isInvalid = false;
            rules.quantity_learners.isInvalid = false;
            rules.active_learners.isInvalid = false;
            rules.elective_start_date.isInvalid = false;
            rules.elective_end_date.isInvalid = false;
            rules.practice_start_date.isInvalid = false;
            rules.practice_end_date.isInvalid = false;
            $('#code_tab').val(data.code_tab);
            $('#modality_id').val(data.modality_id);
            this.setState({ formationProgramId: this.state.options.find(opt => opt.value === data.formation_program_id) })
            $('#quantity_learners').val(data.quantity_learners);
            $('#active_learners').val(data.active_learners);
            $('#elective_start_date').val(data.elective_start_date);
            $('#elective_end_date').val(data.elective_end_date);
            $('#practice_end_date').val(data.practice_end_date);
            $('#practice_start_date').val(data.practice_start_date);
            $('#modal').find('.modal-title').text('Editar grupo');
            $('#modal').modal('toggle');
        })
    }

    componentDidMount() {
        this.getGroups();
        this.getFormationPrograms();
        this.getModalities();
    }

    render() {
        const { rules } = this.state;
        if (!this.state.groups || !this.state.modalities || !this.state.formationPrograms) {
            return (
                <Loader />
            )
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Grupos</h3>

                        <VerifyPermission permission="create_group">
                            <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Agregar <span className="d-none d-md-inline ">nuevo grupo</span></a>
                            <a href="#" onClick={this.handleUpdate} className="ml-3"><i className="fa fa-download" aria-hidden="true"></i> Actualizar </a>
                        </VerifyPermission>

                    </div>
                    <div className="col-12 col-md-3 col-lg-3 mt-2 mt-lg-0">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <button className="btn btn-outline-primary" type="button" id="button-addon1">
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </button>
                            </div>
                            <input type="text" className="form-control" onInput={this.search} placeholder="Buscar..." />
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    {this.state.groups.length > 0 ? (
                        this.state.groups.map(group => (
                            <div className="col-12 col-lg-6 col-md-6 mb-2" key={group.id}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-3 col-lg-3">
                                                <i className="fa fa-users fa-4x mt-3" aria-hidden="true"></i>
                                            </div>
                                            <div className="col-8 ml-3">
                                                <h5>{group.code_tab}</h5>
                                                <p>{group.formation_program.name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div classname="col-3">
                                                <VerifyPermission permission="edit_group">
                                                    <a href="#" data-id={group.id} onClick={this.handleEdit} className="mr-2">Editar</a>
                                                </VerifyPermission>
                                            </div>

                                            <div classname="col-3">
                                                <a href="#" data-id={group.id} onClick={this.handleDetail} className="mr-2">Detalle</a>
                                            </div>

                                            <div classname="col-3">
                                                <VerifyPermission permission="delete_group">
                                                    <a href="#" data-id={group.id} onClick={this.handleDelete} className="text-danger">Eliminar</a>
                                                </VerifyPermission>
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
                <div className="modal" id="modal" tabIndex="-1" role="dialog">
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
                                    <div className="form-group">
                                        <label htmlFor="code_tab">Ficha</label>
                                        <input
                                            type="text"
                                            name="code_tab"
                                            id="code_tab"
                                            className={rules.code_tab.isInvalid && rules.code_tab.message != '' ? 'form-control is-invalid' : 'form-control'}
                                            onInput={this.handleInput}
                                        />
                                        <div className="invalid-feedback">
                                            {rules.code_tab.isInvalid && rules.code_tab.message != '' ? rules.code_tab.message : ''}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="modality_id">Modalidad</label>
                                        <select
                                            name="modality_id"
                                            id="modality_id"
                                            className={rules.modality_id.isInvalid && rules.modality_id.message != '' ? 'form-control is-invalid' : 'form-control'}
                                            onInput={this.handleInput}
                                        >
                                            <option value="">Selecciona uno</option>
                                            {this.state.modalities.length > 0 ? (
                                                this.state.modalities.map(modality => (
                                                    <option key={modality.id} value={modality.id}>{modality.name}</option>
                                                ))
                                            ) : (
                                                    <option value="">No hay modalidades disponibles</option>
                                                )}
                                        </select>
                                        <div className="invalid-feedback">
                                            {rules.modality_id.isInvalid && rules.modality_id.message != '' ? rules.modality_id.message : ''}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="formation_program_id">Programa de formacion</label>
                                        <Select
                                            defaultValue={this.state.formationProgramId}
                                            value={this.state.formationProgramId}
                                            name="formation_program_id"
                                            id="formation_program_id"
                                            options={this.state.options}
                                            onChange={value => this.handleChange(value)}
                                        />
                                        <div className="invalid-feedback d-block">
                                            {rules.formation_program_id.isInvalid && rules.formation_program_id.message != '' ? rules.formation_program_id.message : ''}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row">
                                            <div className="col-12 col-lg-6">
                                                <label htmlFor="quantity_learners">Numero de aprendices</label>
                                                <input
                                                    type="number"
                                                    name="quantity_learners"
                                                    id="quantity_learners"
                                                    className={rules.quantity_learners.isInvalid && rules.quantity_learners.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                    onInput={this.handleInput}
                                                />
                                                <div className="invalid-feedback">
                                                    {rules.quantity_learners.isInvalid && rules.quantity_learners.message != '' ? rules.quantity_learners.message : ''}
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6">
                                                <label htmlFor="active_learners">Aprendices activos</label>
                                                <input
                                                    type="number"
                                                    name="active_learners"
                                                    id="active_learners"
                                                    className={rules.active_learners.isInvalid && rules.active_learners.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                    onInput={this.handleInput}
                                                />
                                                <div className="invalid-feedback">
                                                    {rules.active_learners.isInvalid && rules.active_learners.message != '' ? rules.active_learners.message : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row">
                                            <div className="col">
                                                <label htmlFor="elective_start_date">Inicio etapa electiva</label>
                                                <input
                                                    type="date"
                                                    name="elective_start_date"
                                                    id="elective_start_date"
                                                    className={rules.elective_start_date.isInvalid && rules.elective_start_date.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                    onInput={this.handleInput}
                                                />
                                                <div className="invalid-feedback">
                                                    {rules.elective_start_date.isInvalid && rules.elective_start_date.message != '' ? rules.elective_start_date.message : ''}
                                                </div>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="elective_end_date">Fin etapa electiva</label>
                                                <input
                                                    type="date"
                                                    name="elective_end_date"
                                                    id="elective_end_date"
                                                    className={rules.elective_end_date.isInvalid && rules.elective_end_date.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                    onInput={this.handleInput}
                                                />
                                                <div className="invalid-feedback">
                                                    {rules.elective_end_date.isInvalid && rules.elective_end_date.message != '' ? rules.elective_end_date.message : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row">
                                            <div className="col">
                                                <label htmlFor="practice_start_date">Inicio etapa practica</label>
                                                <input
                                                    type="date"
                                                    name="practice_start_date"
                                                    id="practice_start_date"
                                                    className={rules.practice_start_date.isInvalid && rules.practice_start_date.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                    onInput={this.handleInput}
                                                />
                                                <div className="invalid-feedback">
                                                    {rules.practice_start_date.isInvalid && rules.practice_start_date.message != '' ? rules.practice_start_date.message : ''}
                                                </div>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="practice_end_date">Fin etapa practica</label>
                                                <input
                                                    type="date"
                                                    name="practice_end_date"
                                                    id="practice_end_date"
                                                    className={rules.practice_end_date.isInvalid && rules.practice_end_date.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                    onInput={this.handleInput}
                                                />
                                                <div className="invalid-feedback">
                                                    {rules.practice_end_date.isInvalid && rules.practice_end_date.message != '' ? rules.practice_end_date.message : ''}
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
                <div className="modal" id="modal-detail" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#info" role="tab" aria-controls="home" aria-selected="true">Informacion</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#learners" role="tab" aria-controls="profile" aria-selected="false">Aprendices</a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="info" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row mt-3">
                                            <div className="col">
                                                <label htmlFor="">Ficha</label>
                                                <p id="code_tab"></p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="">Modalidad</label>
                                                <p id="modality"></p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="">Programa de formacion</label>
                                                <p id="formation_program"></p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="">Cantidad de aprendices</label>
                                                <p id="quantity_learners"></p>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="">Aprendices activos</label>
                                                <p id="active_learners"></p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="">Inicio etapa electiva</label>
                                                <p id="elective_start_date"></p>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="">Fin etapa electiva</label>
                                                <p id="elective_end_date"></p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="">Inicio etapa practica</label>
                                                <p id="practice_start_date"></p>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="">Fin etapa practica</label>
                                                <p id="practice_end_date"></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="learners" role="tabpanel" aria-labelledby="profile-tab">
                                        <div className="row mt-3">
                                            <div className="col">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Documento</th>
                                                            <th>Nombre</th>
                                                            <th>Correo</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.learners?(
                                                            this.state.learners.length>0?(
                                                                this.state.learners.map(learner => (
                                                                    <tr key={learner.id}>
                                                                        <td>{learner.document_type} {learner.document}</td>
                                                                        <td>{learner.name}</td>
                                                                        <td>{learner.email}</td>
                                                                    </tr>
                                                                ))
                                                            ):(
                                                                <tr>
                                                                    <td>No hay datos disponibles</td>
                                                                </tr>
                                                            )
                                                        ):(
                                                            <tr>

                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
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

export default Groups;
