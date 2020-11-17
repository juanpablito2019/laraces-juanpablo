import React, { Component } from 'react';
import { get, store, find, update, destroy, rules } from '../containers/Sanctions';
import { formValid, validate, setRules } from '../containers/Validator';
import Loader from '../components/Loader';
import VerifyPermission from '../components/VerifyPermission';
import DataTable from '../components/DataTable';

class Sanctions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sanctions: null,
            edit: false,
            id: null,
            rules: rules,
            message: null
        }
        this.handleModal = this.handleModal.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.search = this.search.bind(this);
    }
    async getSanctions() {
        let data = await get();
        this.setState( {sanctions: data })
    }

    handleInput(e) {
        let { name, value } = e.target;
        let newRules = validate(name, value, rules)
        this.setState({ rules: newRules });
    }

    handleModal(){
        $('#form').trigger('reset');
        setRules(rules);
        this.setState({ message: null, edit: false });
        $('.modal').find('.modal-title').text('Agregar sanción');
        $('.modal').modal('toggle');
    }

    async handleEdit(e) {
        let id = $(e.target).data('id');
        setRules(rules, false);
        this.setState({ id, edit: true, message: null });
        let data = await find(id);
        $('.modal').find('.modal-title').text('Editar sanción');
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
                            this.getSanctions();
                            toastr.success('', data.message, {
                                closeButton: true
                            });
                        }
                    })
            }
        })
    }

    search(e) {
        let { value } = e.target;
        let matches = this.state.sanctions.filter(sanction => {
            const rgex = new RegExp(`^${value}`, 'gi');
            return sanction.name.match(rgex);
        });
        if (value.length === 0) {
            this.getSanctions();
        }
        this.setState({ sanctions: matches });
    }
    handleSubmit(e) {
        e.preventDefault();
        if (formValid(rules)) {
            if (this.state.edit) {
                update(e.target, this.state.id).then(data => {
                    if (data.success) {
                        this.getSanctions();
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
                        this.getSanctions();
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

    componentDidMount(){
        this.getSanctions();
    }

    render() {
        if(!this.state.sanctions) {
            return (
                <Loader />
            )
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Sanciones</h3>
                        <VerifyPermission permission="create_sanction">
                            <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Agregar nueva sanción</a>
                        </VerifyPermission>
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
                            {this.state.sanctions.length > 0 ? (
                                    this.state.sanctions.map((sanction ) => (
                                        <tr key={sanction.id}>
                                            <td >{sanction.name}</td>
                                            <td>
                                                <div className="btn-group" role="sanction" aria-label="Basic example">
                                                    <VerifyPermission permission="edit_sanction">
                                                        <button data-id={sanction.id} onClick={this.handleEdit} className="btn btn-sm btn-outline-primary"><i  data-id={sanction.id} className="far fa-edit d-sm-block d-md-none"></i><span data-id={sanction.id} className="d-none d-md-inline">Editar</span></button>
                                                    </VerifyPermission>

                                                    <VerifyPermission permission="delete_sanction">
                                                        <button data-id={sanction.id} onClick={this.handleDelete} className="btn btn-sm btn-outline-danger"><i data-id={sanction.id} className="far fa-trash-alt d-sm-block d-md-none"></i><span data-id={sanction.id} className="d-none d-md-inline">Eliminar</span></button>
                                                    </VerifyPermission>
                                                </div>
                                            </td>
                                        </tr>
                                    ))): (
                                        <td className="col">
                                            <p>No hay sanciones disponibles</p>
                                        </td>
                                    )}

                            </tbody>
                        </DataTable>
                    </div>
                </div>

                <div className="modal fade" tabIndex="-1" data-backdrop="static">
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
export default Sanctions;
