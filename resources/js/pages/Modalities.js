import React, { Component } from 'react';
import { get, rules, store, find, update, destroy, storeMass } from '../containers/Modalities';
import Loader from '../components/Loader';
import { formValid, validate, setRules } from '../containers/Validator';
import SetPermissions from '../components/SetPermissions';

class Modalities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalities: null,
            rules: rules,
            id: null,
            edit: false,
            message: null,
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.search = this.search.bind(this);
    }

    getModalities() {
        get().then(data => {
            this.setState({ modalities: data });
        })
    }

    handleUpdate() {
        this.setState({modalities: null});
        storeMass().then(data => {
            this.getModalities();
        })
    }

    search(e) {
        let { value } = e.target;
        let matches = this.state.modalities.filter(modality => {
            const rgex = new RegExp(`^${value}`, 'gi');
            return modality.name.match(rgex);
        });
        if (value.length === 0) {
            this.getModalities();
        }
        this.setState({ modalities: matches });
    }
    async handleSubmit(e) {
        e.preventDefault();
        if (formValid(rules)) {
            if (this.state.edit) {
                let data = await update(e.target, this.state.id);
                if (data.success) {
                    this.getModalities();
                    $('.modal').modal('toggle');
                    toastr.success('', data.message, {
                        closeButton: true
                    });
                }else{
                    this.setState({message: data.errors.name})
                }
            } else {
                store(e.target).then(data => {
                    if (data.success) {
                        this.getModalities();
                        $('.modal').modal('toggle');
                        toastr.success('', data.message, {
                            closeButton: true
                        });
                    }else{
                        this.setState({message: data.errors.name})
                    }
                });
            }
        } else {
            this.setState({ message: 'Por favor completa el formulario' })
        }
    }

    handleDelete(e) {
        let id = $(e.target).data('id');
        let res = confirm('¿Estas seguro que deseas eliminar esta modalidad?');
        if (res) {
            destroy(id).then(data => {
                if (data.success) {
                    this.getModalities();
                    toastr.info('', data.message, {
                        closeButton: true
                    });
                }else{
                    toastr.error('', data.message, {
                        closeButton: true
                    });
                }
            })
        }
    }

    handleInput(e) {
        const { name, value } = e.target;
        let newRules = validate(name, value, rules);
        this.setState({ rules: newRules });
    }

    handleModal() {
        $('#form').trigger('reset');
        setRules(rules);
        this.setState({ message: 'Te recomendamos actualizar antes de agregar uno nuevo', edit: false });
        $('.modal').find('.modal-title').text('Agregar modalidad');
        $('.modal').modal('toggle');
    }

    handleEdit(e) {
        let id = $(e.target).data('id');
        this.setState({ id, edit: true, message: null });
        find(id).then(data => {
            rules.name.isInvalid = false;
            $('#name').val(data.name);
            $('#elective_months').val(data.elective_months);
            $('#practice_months').val(data.practice_months);
            $('.modal').find('.modal-title').text('Editar modalidad');
            $('.modal').modal('toggle');
        })
    }

    componentDidMount() {
        this.getModalities();
    }

    render() {
        const { rules } = this.state;
        if (!this.state.modalities) {
            return (
                <Loader />
            )
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Modalidades</h3>
                        <SetPermissions permis="create_modality">
                            <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Agregar <span className="d-none d-md-inline ">nueva modalidad</span></a>
                            <a href="#" onClick={this.handleUpdate} className=""><i className="fa fa-download ml-1" aria-hidden="true"></i> Actualizar </a>
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
                    {this.state.modalities.length>0?(
                        this.state.modalities.map(modality => (
                            <div className="col-12 col-md-4 mb-2" key={modality.id}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5>
                                            {
                                                (modality.name).length > 16 ? (
                                                    ((modality.name).substring(0,16)+'...')
                                                ) : (
                                                    modality.name
                                                )
                                            }
                                        </h5>
                                        <div className="row ml-1">
                                                <SetPermissions permis="edit_modality">
                                                    <a href="#" data-id={modality.id} onClick={this.handleEdit}>Editar</a>
                                                </SetPermissions>

                                                <SetPermissions permis="delete_modality">
                                                <a href="#" data-id={modality.id} onClick={this.handleDelete} className="text-danger ml-3">Eliminar</a>
                                                </SetPermissions>
                                        </div>






                                    </div>
                                </div>
                            </div>
                        ))
                    ):(
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
                                <form onSubmit={this.handleSubmit} id="form">
                                    {this.state.message ? (
                                        <div className="alert alert-info" role="alert">
                                            <span><i className="fa fa-info-circle" aria-hidden="true"></i> {this.state.message}</span>
                                        </div>
                                    ) : (
                                            <div className=""></div>
                                        )}
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre</label>
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

export default Modalities;
