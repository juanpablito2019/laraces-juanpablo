import React, { Component } from 'react';
import Loader from '../components/Loader';
import { validate, formValid, setRules } from '../containers/Validator';
import { rules, store } from '../containers/Roles';
import { get as getPermission} from '../containers/Permissions';

class Roles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rules: rules,
            permissions: null,
            message: null,
            redirect:null,
            keys: null
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    async getData() {
        const data_permissions = await getPermission();
        const permissions = {};
        data_permissions.forEach(permission => {
            permissions[permission.model] = []
        });
        data_permissions.forEach(permission => {
            permissions[permission.model].push(permission)
        });
        this.setState({ keys: Object.keys(permissions) })
        this.setState({ permissions: permissions })
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
                    } else {
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
                        this.setState({ redirect: true})
                    } else {
                        this.setState({ message: data.errors.name || data.errors.permissions })
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

    componentDidMount() {
        this.getData();
    }


    render() {
        const { rules } = this.state;
        if (!this.state.permissions || !this.state.keys) {
            return <Loader />
        }
        if(this.state.redirect){
            return<Redirect to="/app/roles"/>
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3> Agregar Rol </h3>
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
                                {this.state.keys.map((key) => {
                                    return (
                                        <div key={key}>
                                            <div className="card mb-2">
                                                <div className="card-body">
                                                    <h5>{key}</h5>
                                                    <Permissions permissions={this.state.permissions[key]} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </form>
                        <button type="submit" form="form" className="btn btn-primary">Guardar</button>
                    </div>
                </div>

            </>
        )
    }
}

const Permissions = ({ permissions }) => {
    return (
        <>
            {permissions.map((permission, i) => (
                <div className="form-check" key={i}>
                    <input className="form-check-input" type="checkbox" name="permissions[]" value={permission.id} id={"permission" + permission.id} />
                    <label className="form-check-label" htmlFor={"permission" + permission.id}>
                        {permission.spanish_name}
                    </label>
                </div>
            ))}
        </>
    )
}

export default Roles;
