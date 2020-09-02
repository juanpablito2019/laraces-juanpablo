import React, { Component } from 'react';
import DataTable from '../components/DataTable';
import Loader from '../components/Loader';

import { index } from '../containers/ActTemplate';

class ActTemplates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actTemplates: null
        }
    }

    async getActTemplates() {
        let data = await index();
        this.setState({ actTemplates: data });
    }

    handleModal() {
        $('.modal').find('.modal-title').text('Agregar nueva plantilla');
        $('.modal').modal('toggle');
    }

    componentDidMount() {
        this.getActTemplates();
    }

    render() {
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
                                    <th>Nombre</th>
                                    <th>Version</th>
                                    <th>Fecha</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>

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
                                <form id="form">
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre</label>
                                        <input type="text" name="name" id="name" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row">
                                            <div className="col">
                                                <label htmlFor="version">Version</label>
                                                <input type="number" name="version" id="version" className="form-control" />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="date">Fecha</label>
                                                <input type="date" name="date" id="date" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="template">Archivo plantilla <small className="text-muted" id="filename"></small></label>
                                        <input type="file" name="file" id="file" className="d-none"/>
                                        <label htmlFor="file" className="btn btn-primary btn-block">Subir plantilla</label>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="is_active">¿Es activa?</label>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="is_active" id="radio_yes" value="option1" />
                                            <label className="form-check-label" htmlFor="radio_yes">
                                                Si
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="is_active" id="radio_no" value="option1" defaultChecked/>
                                            <label className="form-check-label" htmlFor="radio_no">
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                    <button type="button" className="btn btn-primary">Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </>
        )
    }
}

export default ActTemplates;