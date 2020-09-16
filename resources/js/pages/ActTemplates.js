import React, { Component } from 'react';
import DataTable from '../components/DataTable';
import Loader from '../components/Loader';

import { index, store, rules, find, update, destroy } from '../containers/ActTemplate';
import { get as indexStates } from '../containers/CommitteeSessionStates';
import { validate, formValid, setRules } from '../containers/Validator'
import moment from 'moment';

class ActTemplates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actTemplates: null,
            rules,
            edit: false,
            message: null,
            id: null
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }


    async getActTemplates() {
        this.setState({ actTemplates: null });
        let data = await index();
        this.setState({ actTemplates: data });
    }

    handleModal() {
        setRules(rules);
        this.setState({ edit: false, message: null });
        $('#form').trigger('reset');
        $('.modal').find('.modal-title').text('Agregar nueva plantilla');
        $('.modal').modal('toggle');
    }

    async handleEdit(e) {
        setRules(rules, false);
        let id = $(e.target).data('id');
        this.setState({ id, edit: true });
        let data = await find(id);
        $('.modal').find('.modal-title').text('Editar plantilla');
        $('#act_type').val(data.act_type);
        $('#version').val(data.version);
        $('#date').val(data.date);
        if (data.is_active == 1) {
            $('#radio_yes').attr('checked', true);
        } else {
            $('#radio_no').attr('checked', true);
        }
        $('#filename').html(`<a href="/storage/${data.path}">Archivo actual</a>`);
        $('.modal').modal('toggle');
    }

    async handleDelete(e) {
        let id = $(e.target).data('id');
        let res = confirm('¿Seguro desea eliminar este item?');
        if (res) {
            let data = await destroy(id);
            if (data.success) {
                await this.getActTemplates();
                toastr.success('', data.message, {
                    closeButton: true
                });
            }
        }
    }

    handleInput(e) {
        let { name, value } = e.target;
        let newRules = validate(name, value, rules);
        this.setState({ rules: newRules });
        if (name == 'file') {
            let filename = value.split(/(\\|\/)/g).pop();
            document.getElementById('filename').textContent = filename;
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (formValid(rules)) {
            if (this.state.edit) {
                let data = await update(e.target, this.state.id);
                if (data.success) {
                    $('.modal').modal('toggle');
                    setTimeout(async () => {
                        await this.getActTemplates();
                    }, 100);
                    toastr.success('', data.message, {
                        closeButton: true
                    });
                } else {
                    this.setState({ message: data.message });
                }
            } else {
                let data = await store(e.target);
                if (data.success) {
                    $('.modal').modal('toggle');
                    setTimeout(async () => {
                        await this.getActTemplates();
                    }, 100);
                    toastr.success('', data.message, {
                        closeButton: true
                    });
                } else {
                    this.setState({ message: data.message });
                }
            }
        } else {
            this.setState({ message: 'Por favor complete el formulario' });
        }
    }

    componentDidMount() {
        this.getActTemplates();
    }

    render() {
        let { rules } = this.state;
        if (!this.state.actTemplates) {
            return <Loader />
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Plantillas de actas</h3>
                        <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Agregar nueva plantilla</a>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <DataTable>
                            <thead>
                                <tr>
                                    <th>Tipo de acta</th>
                                    <th>Version</th>
                                    <th>Fecha</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.actTemplates.map((actTemplate, i) => (
                                    <tr key={i}>
                                        <td>{actTemplate.act_type}</td>
                                        <td>{actTemplate.version}</td>
                                        <td>{moment(actTemplate.date).format('LL')}</td>
                                        <td>{actTemplate.is_active == 1 ? (<span className="badge badge-success">Activa</span>) : <span className="badge badge-secondary">Inactiva</span>}</td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button data-id={actTemplate.id} onClick={this.handleEdit} className="btn btn-sm btn-outline-primary">Editar</button>
                                                <button data-id={actTemplate.id} onClick={this.handleDelete} className="btn btn-sm btn-outline-danger">Eliminar</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </DataTable>
                    </div>
                </div>
                <div className="modal fade" tabIndex="-1" data-backdrop="static">
                    <div className="modal-dialog modal-lg">
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
                                        <label htmlFor="act_type">Tipo de acta</label>
                                        <select
                                            name="act_type"
                                            id="act_type"
                                            className={rules.act_type.isInvalid && rules.act_type.message != '' ? 'form-control is-invalid' : 'form-control'}
                                            onInput={this.handleInput}
                                        >
                                            <option value="">Seleccione uno</option>
                                            <option value="Comunicación al aprendiz">Comunicación al aprendiz</option>
                                            <option value="Acta de comité">Acta de comité</option>
                                            <option value="Acto sancionatorio">Acto sancionatorio</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            {rules.act_type.isInvalid && rules.act_type.message != '' ? rules.act_type.message : ''}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row">
                                            <div className="col">
                                                <label htmlFor="version">Version</label>
                                                <input
                                                    type="number"
                                                    name="version"
                                                    id="version"
                                                    className={rules.version.isInvalid && rules.version.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                    onInput={this.handleInput}
                                                />
                                                <div className="invalid-feedback">
                                                    {rules.version.isInvalid && rules.version.message != '' ? rules.version.message : ''}
                                                </div>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="date">Fecha</label>
                                                <input
                                                    type="date"
                                                    name="date"
                                                    id="date"
                                                    className={rules.date.isInvalid && rules.date.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                    onInput={this.handleInput}
                                                />
                                                <div className="invalid-feedback">
                                                    {rules.date.isInvalid && rules.date.message != '' ? rules.date.message : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="template">Archivo plantilla <small className="text-muted" id="filename">No ha seleccionado un archivo</small></label>
                                        <input
                                            type="file"
                                            name="file"
                                            id="file"
                                            className="d-none"
                                            onInput={this.handleInput}
                                        />
                                        <label htmlFor="file" className="btn btn-primary btn-block">Subir plantilla</label>
                                        <small className="text-danger">
                                            {rules.file.isInvalid && rules.file.message != '' ? rules.file.message : ''}
                                        </small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="is_active">¿Es activa?</label>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="is_active"
                                                id="radio_yes"
                                                value="1"
                                                onInput={this.handleInput}
                                            />
                                            <label className="form-check-label" htmlFor="radio_yes">
                                                Si
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="is_active"
                                                id="radio_no"
                                                value="0"
                                                onInput={this.handleInput}
                                            />
                                            <label className="form-check-label" htmlFor="radio_no">
                                                No
                                            </label>
                                        </div>
                                        <small className="text-danger">
                                            {rules.is_active.isInvalid && rules.is_active.message != '' ? rules.is_active.message : ''}
                                        </small>
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
        )
    }
}

export default ActTemplates;