import React, { Component } from 'react';
import { get, store, find, update, destroy, rules } from '../containers/NoveltyTypes';
import { validate, formValid, setRules } from '../containers/Validator';
import Loader from '../components/Loader';

class NoveltyTypes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noveltyTypes: null,
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
        this.search = this.search.bind(this);
    }
    async getNoveltyTypes() {
        let data = await get();
        this.setState({ noveltyTypes: data });
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
        $('.modal').find('.modal-title').text('Editar Tipo de Novedad');
        $('.modal').find('#name').val(data.name);
        $('.modal').modal('toggle');
    }

    handleModal() {
        this.setState({ edit: false });
        setRules(rules);
        this.setState({ message: false, edit: false });
        $('#form').trigger('reset');
        $('.modal').find('.modal-title').text('Agregar Tipo de Novedad');
        $('.modal').modal('toggle');
    }

    async handleDelete(e) {
        let id = $(e.target).data('id');
        let res = confirm('¿Estás seguro de eliminar este Tipo de Novedad?');
        if (res) {
            let data = await destroy(id);
            this.getNoveltyTypes();
        }
    }

    search(e) {
        let { value } = e.target;
        let matches = this.state.noveltyTypes.filter(noveltyType => {
            const rgex = new RegExp(`^${value}`, 'gi');
            return noveltyType.name.match(rgex);
        });
        if (value.length === 0) {
            this.getNoveltyTypes();
        }
        this.setState({ noveltyTypes: matches });
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (formValid(rules)) {
            if (this.state.edit) {
                let data = await update(e.target, this.state.id);
                if (data.success) {
                    this.getNoveltyTypes();
                    $('.modal').modal('toggle');
                } else {
                    this.setState({ message: data.errors.name })
                }
            } else {
                store(e.target).then(data => {
                    if (data.success) {
                        this.getNoveltyTypes();
                        $('.modal').modal('toggle');
                    } else {
                        this.setState({ message: data.errors.name })
                    }
                })
            }
        } else {
            this.setState({ message: 'Por favor completa el formulario' });
        }
    }

    componentDidMount() {
        this.getNoveltyTypes();
    }

    render() {
        const { rules } = this.state;
        if (!this.state.noveltyTypes) {
            return (
                <Loader />
            )
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Tipos de Novedades</h3>
                        <a href="#" onClick={this.handleModal}>Agregar nuevo tipo de Novedad</a>
                    </div>
                    <div className="col-3">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <button className="btn btn-outline-primary" type="button" id="button-addon1">
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </button>
                            </div>
                            <input type="search" className="form-control" onInput={this.search} placeholder="Buscar..." />
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    {this.state.noveltyTypes.length > 0 ? (
                        this.state.noveltyTypes.map(noveltyType => (
                            <div className="col-12 col-md-6 col-lg-4 mb-2" key={noveltyType.id}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <h5>{noveltyType.name}</h5>
                                                <a  href="#" data-id={noveltyType.id} onClick={this.handleEdit} >Editar</a>
                                                <a  href="#" data-id={noveltyType.id} onClick={this.handleDelete} className="text-danger ml-3" >Eliminar</a>
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
                                <form id="form" onSubmit={this.handleSubmit} autoComplete="off">
                                    {this.state.message ? (
                                        <div className="alert alert-info" role="alert">
                                            <span><i className="fa fa-info-circle" aria-hidden="true"></i> {this.state.message}</span>
                                        </div>
                                        ):(
                                            <div></div>
                                        )}

                                    <div className="form-group">
                                        <label htmlFor="">Nombre<span className="text-danger">*</span></label>
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

export default NoveltyTypes;
