import React, { Component } from 'react';
import { get, store, find, update, destroy, rules } from '../containers/FormativeMeasures';
import { formValid, validate, setRules } from '../containers/Validator';
import Loader from '../components/Loader';
import VerifyPermissions from '../components/VerifyPermission';

class FormativeMeasures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formativeMeasures: null,
            edit: false,
            id: null,
            rules: rules
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.search = this.search.bind(this);
    }

    async getFormativeMeasures() {
        let data = await get();
        this.setState({ formativeMeasures: data });
    }

    handleInput(e) {
        let { name, value } = e.target;
        let newRules = validate(name, value, rules)
        this.setState({ rules: newRules });
    }

    search(e) {
        let { value } = e.target;
        let matches = this.state.formativeMeasures.filter(formativeMeasure => {
            const rgex = new RegExp(`^${value}`, 'gi');
            return formativeMeasure.name.match(rgex);
        });
        if (value.length === 0) {
            this.getFormativeMeasures();
        }
        this.setState({ formativeMeasures: matches });
    }

    handleModal() {
        setRules(rules);
        $('#form').trigger('reset');
        this.setState({ message: '', edit: false });
        $('.modal').find('.modal-title').text('Agregar medida formativa');
        $('.modal').modal('toggle');
    }

    async handleEdit(e) {
        let id = $(e.target).data('id');
        setRules(rules, false);
        this.setState({ id, edit: true, message: null });
        let data = await find(id);
        $('.modal').find('.modal-title').text('Editar medida formativa');
        $('.modal').find('#name').val(data.name);
        $('.modal').modal('toggle');
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
                            this.getFormativeMeasures();
                            toastr.success('', data.message, {
                                closeButton: true
                            });
                        }
                    })
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        if (formValid(rules)) {
            if (this.state.edit) {
                update(e.target, this.state.id).then(data => {
                    if (data.success) {
                        this.getFormativeMeasures();
                        $('.modal').modal('toggle');
                        toastr.success('', data.message, {
                            closeButton: true
                        });
                    }else{
                        this.setState({ message: data.errors.name })
                    }
                })
            } else {
                store(e.target).then(data => {
                    if (data.success) {
                        this.getFormativeMeasures();
                        $('.modal').modal('toggle');
                        toastr.success('', data.message, {
                            closeButton: true
                        });
                    }else{
                        this.setState({ message: data.errors.name })
                    }
                });
            }
        } else {
            this.setState({ message: 'Por favor completa el formulario' })
        }
    }

    componentDidMount() {
        this.getFormativeMeasures();
    }

    render() {
        const { rules } = this.state;
        if (!this.state.formativeMeasures) {
            return (
                <Loader />
            )
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Medida formativa</h3>
                        <VerifyPermissions permission="create_formative_measure">
                            <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Agregar nueva medida formativa</a>
                        </VerifyPermissions>
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
                    {this.state.formativeMeasures.length > 0 ? (
                        this.state.formativeMeasures.map(formativeMeasure => (
                            <div className="col-12 col-md-6 col-lg-4 mb-2" key={formativeMeasure.id}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-5 col-md-3 mr-md-3 col-lg-3 ml-lg-3">
                                                <i className="fas fa-calendar-check fa-5x text-secondary mt-2"></i>
                                            </div>
                                            <div className="col-7 ml-sm-3 col-lg-7 mr-lg-1">
                                                <h5 className="mb-4">
                                                    {
                                                        (formativeMeasure.name).length > 16 ? (
                                                            ((formativeMeasure.name).substring(0,16)+'...')
                                                        ) : (
                                                            formativeMeasure.name
                                                        )
                                                    }
                                                </h5>

                                                <div className="row ml-1">
                                                    <VerifyPermissions permission="edit_formative_measure">
                                                        <a href="#" data-id={formativeMeasure.id} onClick={this.handleEdit}>Editar</a>
                                                    </VerifyPermissions>

                                                    <VerifyPermissions permission="delete_formative_measure">
                                                        <a href="#" data-id={formativeMeasure.id} onClick={this.handleDelete} className="text-danger ml-3">Eliminar</a>
                                                    </VerifyPermissions>
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
                <div className="modal" tabIndex="-1" data-backdrop="static">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="form" onSubmit={this.handleSubmit}>
                                    {this.state.message ? (
                                        <div className="alert alert-info" role="alert">
                                            <span><i className="fa fa-info-circle" aria-hidden="true"></i> {this.state.message}</span>
                                        </div>
                                    ) : (
                                            <div className=""></div>
                                        )}
                                    <div className="form-group">
                                        <label htmlFor="">Nombre <span className="text-danger">*</span></label>
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
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button type="submit" form="form" className="btn btn-primary">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default FormativeMeasures;
