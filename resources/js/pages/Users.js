import React, { Component } from 'react';
import Loader from '../components/Loader';
import { get } from '../containers/User';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null
        }
    }
    async getUsers() {
        let data = await get();
        this.setState({ users: data });
    }
    componentDidMount() {
        this.getUsers();
    }
    render() {
        if (!this.state.users) {
            return <Loader />
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Usuarios</h3>
                    </div>
                </div>
                <div className="row">
                    {this.state.users.length > 0 ? (
                        this.state.users.map(user => (
                            <div className="col-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5>{user.name}</h5>
                                        <h6 className="text-muted">{user.email}</h6>
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
            </>
        )
    }
}

export default Users;