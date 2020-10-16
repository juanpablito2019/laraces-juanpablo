import React, { Component } from 'react';
import { get, store, find, update, destroy, rules } from '../containers/NoveltyTypes';
import { validate, formValid, setRules } from '../containers/Validator';
import Loader from '../components/Loader';
import SetPermissions from '../components/SetPermissions';

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
        $('.modal').find('.modal-title').text('Editar tipo de novedad');
        $('.modal').find('#name').val(data.name);
        $('.modal').modal('toggle');
    }

    handleModal() {
        this.setState({ edit: false });
        setRules(rules);
        this.setState({ message: false, edit: false });
        $('#form').trigger('reset');
        $('.modal').find('.modal-title').text('Agregar tipo de novedad');
        $('.modal').modal('toggle');
    }

    handleDelete(e) {
        let id = $(e.target).data('id');
        swal.fire({
            title: '¿Estas seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Si, eliminar`,
            cancelButtonText: `Cancelar`,
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                    destroy(id).then(data => {
                        if(data.success == false){
                            toastr.error('', data.message, {
                                closeButton: true
                            });
                        }if (data.success == true) {
                            this.getNoveltyTypes();
                            toastr.success('', data.message, {
                                closeButton: true
                            });
                        }
                    })
            }
        })
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
                    toastr.success('', data.message, {
                        closeButton: true
                    });
                } else {
                    this.setState({ message: data.errors.name })
                }
            } else {
                store(e.target).then(data => {
                    if (data.success) {
                        this.getNoveltyTypes();
                        $('.modal').modal('toggle');
                        toastr.success('', data.message, {
                            closeButton: true
                        });
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
                        <h3>Tipos de novedades</h3>
                        <SetPermissions permis="create_novelty_type">
                            <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Agregar tipo de novedad</a>
                        </SetPermissions>
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
                <div className="row mt-3">
                    {this.state.noveltyTypes.length > 0 ? (
                        this.state.noveltyTypes.map(noveltyType => (
                            <div className="col-12 col-md-6 col-lg-4 mb-2" key={noveltyType.id}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <h5>
                                                    {
                                                        (noveltyType.name).length > 16 ? (
                                                            ((noveltyType.name).substring(0,16)+'...')
                                                        ) : (
                                                            noveltyType.name
                                                        )
                                                    }
                                                </h5>
                                                <div className="row ml-1">
                                                    <SetPermissions permis="edit_novelty_type">
                                                        <a  href="#" data-id={noveltyType.id} onClick={this.handleEdit} >Editar</a>
                                                    </SetPermissions>


                                                    <SetPermissions permis="delete_novelty_type">
                                                        <a  href="#" data-id={noveltyType.id} onClick={this.handleDelete} className="text-danger ml-3" >Eliminar</a>
                                                    </SetPermissions>
                                                </div>
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
