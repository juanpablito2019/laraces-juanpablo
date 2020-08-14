import React, { Component } from 'react';
import Loader from '../components/Loader';
import {get} from '../containers/User';

class Users extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: null
        }
    }
    async getUsers(){
        let data = await get();
        this.setState({users: data});
    }
    componentDidMount(){
        this.getUsers();
    }
    render(){
        if(!this.state.users){
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
                    <div className="col-2">
                        <div className="card">
                            <img src="/img/no-photo.png" alt="no-photo" className="card-img-top"/>
                            <div className="card-body">
                                <h5></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Users;