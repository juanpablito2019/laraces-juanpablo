import React, { Component } from 'react';
import Loader from '../components/Loader';
import { validate, formValid, setRules } from '../containers/Validator';
import { get, rules, store } from '../containers/Roles';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router'

class Roles extends Component {
    constructor(props){
        super(props);
        this.state = {
            rols: null,
            rules: rules,
            permissions: [],
            message: null
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    async getData(){
        let data = await get();
        this.setState({rols: data.rols})
        this.setState({permissions: data.permissions})
        console.log(this.state.permissions);


    }

    handleSubmit(e) {
        e.preventDefault();
        if (formValid(rules)) {
            if (this.state.edit) {
                update(e.target, this.state.id).then(data => {
                    if (data.success) {
                        this.getData();
                        toastr.success('', data.message, {
                            closeButton: true
                        });
                    }else{
                        this.setState({ message: data.errors.name })
                    }
                })
            } else {
                store(e.target).then(data => {
                    if (data.success) {
                        this.getData();
                        toastr.success('', data.message, {
                            closeButton: true
                        });
                        // this.props.history.push(`/app/roles`);
                        location.href = '/app/roles';
                    }else{
                        this.setState({ message: data.errors.name  ||  data.errors.permissions })
                    }
                });
            }
        } else {
            this.setState({ message: 'Por favor completa el formulario' })
        }
    }


    handleInput(e) {
        let { name, value } = e.target;
        let newRules = validate(name, value, rules)
        this.setState({ rules: newRules });
    }

    componentDidMount(){
        this.getData();
    }


    render() {
        const { rules } = this.state;
        if(!this.state.rols && !this.state.permissions){
            return <Loader />
        }
        return (
            <>
                {/* <div className="row">
                    <div className="col">
                        <h3>Agregar Rol</h3>

                    </div>
                </div> */}

                <div className="row">
                    <div className="col col-sm-12 col-md-12 col-lg-6 m-auto">
                        <div className="card">

                            <div className="card-header"> Nuevo Rol </div>

                            <div className="card-body">

                                <form id="form" onSubmit={this.handleSubmit}>
                                    {this.state.message ? (
                                        <div className="alert alert-info" role="alert">
                                            <span><i className="fa fa-info-circle" aria-hidden="true"></i> {this.state.message}</span>
                                        </div>
                                    ) : (
                                            <div className=""></div>
                                        )}
                                    <div className="form-group">
                                        <label>Nombre</label>
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
                                        <label>Permisos</label>
                                        {this.state.permissions.map(permission => (
                                            <div key={permission.id} className="form-check ">
                                                <input className="form-check-input" type="checkbox" id="permissions[]" name="permissions[]" value={permission.id} />
                                                <label className="form-check-label">{permission.name}</label>
                                            </div>
                                        ))}

                                    </div>

                                </form>

                                <button type="submit" form="form" className="btn btn-primary">Guardar</button>

                            </div>

                        </div>
                    </div>

                </div>

            </>
        )
    }
}

export default Roles;
