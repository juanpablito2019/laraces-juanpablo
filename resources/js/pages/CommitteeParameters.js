import React, { Component } from 'react';
import { get, store, find, update, destroy, rules } from '../containers/CommitteeParameters';
import { get as getCommitteeSessionStates } from '../containers/CommitteeSessionStates';
import Loader from '../components/Loader';
import { formValid, validate, setRules } from '../containers/Validator';
import Editor from '../components/Ckeditor';

class CommitteeParameters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            committeeParameters: null,
            committeeSessionStates: null,
            edit: false
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.search = this.search.bind(this);
    }

    getCommitteeParameters() {
        get().then(data => {
            this.setState({ committeeParameters: data })
        })
    }

    getCommitteeSessionStates() {
        getCommitteeSessionStates().then(data =>{
            this.setState( {committeeSessionStates: data })
        })
    }

    handleModal(){
        $('#form').trigger('reset');
        setRules(rules);
        this.setState({ message: null, edit: false });
        $('.modal').find('.modal-title').text('Crear parametro de comite');
        $('.modal').modal('toggle');
    }

    async handleEdit(e) {
        let id = $(e.target).data('id');
        setRules(rules, false);
        this.setState({ id, edit: true, message: null });
        let data = await find(id);
        $('.modal').find('.modal-title').text('Editar parametro de comite');
        $('.modal').find('#name').val(data.name);
        $('.modal').find('#type').val(data.type);
        $('.modal').modal('toggle');
    }
    search(e) {
        let { value } = e.target;
        let matchs = this.state.committeeParameters.filter(committeeParameter => {
            const rgex = new RegExp(`^${value}`, 'gi');
            return committeeParameter.name.match(rgex) || committeeParameter.committee_session_state.name.match(rgex)
        });
        if (value.length === 0) {
            this.getCommitteeParameters();
        }
        this.setState({ committeeParameters: matchs });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (formValid(rules)) {
            if (this.state.edit) {
                update(e.target, this.state.id).then(data => {
                    if (data.success) {
                        this.getCommitteeParameters();
                        $('.modal').modal('toggle');
                    }
                })
            } else {
                store(e.target).then(data => {
                    if (data.success) {
                        this.getCommitteeParameters();
                        $('.modal').modal('toggle');
                    }
                });
            }
        } else {
            console.log(rules.name);
            console.log(rules.content);
            console.log(rules.comitte_session_state_id);
            this.setState({ message: 'Por favor completa el formulario' })
        }
    }

    async handleDelete(e) {
        let id = $(e.target).data('id');
        let res = confirm('¿Estas seguro de eliminar este parametro de comite?');
        if (res) {
            let data = await destroy(id);
            this.getCommitteeParameters();
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
                        <h3>Parametros comite</h3>
                        <a href="#" onClick={this.handleModal}>Agregar nuevo parametro</a>
                    </div>
                    <div className="col-3">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <button className="btn btn-outline-primary" type="button" id="button-addon1">Buscar</button>
                            </div>
                            <input type="text" className="form-control" onInput={this.search} />
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <table className="table table-striped display nowrap" id="tabla">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Contenido</th>
                                    <th scope="col">Nombre de la seccion de comite</th>
                                    <th scope="col">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.committeeParameters.length > 0 ? (
                                this.state.committeeParameters.map(committeeParameter => (
                                    <tr key={committeeParameter.id}>
                                        <td>{committeeParameter.name}</td>
                                        <td>{committeeParameter.content}</td>
                                        <td>{committeeParameter.committee_session_state.name}</td>
                                        <td>
                                        <button type="button" data-id={committeeParameter.id} onClick={this.handleEdit} className="btn btn-link">Editar</button>
                                        <button type="button" data-id={committeeParameter.id} onClick={this.handleDelete} className="btn btn-link text-danger">Eliminar</button>
                                        </td>
                                    </tr>
                                    
                                ))
                            ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">No hay datos disponibles</td>
                                    </tr>
                                )}
                                </tbody>
                        </table>
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
                                            <div className="col">
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
                                            <div className="col">
                                                <label htmlFor="comitte_session_state_id">Nombre sesión comite <span className="text-danger">*</span></label>
                                                <select 
                                                    name="comitte_session_state_id" 
                                                    id="comitte_session_state_id" 
                                                    className={rules.comitte_session_state_id.isInvalid && rules.comitte_session_state_id.message != ''?'form-control is-invalid':'form-control'}
                                                    onInput={this.handleInput}>
                                                    <option value="">Selecciona uno</option>
                                                    {this.state.committeeSessionStates.length>0?(
                                                        this.state.committeeSessionStates.map(committeeSessionState => (
                                                            <option key={committeeSessionState.id} value={committeeSessionState.id}>{committeeSessionState.name}</option>
                                                        ))
                                                    ):(
                                                        <option value="">No hay parametros</option>
                                                    )}
                                                </select>
                                                <div className="invalid-feedback">
                                                    {rules.comitte_session_state_id.isInvalid && rules.comitte_session_state_id.message != '' ? rules.comitte_session_state_id.message : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row">
                                            <div className="col">
                                                <label htmlFor="content">Contenido <span className="text-danger">*</span></label>
                                                <Editor/>
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