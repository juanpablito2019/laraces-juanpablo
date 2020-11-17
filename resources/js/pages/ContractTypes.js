import React, { Component } from 'react';
import { get, store, find, update, destroy, rules,storeMass } from '../containers/ContractTypes';
import { validate, formValid, setRules } from '../containers/Validator';
import Loader from '../components/Loader';
import VerifyPermissions from '../components/VerifyPermission';
import DataTable from '../components/DataTable';


class ContractTypes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contractTypes: null,
            edit: false,
            id: null,
            message:null,
            rules: rules
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.search = this.search.bind(this);
    }

    async getContractTypes() {
        let data = await get();

        this.setState({ contractTypes: data });
    }


    search(e) {
        let { value } = e.target;
        let matchs = this.state.contractTypes.filter(contractType => {
            const rgex = new RegExp(`^${value}`, 'gi');
            return contractType.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").match(rgex)
        });
        if (value.length === 0) {
            this.getContractTypes();
        }
        this.setState({ contractTypes: matchs });
    }

    handleUpdate() {
        this.setState({ contractTypes: null });
        storeMass().then(data => {
            if(data.success){
                this.getContractTypes();
            }
        })
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
        $('.modal').find('.modal-title').text('Editar contrato');
        $('.modal').find('#name').val(data.name);
        $('.modal').modal('toggle');
    }

    handleModal() {
        $('#form').trigger('reset');
        setRules(rules);
        this.setState({ message: 'Te recomendamos actualizar antes de agregar' ,
         edit: false
        });
        $('.modal').find('.modal-title').text('Agregar contrato');
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
                            this.getContractTypes();
                            toastr.success('', data.message, {
                                closeButton: true
                            });
                        }
                    })
            }
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (formValid(rules)) {
            if (this.state.edit) {
                let data = await update(e.target, this.state.id);
                if (data.success) {
                    this.getContractTypes();
                    $('.modal').modal('toggle');
                    toastr.success('', data.message, {
                        closeButton: true
                    });
                }else{
                    this.setState({message: data.errors.name})
                }
            } else {
                store(e.target).then(data => {
                    if (data.success) {
                        this.getContractTypes();
                        $('.modal').modal('toggle');
                        toastr.success('', data.message, {
                            closeButton: true
                        });
                    }else{
                        this.setState({message: data.errors.name})
                    }
                });
            }
        }else{
            this.setState({message:'Por favor completa el formulario'});
        }

    }


    componentDidMount() {
        this.getContractTypes();

    }

    render() {
        const { rules } = this.state;
        if (!this.state.contractTypes && !this.state.permissions) {
            return (
                <Loader />
            )
        }

        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Tipos de contratos</h3>
                        <VerifyPermissions permission="create_contract_type">
                             <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Agregar <span className="d-none d-md-inline ">nuevo contrato</span></a>
                            <a href="#" onClick={this.handleUpdate} className="ml-3"><i className="fa fa-download" aria-hidden="true"></i> Actualizar </a>
                        </VerifyPermissions>

                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <DataTable>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.contractTypes.length > 0 ? (
                                    this.state.contractTypes.map((contractType ) => (
                                        <tr key={contractType.id}>
                                            <td>{contractType.name}</td>
                                            <td>
                                                <div className="btn-group" role="contractType" aria-label="Basic example">
                                                    <VerifyPermissions permission="edit_contract_type">
                                                        <button data-id={contractType.id} onClick={this.handleEdit} className="btn btn-sm btn-outline-primary"><i  data-id={contractType.id} className="far fa-edit d-sm-block d-md-none"></i><span data-id={contractType.id} className="d-none d-md-inline">Editar</span></button>
                                                    </VerifyPermissions>

                                                    <VerifyPermissions permission="delete_contract_type">
                                                        <button data-id={contractType.id} onClick={this.handleDelete} className="btn btn-sm btn-outline-danger"><i data-id={contractType.id} className="far fa-trash-alt d-sm-block d-md-none"></i><span data-id={contractType.id} className="d-none d-md-inline">Eliminar</span></button>
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

                <div className="modal fade" data-backdrop="static" tabIndex="-1" role="dialog">
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
                                        <label htmlFor="">Nombre</label>
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
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="submit" form="form" className="btn btn-primary">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ContractTypes;
