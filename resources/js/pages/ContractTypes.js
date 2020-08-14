import React, { Component } from 'react';
import { get, store, find, update, destroy, rules } from '../containers/ContractTypes';
import { validate, formValid, setRules } from '../containers/Validator';
import Loader from '../components/Loader';

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
    }

    async getContractTypes() {
        let data = await get();
        this.setState({ contractTypes: data });
    }

    handleInput(e) {
        let { name, value } = e.target;
        let newRules = validate(name, value, rules)
        this.setState({ rules: newRules });
    }

    async handleEdit(e) {
        let id = $(e.target).data('id');
        this.setState({ edit: true });
        this.setState({ id });
        let data = await find(id);
        $('.modal').find('.modal-title').text('Editar cargo');
        $('.modal').find('#name').val(data.name);
        $('.modal').modal('toggle');
    }

    handleModal() {
        this.setState({ edit: false });
        setRules(rules);
        this.setState({ message: 'Te recomendamos actualizar antes de agregar' , edit: false});
        $('.modal').find('.modal-title').text('Agregar cargo');
        $('.modal').modal('toggle');
    }
    async handleDelete(e) {
        let id = $(e.target).data('id');
        let res = confirm('¿Estas seguro de eliminar este cargo?');
        if (res) {
            let data = await destroy(id);
            this.getContractTypes();
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (formValid(rules)){
            if (this.state.edit) {
                let data = await update(e.target, this.state.id);
                $('.modal').modal('toggle');
                await this.getContractTypes();
                this.setState({ edit: false });
            } else {
                let data = await store(e.target);
                if (data.errors) {
                    if (data.errors.name) {
                        $('input#name').addClass('is-invalid');
                        $('#errorName').text(data.errors.name);
                    }
                }
                if (data.success) {
                    $('.modal').modal('toggle');
                    await this.getContractTypes();
                }
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
        if (!this.state.contractTypes) {
            return (
                <Loader />
            )
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Tipos de contratos</h3>
                        <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i>Agregar nuevo contrato</a>
                    </div>
                </div>
                <div className="row mt-3">
                    {this.state.contractTypes.length > 0 ? (
                        this.state.contractTypes.map(contractType => (
                            <div className="col-12 col-md-6 col-lg-4 mb-2" key={contractType.id}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <h5>{contractType.name}</h5>
                                                <a  href="#" data-id={contractType.id} onClick={this.handleEdit} >Editar</a>
                                                <a  href="#" data-id={contractType.id} onClick={this.handleDelete} className="text-danger ml-3" >Eliminar</a>
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
                                <form id="form" onSubmit={this.handleSubmit}>
                                    {this.state.message ? (
                                        <div className="alert alert-info" role="alert">
                                            <span><i className="fa fa-info-circle" aria-hidden="true"></i> {this.state.message}</span>
                                        </div>
                                        ):(
                                            <div></div>
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
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
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
