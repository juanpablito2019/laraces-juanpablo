import React, { Component } from 'react';
import { get, store, find, update, destroy, rules } from '../containers/InfringementTypes';
import { validate, formValid, setRules } from '../containers/Validator';
import Loader from '../components/Loader';
import VerifyPermission from '../components/VerifyPermission';

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
                        <VerifyPermission permission="create_infringement_type">
                             {/* <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Agregar tipo de infracción</a> */}
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
                <div className="row">
                    {this.state.infringementTypes.length > 0 ? (
                        this.state.infringementTypes.map(infringementType => (
                            <div className="col-12 col-md-6 col-lg-4 mb-2" key={infringementType.id}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-5 col-md-3 mr-md-3 col-lg-3 ml-lg-3">
                                                <i className="fas fa-balance-scale fa-5x text-secondary mt-1"></i>
                                            </div>
                                            <div className="col-7 ml-sm-3 col-lg-7 mr-lg-1">
                                                <h5 className="mb-4">
                                                    {
                                                        (infringementType.name).length > 13 ? (
                                                            ((infringementType.name).substring(0,13)+'...')
                                                        ) : (
                                                            infringementType.name
                                                        )
                                                    }
                                                </h5>
                                                <VerifyPermission permission="edit_infringement_type">
                                                    <a  href="#" data-id={infringementType.id} onClick={this.handleEdit} >Editar</a>
                                                </VerifyPermission>

                                                <VerifyPermission permission="delete_infringement_type">
                                                 {/* <a  href="#" data-id={infringementType.id} onClick={this.handleDelete} className="text-danger ml-3" >Eliminar</a> */}
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
