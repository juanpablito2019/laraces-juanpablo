import React, { Component } from 'react';
import { get, store, find, update, destroy, rules } from '../containers/ResponsiblesFormativeMeasures';
import { get as getContractType } from '../containers/ContractTypes';
import { get as getPosition } from '../containers/Positions';
import { validate, formValid, setRules } from '../containers/Validator';
import Loader from '../components/Loader';

class ResponsiblesFormativeMeasures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responsibles: null,
            edit: false,
            id: null,
            rules: rules,
            message:null,
            columns:[
                {
                    title:'Nombre', data:'username'
                },
                {
                    title:'Correo Misena', data:'misena_email'
                },
                {
                    title:'Documento', data:'document'
                },
                {
                    title:'Telefono', data:'phone'
                },
                {
                    title:'Acciones', data:'actions'
                }
            ]
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    async getResponsibles() {
        let data = await get();
        this.setState({ responsibles: data });
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
        $('.modal').find('.modal-title').text('Editar responsable');
        $('.modal').find('#username').val(data.username);
        $('.modal').find('#misena_email').val(data.misena_email);
        $('.modal').find('#institutional_email').val(data.institutional_email);
        $('.modal').find('#document_type').val(data.document_type);
        $('.modal').find('#document').val(data.document);
        $('.modal').find('#birthdate').val(data.birthdate);
        $('.modal').find('#phone').val(data.phone);
        $('.modal').find('#phone_ip').val(data.phone_ip);
        $('.modal').find('#gender').val(data.gender);
        $('.modal').find('#position_id').val(data.position_id);
        $('.modal').find('#contract_type_id').val(data.contract_type_id);
        $('.modal').find('#type').val(data.type);
        $('.modal').find('#photo').val(data.photo);
        $('.modal').find('#state').val(data.state);
        $('.modal').modal('toggle');
    }

    handleModal() {
        this.setState({ edit: false });
        $('.modal').find('.modal-title').text('Agregar responsable');
        $('.modal').modal('toggle');
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
        if (this.state.edit) {
            let data = await update(e.target, this.state.id);
            console.log(data);
            $('.modal').modal('toggle');
            await this.getResponsibles();
            this.setState({ edit: false });
        } else {
            let data = await store(e.target);
            if (data.errors) {
                if (data.errors.name) {
                    $('input#name').addClass('is-invalid');
                    $('#errorName').text(data.errors.name);
                }
                if (data.errors.type) {
                    $('input#type').addClass('is-invalid');
                    $('#errorType').text(data.errors.type);
                }
            }
            if (data.success) {
                $('.modal').modal('toggle');
                await this.getPositions();
            }
        }
    }

    componentDidMount() {
        this.getResponsibles();
    }

    render() {
        const { rules } = this.state;
        if (!this.state.responsibles) {
            return (
                <Loader />
            )
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Responsables</h3>
                        <a href="#" onClick={this.handleModal}>Agregar nuevo responsable</a>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                    </div>
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

export default ResponsiblesFormativeMeasures;
