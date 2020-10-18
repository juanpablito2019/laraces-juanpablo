import React, { Component } from 'react';
import { get, rules, store, find, update, destroy, storeMass } from '../containers/FormationPrograms';
import {get as getFormationProgramTypes} from '../containers/FormationProgramTypes';
import Loader from '../components/Loader';
import VerifyPermission from '../components/VerifyPermission';
import { formValid, validate, setRules } from '../containers/Validator';

class FormationPrograms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formationPrograms: null,
            formationProgramTypes: null,
            rules: rules,
            id: null,
            edit: false,
            message: null,
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.search = this.search.bind(this);
    }

    getFormationPrograms() {
        get().then(data => {
            this.setState({ formationPrograms: data });
        })
    }

    getFormationProgramTypes(){
        getFormationProgramTypes().then(data => {
            this.setState({formationProgramTypes: data})
        })
    }

    handleUpdate() {
        this.setState({formationPrograms: null});
        storeMass().then(data => {
            if(data.success){
                this.getFormationPrograms();
            }else{
                this.getFormationPrograms();
                toastr.error('', data.message, {
                    closeButton: true
                });
            }
        })
    }

    search(e) {
        let { value } = e.target;
        let matches = this.state.formationPrograms.filter(formationProgram => {
            const rgex = new RegExp(`^${value}`, 'gi');
            return formationProgram.name.split('-')[1].trim().match(rgex);
        });
        if (value.length === 0) {
            this.getFormationPrograms();
        }
        this.setState({ formationPrograms: matches });
    }
    handleSubmit(e) {
        e.preventDefault();
        if (formValid(rules)) {
            if (this.state.edit) {
                update(e.target, this.state.id).then(data => {
                    if (data.success) {
                        this.getFormationPrograms();
                        $('.modal').modal('toggle');
                        toastr.success('', data.message, {
                            closeButton: true
                        });
                    }else{
                        this.setState({message: data.errors.code || data.errors.name});
                    }
                })
            } else {
                store(e.target).then(data => {
                    if (data.success) {
                        this.getFormationPrograms();
                        $('.modal').modal('toggle');
                        toastr.success('', data.message, {
                            closeButton: true
                        });
                    }else{
                        this.setState({message: data.errors.code || data.errors.name});
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
                            this.getFormationPrograms();
                            toastr.success('', data.message, {
                                closeButton: true
                            });
                        }
                    })
            }
        })
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
        $('.modal').find('.modal-title').text('Agregar programa de formacion');
        $('.modal').modal('toggle');
    }

    handleEdit(e) {
        let id = $(e.target).data('id');
        this.setState({ id, edit: true, message: null });
        setRules(rules, false);
        find(id).then(data => {
            $('#name').val(data.name);
            $('#code').val(data.code);
            $('#formation_program_type_id').val(data.formation_program_type_id);
            $('.modal').find('.modal-title').text('Editar programa de formacion');
            $('.modal').modal('toggle');
        })
    }

    componentDidMount() {
        this.getFormationPrograms();
        this.getFormationProgramTypes();
    }

    render() {
        const { rules } = this.state;
        if (!this.state.formationPrograms || !this.state.formationProgramTypes) {
            return (
                <Loader />
            )
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Programas</h3>
                        <VerifyPermission permission="create_formation_program">
                            <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Agregar <span className="d-none d-md-inline ">nuevo programa de formacion</span></a>
                            <a href="#" onClick={this.handleUpdate} className=""><i className="fa fa-download ml-1" aria-hidden="true"></i> Actualizar </a>
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
                        {this.state.formationPrograms.length > 0 ? (
                            this.state.formationPrograms.map(formationProgram => (
                                <div className="col-12 col-lg-4 mb-2" key={formationProgram.id}>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-3">
                                                    <i className="fas fa-shapes fa-4x text-secondary mt-3"></i>
                                                </div>
                                                <div className="col-7 ml-1">
                                                    <h5>
                                                        {
                                                            (formationProgram.name.split('-')[1]).length > 22 ? (
                                                                ((formationProgram.name.split('-')[1]).substring(0,22)+'...')
                                                            ) : (
                                                                formationProgram.name.split('-')[1]
                                                            )
                                                        }
                                                    </h5>
                                                    <h6 className="text-muted">{formationProgram.code}</h6>
                                                    <h6 className="text-muted">{formationProgram.formation_program_type.name}</h6>


                                                    <div className="row">
                                                            <VerifyPermission permission="edit_formation_program">
                                                                <a href="#" data-id={formationProgram.id} onClick={this.handleEdit}>Editar</a>
                                                            </VerifyPermission>

                                                            <VerifyPermission permission="delete_formation_program">
                                                                <a href="#" data-id={formationProgram.id} onClick={this.handleDelete} className="ml-4 text-danger">Eliminar</a>
                                                            </VerifyPermission>
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

                <div className="modal" tabIndex="-1" role="dialog">
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
                                        <label htmlFor="code">Codigo <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            name="code"
                                            id="code"
                                            className={rules.code.isInvalid && rules.code.message != '' ? 'form-control is-invalid' : 'form-control'}
                                            onInput={this.handleInput}
                                        />
                                        <div className="invalid-feedback">
                                            {rules.code.isInvalid && rules.code.message != '' ? rules.code.message : ''}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className={rules.name.isInvalid && rules.name.message != '' ? 'form-control is-invalid' : 'form-control'}
                                            onInput={this.handleInput}
                                        />
                                        <div className="invalid-feedback">
                                            {rules.name.isInvalid && rules.name.message != '' ? rules.name.message : ''}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="formation_program_type_id">Tipo de programa <span className="text-danger">*</span></label>
                                        <select
                                            name="formation_program_type_id"
                                            id="formation_program_type_id"
                                            className={rules.formation_program_type_id.isInvalid && rules.formation_program_type_id.message != ''?'form-control is-invalid':'form-control'}
                                            onInput={this.handleInput}
                                        >
                                            <option value="">Seleccion uno</option>
                                            {this.state.formationProgramTypes.length>0?(
                                                this.state.formationProgramTypes.map(formationProgramType => (
                                                    <option key={formationProgramType.id} value={formationProgramType.id}>{formationProgramType.name}</option>
                                                ))
                                            ):(
                                                <option value="">No hay tipos de programas</option>
                                            )}
                                        </select>
                                        <div className="invalid-feedback">
                                            {rules.formation_program_type_id.isInvalid && rules.formation_program_type_id.message != '' ? rules.formation_program_type_id.message : ''}
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
            </>
        )
    }
}

export default FormationPrograms;
