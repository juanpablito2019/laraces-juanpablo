import React, { Component } from 'react';
import { get, store, find, update, destroy, rules,storeMass } from '../containers/Positions';
import { validate, formValid, setRules } from '../containers/Validator';
import Loader from '../components/Loader';

class Positions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positions: null,
            edit: false,
            id: null,
            message: null,
            rules: rules
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.search = this.search.bind(this);
    }

    async getPositions() {
        let data = await get();
        this.setState({ positions: data });
    }

    handleUpdate() {
        this.setState({ positions: null });
        storeMass().then(data => {
            if(data.success){
                this.getPositions();
            }
        })
    }

    search(e) {
        let { value } = e.target;
        let matchs = this.state.positions.filter(position => {
            const rgex = new RegExp(`^${value}`, 'gi');
            return position.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").match(rgex)
        });
        if (value.length === 0) {
            this.getPositions();
        }
        this.setState({ positions: matchs });
    }

    handleInput(e) {
        let { name, value } = e.target;
        let newRules = validate(name, value, rules)
        this.setState({ rules: newRules });
    }

    async handleEdit(e) {
        let id = $(e.target).data('id');
        this.setState({ edit: true, id });
        setRules(rules,false);

        let data = await find(id);
        $('.modal').find('.modal-title').text('Editar cargo');
        $('.modal').find('#name').val(data.name);
        $('.modal').find('#type').val(data.type);
        $('.modal').modal('toggle');
    }

    handleModal() {
        $('#form').trigger('reset');
        setRules(rules);

        this.setState({ message: 'Te recomendamos actualizar antes de agregar' , edit: false});
        $('.modal').find('.modal-title').text('Agregar cargo');
        $('.modal').modal('toggle');
    }

    handleDelete(e) {
        let id = $(e.target).data('id');
        let res = confirm('¿¿Estas seguro de eliminar este cargo?');
        if (res) {
            destroy(id).then(data => {
                if (data.success) {
                    this.getPositions();
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

    async handleSubmit(e) {
        e.preventDefault();
        if (formValid(rules)) {
            if (this.state.edit) {
                let data = await update(e.target, this.state.id);
                if (data.success) {
                    this.getPositions();
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
                        this.getPositions();
                        $('.modal').modal('toggle');
                        toastr.success('', data.message, {
                            closeButton: true
                        });
                    }else{
                        this.setState({message: data.errors.name})
                    }
                });
            }
        }else{
            this.setState({message:'Por favor completa el formulario'});
        }

    }

    componentDidMount() {
        this.getPositions();
    }

    render() {
        const { rules } = this.state;
        if (!this.state.positions) {
            return (
                <Loader />
            )
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Cargos</h3>
                        <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Agregar <span className="d-none d-md-inline ">nuevo cargo</span></a>
                        <a href="#" onClick={this.handleUpdate} className=""><i className="fa fa-download ml-1" aria-hidden="true"></i> Actualizar </a>
                    </div>
                    <div className="d-6 d-lg-3 mr-3 ml-3 mt-3">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <button className="btn btn-outline-primary" type="button" id="button-addon1">
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </button>
                            </div>
                            <input type="text" className="form-control" onInput={this.search} />
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    {this.state.positions.length > 0 ? (
                        this.state.positions.map(position => (
                            <div key={position.id} className="col-12 col-md-6 col-lg-4 mb-2" key={position.id}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <h5>{position.name}</h5>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-5 col-md-3 mr-md-3 col-lg-3 ml-lg-3">
                                                <i className="fa fa-address-card fa-5x text-secondary mt-2"></i>
                                            </div>
                                            <div className="col">
                                                <p>{position.type}</p>
                                                <a href="#" data-id={position.id} onClick={this.handleEdit} >Editar</a>
                                                <a href="#" data-id={position.id} onClick={this.handleDelete} className="text-danger ml-3">Eliminar</a>
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
                                        <label htmlFor="">Tipo</label>
                                        <input
                                            type="text"
                                            name="type"
                                            id="type"
                                            className={rules.type.isInvalid && rules.type.message != '' ? 'form-control is-invalid' : 'form-control'}
                                            onInput={this.handleInput}
                                        />
                                        <div className="invalid-feedback">
                                            {rules.type.isInvalid && rules.type.message != '' ? rules.type.message : ''}
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

export default Positions;
