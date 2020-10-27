import React, { Component } from 'react';
import Loader from '../components/Loader';
import VerifyPermission from '../components/VerifyPermission';
import { Link} from 'react-router-dom';

import {get, destroy} from '../containers/Roles';

class Roles extends Component {
    constructor(props){
        super(props);
        this.state = {
            rols: null
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    async getRols(){
        let data = await get();
        data.shift();
        this.setState({rols: data})
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
                    if (data.success == false) {
                        toastr.error('', data.message, {
                            closeButton: true
                        });
                    } if (data.success == true) {
                        this.getRols();
                        toastr.success('', data.message, {
                            closeButton: true
                        });
                    }
                })
            }
        })
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
                        <VerifyPermission permission="create_role">
                            <Link to={"./roles/create"}><i className="fa fa-plus" aria-hidden="true"></i> Agregar <span className="d-none d-md-inline ">nuevo rol</span></Link>
                        </VerifyPermission>
                    </div>
                </div>
                <div className="row">
                    {this.state.rols.length>0?(
                        this.state.rols.map((rol, i) => (
                            <div key={i} className="col-12 col-lg-4 mt-3">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="text-primary">{rol.name}</h5>
                                        <div className="row ml-1">
                                                <VerifyPermission permission="edit_role">
                                                    <Link to={"/app/roles/edit/" + rol.id}>
                                                            Editar
                                                        </Link>
                                                </VerifyPermission>

                                                <VerifyPermission permission="delete_role">
                                                    <a href="#" data-id={rol.id} onClick={this.handleDelete} className="text-danger ml-3">Eliminar</a>
                                                </VerifyPermission>
                                        </div>
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
