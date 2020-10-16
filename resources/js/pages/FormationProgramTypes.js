import React, { Component } from 'react';
import { get, rules, store, find, update, destroy, storeMass } from '../containers/FormationProgramTypes';
import Loader from '../components/Loader';
import SetPermissions from '../components/SetPermissions';
import { formValid, validate, setRules } from '../containers/Validator';

class FormationProgramTypes extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            this.setState({ formationProgramTypes: data });
        })
    }

    handleUpdate() {
        this.setState({formationProgramTypes: null});
        storeMass().then(data => {
            this.getFormationPrograms();
        })
    }

    search(e) {
        let { value } = e.target;
        let matches = this.state.formationProgramTypes.filter(formationProgramType => {
            const rgex = new RegExp(`^${value}`, 'gi');
            return formationProgramType.name.match(rgex);
        });
        if (value.length === 0) {
            this.getFormationPrograms();
        }
        this.setState({ formationProgramTypes: matches });
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
                        this.setState({message: data.errors.name || data.errors.elective_months || data.errors.practice_months})
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
        $('.modal').find('.modal-title').text('Agregar tipo de programa de formacion');
        $('.modal').modal('toggle');
    }

    handleEdit(e) {
        let id = $(e.target).data('id');
        this.setState({ id, edit: true, message: null });
        find(id).then(data => {
            rules.name.isInvalid = false;
            rules.elective_months.isInvalid = false;
            rules.practice_months.isInvalid = false;
            $('#name').val(data.name);
            $('#elective_months').val(data.elective_months);
            $('#practice_months').val(data.practice_months);
            $('.modal').find('.modal-title').text('Editar tipo de programa de formacion');
            $('.modal').modal('toggle');
        })
    }

    componentDidMount() {
        this.getFormationPrograms();
    }

    render() {
        const { rules } = this.state;
        if (!this.state.formationProgramTypes) {
            return (
                <Loader />
            )
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Tipos de programas</h3>
                        <SetPermissions permis="create_formation_program_type">
                            <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Agregar <span className="d-none d-md-inline ">nuevo tipo de programa</span></a>
                            <a href="#" onClick={this.handleUpdate} className=""><i className="fa fa-download ml-1" aria-hidden="true"></i> Actualizar </a>
                        </SetPermissions>

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
                    {this.state.formationProgramTypes.length > 0 ? (
                        this.state.formationProgramTypes.map(formationProgramType => (
                            <div className="col-12 col-md-6 mb-2" key={formationProgramType.id}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-3">
                                                <i className="fas fa-shapes fa-5x text-secondary mt-2"></i>
                                            </div>
                                            <div className="col">
                                                <h5>
                                                    {
                                                        (formationProgramType.name).length > 20 ? (
                                                            ((formationProgramType.name).substring(0,20)+'...')
                                                        ) : (
                                                            formationProgramType.name
                                                        )
                                                    }
                                                </h5>
                                                <h6 className="text-muted">Mesese electivos: {formationProgramType.elective_months}</h6>
                                                <h6 className="text-muted">Mesese practicos: {formationProgramType.practice_months}</h6>

                                                <SetPermissions permis="edit_formation_program_type">
                                                <a href="#" data-id={formationProgramType.id} onClick={this.handleEdit}>Editar</a>

                                                </SetPermissions>

                                                <SetPermissions permis="delete_formation_program_type">
                                                    <a href="#" data-id={formationProgramType.id} onClick={this.handleDelete} className="ml-4 text-danger">Eliminar</a>
                                                </SetPermissions>
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
                                        <label htmlFor="name">Nombre</label>
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
                                        <div className="form-row">
                                            <div className="col">
                                                <label htmlFor="elective_months">Meses electivos</label>
                                                <input
                                                    type="number"
                                                    name="elective_months"
                                                    id="elective_months"
                                                    className={rules.elective_months.isInvalid && rules.elective_months.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                    onInput={this.handleInput}
                                                />
                                                <div className="invalid-feedback">
                                                    {rules.elective_months.isInvalid && rules.elective_months.message != '' ? rules.elective_months.message : ''}
                                                </div>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="practice_months">Meses practicos</label>
                                                <input
                                                    type="number"
                                                    name="practice_months"
                                                    id="practice_months"
                                                    className={rules.practice_months.isInvalid && rules.practice_months.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                    onInput={this.handleInput}
                                                />
                                                <div className="invalid-feedback">
                                                    {rules.practice_months.isInvalid && rules.practice_months.message != '' ? rules.practice_months.message : ''}
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
            </>
        )
    }
}

export default FormationProgramTypes;
