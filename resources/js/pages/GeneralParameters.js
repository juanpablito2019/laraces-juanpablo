import React, { Component } from 'react';
import DataTable from '../components/DataTable';
import Loader from '../components/Loader';

import { index } from '../containers/GeneralParameters'

class GeneralParameters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            generalParameters: null
        }
    }

    async getGeneralParameters() {
        let data = await index();
        this.setState({ generalParameters: data });
    }

    componentDidMount() {
        this.getGeneralParameters();
    }

    render() {
        if (!this.state.generalParameters) {
            return <Loader />
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Parametros generales</h3>
                        <a href="#" ><i className="fa fa-plus" aria-hidden="true"></i> Agregar nuevo parámetro</a>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <DataTable>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Contenido</th>
                                    <th>Plantilla</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                        </DataTable>
                    </div>
                </div>
                <div className="modal" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Modal body text goes here.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default GeneralParameters;