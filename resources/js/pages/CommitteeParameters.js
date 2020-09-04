import React, { Component } from 'react';
import { get, store, find, update, destroy, rules } from '../containers/CommitteeParameters';
import Loader from '../components/Loader';
import { formValid, validate, setRules } from '../containers/Validator';
import Ckeditor from '../components/Ckeditor';
import { findActive } from '../containers/ActTemplate';

class CommitteeParameters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            committeeParameters: null,
            edit: false,
            activeActTemplates: null
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    async getCommitteeParameters() {
        let data = await get();
        this.setState({ committeeParameters: data })
    }
    async getActTemplatesActive() {
        let data = await findActive();
        this.setState({ activeActTemplates: data });
    }


    handleModal() {
        $('#form').trigger('reset');
        setRules(rules);
        this.setState({ ckreset: true, ckdata: "", message: null, edit: false });
        $('.modal').find('.modal-title').text('Crear parámetro de acta');
        $('.modal').modal('toggle');
    }

    async handleEdit(e) {
        let id = $(e.target).data('id');
        let data = await find(id);
        this.setState({ ckdata: data.content, ckreset: false, id, edit: true, message: null });
        setRules(rules, false);
        find(id).then(data => {
            $('#name').val(data.name);
            $('#content').val(data.content);
            $('#act_template_id').val(data.act_template_id);
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
                    await this.getCommitteeParameters();
                    $('#modal').modal('hide');
                } else {
                    this.setState({ message: data.errors.name })
                }
            } else {
                let data = await store(e.target);
                if (data.success) {
                    await this.getCommitteeParameters();
                    $('#modal').modal('hide');
                } else {
                    this.setState({ message: data.errors.name || data.errors.content })
                }
            }
        } else {
            this.setState({ message: 'Por favor completa el formulario' })
        }
    }

    async handleDelete(e) {
        let id = $(e.target).data('id');
        let res = confirm('¿Estas seguro de eliminar este parámetro de acta?');
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

    componentDidMount() {
        this.getCommitteeParameters();
        this.getActTemplatesActive();
    }
    render() {
        if (!this.state.committeeParameters || !this.state.activeActTemplates) {
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
                    {this.state.committeeParameters.length>0?(
                        this.state.committeeParameters.map((committeeParameter, i) => (
                            <div className="col-4" key={i}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="text-primary">{committeeParameter.name}</h5>
                                        <h6>Plantilla: {committeeParameter.act_template.name} (V{committeeParameter.act_template.version})</h6>
                                        <a href="#" data-id={committeeParameter.id} onClick={this.handleEdit}>Editar</a>
                                        <a href="#" className="text-danger ml-3">Eliminar</a>
                                    </div>
                                </div>
                            </div>
                        ))
                    ):(
                        <div className="col">
                            <p>No hay parametros de actas disponibles</p>
                        </div>
                    )}
                    
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
                                                <label htmlFor="act_template_id">Plantilla <span className="text-danger">*</span></label>
                                                <select
                                                    name="act_template_id"
                                                    id="act_template_id"
                                                    className={rules.act_template_id.isInvalid && rules.act_template_id.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                    onInput={this.handleInput}
                                                >
                                                    <option value="">Seleccion uno</option>
                                                    {this.state.activeActTemplates.length > 0 ? (
                                                        this.state.activeActTemplates.map(activeActTemplate => (
                                                            <option key={activeActTemplate.id} value={activeActTemplate.id}>{activeActTemplate.name} (V{activeActTemplate.version})</option>
                                                        ))
                                                    ) : (
                                                            <option value="">No hay plantillas activas</option>
                                                        )}
                                                </select>
                                                <div className="invalid-feedback">
                                                    {rules.act_template_id.isInvalid && rules.act_template_id.message != '' ? rules.act_template_id.message : ''}
                                                </div>
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
                                                    options={['heading', 'bold', 'italic', 'blockQuote', 'bulletedList', 'numberedList', 'undo', 'redo']}
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