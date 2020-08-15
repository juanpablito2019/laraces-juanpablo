import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { get, store } from '../containers/Committees';
import Loader from '../components/Loader';
import Ckeditor from '../components/Ckeditor';

class Committees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            committes: null,
        }
    }

    async getCommittees() {
        let data = await get();
        this.setState({ committes: data });
    }

    async handleModal() {
        $('.modal').find('.modal-title').text('Agregar comité');
        $('.modal').modal('toggle');
    }

    async handleSubmit(e){
        e.preventDefault();
        let data = await store(e.target);
        console.log(data);
    }

    componentDidMount() {
        this.getCommittees();
    }
    render() {
        if (!this.state.committes) {
            return <Loader />
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Comités</h3>
                        <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Nuevo comité</a>
                    </div>
                </div>
                <div className="row mt-3">
                    {this.state.committes.length > 0 ? (
                        this.state.committes.map(committe => (
                            <div className="col-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <div className="card-title border-bottom">
                                                    <Link>
                                                        <h5>23 de enero del 2020</h5>
                                                    </Link>
                                                </div>
                                                <div className="card-text">
                                                    <h6>Numero de acta: <span className="text-muted">123456789</span></h6>
                                                    <h6>Hora: <span className="text-muted">12:00 a 15:30</span></h6>
                                                    <h6>Lugar: <span className="text-muted">12:00 a 15:30</span></h6>
                                                    <h6>Centro de formacion: <span className="text-muted">12:00 a 15:30</span></h6>
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
                <div className="modal" tabIndex="-1">
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
                                    <div className="form-group">
                                        <div className="form-row">
                                            <div className="col">
                                                <label htmlFor="">Numero de acta</label>
                                                <input type="text" name="record_number" id="record_number" className="form-control" />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="">Fecha</label>
                                                <input type="text" name="date" id="date" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Asistentes</label>
                                        <Ckeditor 
                                            name="assistants"
                                            id="assistants"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button form="form" className="btn btn-primary">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Committees;