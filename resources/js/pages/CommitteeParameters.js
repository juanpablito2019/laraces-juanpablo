import React, { Component } from 'react';
import { get, store, find, update, destroy, rules } from '../containers/CommitteeParameters';
import { get as getCommitteeSessionStates } from '../containers/CommitteeSessionStates';
import Loader from '../components/Loader';
import { formValid, validate, setRules } from '../containers/Validator';
import Ckeditor from '../components/Ckeditor';
import DataTable from '../components/DataTable';

class CommitteeParameters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            committeeParameters: null,
            committeeSessionStates: null,
            edit: false,
            ckdata: "",
            ckreset: false
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    async getCommitteeParameters() {
        this.setState({ committeeParameters: null })
        let data = await get();
        this.setState({ committeeParameters: data })
    }

    getCommitteeSessionStates() {
        getCommitteeSessionStates().then(data =>{
            this.setState( {committeeSessionStates: data })
        })
    }

    handleModal(){
        $('#form').trigger('reset');
        setRules(rules);
        this.setState({ ckdata: "",message: null, edit: false });
        $('.modal').find('.modal-title').text('Crear parámetro de acta');
        $('.modal').modal('toggle');
    }

    async handleEdit(e) {
        let id = $(e.target).data('id');
        let data = await find(id);
        this.setState({ ckdata: data.content, ckreset: false,id, edit: true, message: null });
        setRules(rules, false);
        find(id).then(data => {
            $('#name').val(data.name);
            $('#content').val(data.content);
            $('#committee_session_state_id').val(data.committee_session_state_id);
            $('.modal').find('.modal-title').text('Editar parámetro de acta');
            $('.modal').modal('toggle');
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (formValid(rules)) {
            if (this.state.edit) {
                let data = await update(e.target, this.state.id);
                if (data.success) {
                    $('#modal').modal('hide');
                    setTimeout(async () => {
                        await this.getCommitteeParameters();
                    }, 100);
                    toastr.success('', data.message, {
                        closeButton: true
                    });
                } else {
                    this.setState({ message: data.errors.name })
                }
            } else {
                let data = await store(e.target);
                if (data.success) {
                    $('#modal').modal('hide');
                    setTimeout(async () => {
                        await this.getCommitteeParameters();
                    }, 100);
                    toastr.success('', data.message, {
                        closeButton: true
                    });
                } else {
                    this.setState({ message: data.errors.name || data.errors.content })
                }
            }
        } else {
            this.setState({ message: 'Por favor completa el formulario' })
        }
    }

    handleDelete(e) {
        let id = $(e.target).data('id');
        let res = confirm('¿Estas seguro que deseas eliminar este parámetro de acta?');
        if (res) {
            destroy(id).then(data => {
                if (data.success) {
                    this.getCommitteeParameters();
                    toastr.success('', data.message, {
                        closeButton: true
                    });
                }else {
                    toastr.error('', data.message, {
                        closeButton: true
                    });
                }
            })
        }
    }

    handleInput(e) {
        let { name, value } = e.target;
        let newRules = validate(name, value, rules)
        this.setState({ rules: newRules });
    }

    componentDidMount(){
        this.getCommitteeParameters();
        this.getCommitteeSessionStates();
    }
    render() {
        if(!this.state.committeeParameters || !this.state.committeeSessionStates ) {
            return (
                <Loader />
            )
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Parámetros de acta</h3>
                        <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Agregar nuevo parámetro</a>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">   
                        <DataTable>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th className="hide">Contenido</th>
                                    <th className="hide">Nombre del acta</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.committeeParameters.map(committeeParameter => (
                                <tr key={committeeParameter.id}>
                                    <td>{committeeParameter.name}</td>
                                    <td className="hide">{$(committeeParameter.content).text()}</td>
                                    <td className="hide">{committeeParameter.committee_session_state.name}</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button data-id={committeeParameter.id} onClick={this.handleEdit} className="btn btn-sm btn-outline-primary">Editar</button>
                                            <button data-id={committeeParameter.id} onClick={this.handleDelete} className="btn btn-sm btn-outline-danger">Eliminar</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </DataTable>
                    </div>
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
                                        <div className="form-row">
                                            <div className="col-12">
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
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row">
                                            <div className="col-12">
                                                <label htmlFor="committee_session_state_id">Nombre acta <span className="text-danger">*</span></label>
                                                <select
                                                    name="committee_session_state_id"
                                                    id="committee_session_state_id"
                                                    className={rules.committee_session_state_id.isInvalid && rules.committee_session_state_id.message != ''?'form-control is-invalid':'form-control'}
                                                    onInput={this.handleInput}
                                                >
                                                    <option value="">Seleccion uno</option>
                                                    {this.state.committeeSessionStates.length>0?(
                                                        this.state.committeeSessionStates.map(committeeSessionState => (
                                                            <option key={committeeSessionState.id} value={committeeSessionState.id}>{committeeSessionState.name}</option>
                                                        ))
                                                    ):(
                                                        <option value="">No hay tipos de programas</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row">
                                            <div className="col">
                                                <label htmlFor="">Contenido
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <Ckeditor
                                                    name="content"
                                                    id="content"
                                                    data={this.state.ckdata}
                                                    reset={this.state.ckreset}
                                                    options={['heading','bold','italic','blockQuote','bulletedList','numberedList','undo','redo']}
                                                />
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
        );
    }
}
export default CommitteeParameters;