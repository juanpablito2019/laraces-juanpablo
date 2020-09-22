import React, { Component } from 'react';
import Loader from '../components/Loader';

import {get} from '../containers/Roles';

class Roles extends Component {
    constructor(props){
        super(props);
        this.state = {
            rols: null
        }
    }

    async getRols(){
        let data = await get();
        this.setState({rols: data.rols})
    }

    componentDidMount(){
        this.getRols();
    }

    render() {
        if(!this.state.rols){
            return <Loader />
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Roles</h3>
                        <a href="./roles/create"><i className="fa fa-plus" aria-hidden="true"></i> Agregar <span className="d-none d-md-inline ">nuevo rol</span></a>
                    </div>
                </div>
                <div className="row">
                    {this.state.rols.length>0?(
                        this.state.rols.map((rol, i) => (
                            <div key={i} className="col-12 col-lg-4 mt-3">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="text-primary">{rol.name}</h5>
                                    </div>
                                </div>
                            </div>
                        ))
                    ):(
                        <div className="row">
                            <div className="col">
                                <p>No hay datos disponibles</p>
                            </div>
                        </div>
                    )}
                </div>

            </>
        )
    }
}

export default Roles;
