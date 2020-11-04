import React, { Component } from 'react';
import { get, find, update, rules } from '../containers/GeneralParameters';
import { formValid, validate, setRules } from '../containers/Validator';
import Loader from '../components/Loader';
import VerifyPermissions from '../components/VerifyPermission';
import DataTable from '../components/DataTable';

class GeneralParameters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            generalParameters: null,
            edit: false,
            id: null,
            message: null,
            rules: rules
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.search = this.search.bind(this);
    }

    async getGeneralParameters() {
        let data = await get();
        this.setState({ generalParameters: data });
    }

    search(e) {
        let { value } = e.target;
        let matches = this.state.generalParameters.filter(generalParameter => {
            const rgex = new RegExp(`^${value}`, 'gi');
            return generalParameter.name.match(rgex);
        });
        if (value.length === 0) {
            this.getGeneralParameters();
        }
        this.setState({ generalParameters: matches });
    }

    async handleEdit(e) {

        let id = $(e.target).data('id');
        this.setState({ edit: true, id });
        setRules(rules,false);

        let data = await find(id);
        if(data.content != null){
            find(id).then(data => {
                $('.modal').find('.modal-title').text('Editar parámetro general');
                $('.modal').find('#name').val(data.name);
                $('.modal').find('#content').val(data.content);
                $('.modal').modal('toggle');
            })
        }else{
            find(id).then(data => {
                $('.modal').find('.modal-title').text('Editar parámetro general');
                $('.modal').find('#name').val(data.name);
                $('.modal').modal('toggle');
            })
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (formValid(rules)) {
            if (this.state.edit) {
                let data = await update(e.target, this.state.id);
                if (data.success) {
                    this.getGeneralParameters();
                    $('.modal').modal('toggle');
                    toastr.success('', data.message, {
                        closeButton: true
                    });
                } else {
                    this.setState({ message: data.errors.name })
                }
            }
        } else {
            this.setState({ message: 'Por favor completa el formulario' })
        }
    }

    handleInput(e) {
        let { name, value } = e.target;
        let newRules = validate(name, value, rules)
        this.setState({ rules: newRules });
    }

    componentDidMount() {
        this.getGeneralParameters();
    }

    render() {
        if (!this.state.generalParameters) {
            return (
            <Loader />
            )
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Parametros generales</h3>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <DataTable>
                            <thead>
                                <tr>
                                    <th className="hide">Nombre</th>
                                    <th>Contenido</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.generalParameters.length > 0 ? (
                                    this.state.generalParameters.map((generalParameter ) => (
                                        <tr key={generalParameter.id}>
                                            <td className="hide">{generalParameter.name}</td>
                                            <td>{generalParameter.content}</td>
                                            <td>
                                                <div className="btn-group" role="generalParameter" aria-label="Basic example">
                                                    <VerifyPermissions permission="edit_general_parameter">
                                                        <button data-id={generalParameter.id} onClick={this.handleEdit} className="btn btn-sm btn-outline-primary"><i  data-id={generalParameter.id} className="far fa-edit d-sm-block d-md-none"></i><span data-id={generalParameter.id} className="d-none d-md-inline">Editar</span></button>
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
                                            <span><i className="fa fa-info-circle" aria-hidden="true"></i>{this.state.message}</span>
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
                                    <div className="form-group">
                                        <label htmlFor="">Contenido</label>
                                        <input
                                            type="text"
                                            name="content"
                                            id="content"
                                            className="form-control"
                                            onInput={this.handleInput}
                                        />
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

export default GeneralParameters;
