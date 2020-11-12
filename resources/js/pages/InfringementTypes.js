import React, { Component } from 'react';
import { get, store, find, update, destroy, rules } from '../containers/InfringementTypes';
import { validate, formValid, setRules } from '../containers/Validator';
import Loader from '../components/Loader';
import VerifyPermissions from '../components/VerifyPermission';
import DataTable from '../components/DataTable';

class InfringementTypes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infringementTypes: null,
            edit: false,
            id: null,
            message:null,
            rules: rules
        }
        this.handleEdit = this.handleEdit.bind(this);
        // this.handleModal = this.handleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleDelete = this.handleDelete.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.search = this.search.bind(this);
    }

    async getInfringementTypes() {
        let data = await get();
        this.setState({ infringementTypes: data });
    }

    handleInput(e) {
        let { name, value } = e.target;
        let newRules = validate(name, value, rules);
        this.setState({ rules: newRules });
    }

    async handleEdit(e) {
        let id = $(e.target).data('id');
        setRules(rules, false);
        this.setState({ id, edit: true, message: null });
        let data = await find(id);
        $('.modal').find('.modal-title').text('Editar Tipo de Infracción');
        $('.modal').find('#name').val(data.name);
        $('.modal').modal('toggle');
    }

    // handleModal() {
    //     this.setState({ edit: false });
    //     setRules(rules);
    //     this.setState({ message: false, edit: false });
    //     $('#form').trigger('reset');
    //     $('.modal').find('.modal-title').text('Agregar Tipo de Infracción');
    //     $('.modal').modal('toggle');
    // }

    // async handleDelete(e) {
    //     let id = $(e.target).data('id');
    //     let res = confirm('¿Estás seguro de eliminar este Tipo de Falta?');
    //     if (res) {
    //         let data = await destroy(id);
    //         this.getInfringementTypes();
    //     }
    // }

    search(e) {
        let { value } = e.target;
        let matches = this.state.infringementTypes.filter(infringementType => {
            const rgex = new RegExp(`^${value}`, 'gi');
            return infringementType.name.match(rgex);
        });
        if (value.length === 0) {
            this.getInfringementTypes();
        }
        this.setState({ infringementTypes: matches });
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (formValid(rules)) {
            if (this.state.edit) {
                let data = await update(e.target, this.state.id);
                if (data.success) {
                    this.getInfringementTypes();
                    $('.modal').modal('toggle');
                    toastr.success('', data.message, {
                        closeButton: true
                    });
                } else {
                    this.setState({ message: data.errors.name })
                }
            } else {
                // store(e.target).then(data => {
                //     if (data.success) {
                //         this.getInfringementTypes();
                //         $('.modal').modal('toggle');
                //     } else {
                //         this.setState({ message: data.errors.name })
                //     }
                // })
            }
        } else {
            this.setState({ message: 'Por favor completa el formulario' });
        }
    }

    componentDidMount() {
        this.getInfringementTypes();
    }

    render() {
        const { rules } = this.state;
        if (!this.state.infringementTypes) {
            return (
                <Loader />
            )
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Tipos de faltas</h3>
                        <VerifyPermissions permission="create_infringement_type">
                             {/* <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Agregar tipo de infracción</a> */}
                        </VerifyPermissions>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <DataTable>
                            <thead>
                                <tr>
                                    <th >Nombre</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.infringementTypes.length > 0 ? (
                                    this.state.infringementTypes.map((infringementType ) => (
                                        <tr key={infringementType.id}>
                                            <td >{infringementType.name}</td>
                                            <td>
                                                <div className="btn-group" role="infringementType" aria-label="Basic example">
                                                    <VerifyPermissions permission="edit_infringement_type">
                                                        <button data-id={infringementType.id} onClick={this.handleEdit} className="btn btn-sm btn-outline-primary"><i  data-id={infringementType.id} className="far fa-edit d-sm-block d-md-none"></i><span data-id={infringementType.id} className="d-none d-md-inline">Editar</span></button>
                                                    </VerifyPermissions>

                                                    <VerifyPermissions permission="delete_infringement_type">
                                                        {/* <button data-id={infringementType.id} onClick={this.handleDelete} className="btn btn-sm btn-outline-danger"><i data-id={infringementType.id} className="far fa-trash-alt d-sm-block d-md-none"></i><span data-id={infringementType.id} className="d-none d-md-inline">Eliminar</span></button> */}
                                                    </VerifyPermissions>
                                                </div>
                                            </td>
                                        </tr>
                                    ))): (
                                        <td className="col">
                                            <p>No hay parametros de actas disponibles</p>
                                        </td>
                                    )}

                            </tbody>
                        </DataTable>
                    </div>
                </div>

                {/* Modal Create */}
                <div className="modal fade" tabIndex="-1" role="dialog" data-backdrop="static">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="form" onSubmit={this.handleSubmit} autoComplete="off">
                                    {this.state.message ? (
                                        <div className="alert alert-info" role="alert">
                                            <span><i className="fa fa-info-circle" aria-hidden="true"></i> {this.state.message}</span>
                                        </div>
                                        ):(
                                            <div></div>
                                        )}

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

export default InfringementTypes;
