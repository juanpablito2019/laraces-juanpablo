import React, { Component } from 'react';
import { get, store, find, update, destroy, rules } from '../containers/CommitteeParameters';
import Loader from '../components/Loader';
import { formValid, validate, setRules } from '../containers/Validator';
import Ckeditor from '../components/Ckeditor';
import { findActive } from '../containers/ActTemplate';
import SetPermissions from '../components/SetPermissions';

class CommitteeParameters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            committeeParameters: null,
            edit: false,
            activeActTemplates: null,
            ckdata: ""
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

    tooltip(e) {
        $(e.target).tooltip();
    }

    handleModal() {
        $('#form').trigger('reset');
        setRules(rules);
        this.setState({ ckdata: "", message: null, edit: false });
        $('.modal').find('.modal-title').text('Crear parámetro de acta');
        $('.modal').modal('toggle');
    }

    async handleEdit(e) {
        let id = $(e.target).data('id');
        let data = await find(id);
        this.setState({ ckdata: data.content ? data.content : '', id, edit: true, message: null });
        setRules(rules, false);
        find(id).then(data => {
            $('#name').val(data.name);
            $('#act_template_id').val(data.act_template_id);
            $('#slug').val(data.slug)
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
                    await this.getCommitteeParameters();
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
                } else {
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
        if (name == 'name') {
            let str = value.trim();
            str = str.toLowerCase();
            str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            let slug = str.replace(/ /g, '_');
            $('#slug').val('${' + slug + '}');
            if (slug.length >= 8) {
                rules.slug.isInvalid = false;
            } else {
                rules.slug.isInvalid = true;
            }
        }
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
                        <SetPermissions permis="create_committee_parameter">
                            <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Agregar nuevo parámetro</a>
                        </SetPermissions>
                    </div>
                </div>

                <div className="row mt-3">
                    {this.state.committeeParameters.length > 0 ? (
                        this.state.committeeParameters.map((committeeParameter, i) => (
                            <div className="col-4 mb-2" key={i}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="text-primary">{committeeParameter.name}</h5>
                                        <h6>Plantilla: {committeeParameter.act_template.act_type} (V{committeeParameter.act_template.version})</h6>

                                        <div className="row ml-1">
                                            <SetPermissions permis="edit_committee_parameter">
                                                <a href="#" data-id={committeeParameter.id} onClick={this.handleEdit}>Editar</a>
                                            </SetPermissions>

                                            <SetPermissions permis="delete_committee_parameter">
                                                <a href="#" data-id={committeeParameter.id} onClick={this.handleDelete} className="text-danger ml-3">Eliminar</a>
                                            </SetPermissions>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                            <div className="col">
                                <p>No hay parametros de actas disponibles</p>
                            </div>
                        )}

                </div>

                <div className="modal" id="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg">
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
                                        <label htmlFor="">Nombre <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            maxLength="80"
                                            className={rules.name.isInvalid && rules.name.message != '' ? 'form-control is-invalid' : 'form-control'}
                                            onInput={this.handleInput}
                                            autoComplete="off"
                                        />
                                        <div className="invalid-feedback">
                                            {rules.name.isInvalid && rules.name.message != '' ? rules.name.message : ''}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row">
                                            <div className="col">
                                                <label htmlFor="slug">
                                                    Slug
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onMouseOver={this.tooltip}
                                                        className="btn btn-link btn-sm"
                                                        data-toggle="tooltip"
                                                        data-placement="right"
                                                        title="Cadena de texto que debe estar en la plantilla"
                                                    >
                                                        <i className="fa fa-info-circle text-info" aria-hidden="true"></i>
                                                    </button>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="slug"
                                                    id="slug"
                                                    className={rules.slug.isInvalid && rules.slug.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                    onInput={this.handleInput}
                                                />
                                                <div className="invalid-feedback">
                                                    {rules.slug.isInvalid && rules.slug.message != '' ? rules.slug.message : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="act_template_id">Plantilla <span className="text-danger">*</span></label>
                                        {this.state.activeActTemplates.length > 0 ? (
                                            <React.Fragment>
                                                <select
                                                    name="act_template_id"
                                                    id="act_template_id"
                                                    className={rules.act_template_id.isInvalid && rules.act_template_id.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                    onInput={this.handleInput}
                                                >
                                                    <option value="">Seleccion uno</option>
                                                    {this.state.activeActTemplates.map(activeActTemplate => (
                                                        <option key={activeActTemplate.id} value={activeActTemplate.id}>{activeActTemplate.act_type} (V{activeActTemplate.version})</option>
                                                    ))}
                                                </select>
                                                <div className="invalid-feedback">
                                                    {rules.act_template_id.isInvalid && rules.act_template_id.message != '' ? rules.act_template_id.message : ''}
                                                </div>
                                            </React.Fragment>
                                        ) : (
                                                <h6 className="text-muted"><i>No hay actas activas registradas</i></h6>
                                            )}
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
                                                    d={this.state.ckdata}
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
