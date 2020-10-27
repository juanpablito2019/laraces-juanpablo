import React, { Component } from 'react';
import Loader from '../components/Loader';
import { validate, formValid, setRules } from '../containers/Validator';
import { rules, find, update } from '../containers/Roles';
import { get } from '../containers/Permissions';
import { Redirect } from 'react-router-dom';


class Roles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            role: null,
            rules: rules,
            permissions: null,
            keys: null,
            redirect:null,
            message: null
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    async getData() {
        let data = await find(this.state.id);
        this.setState({ role: data })

        // Data Permisos
        const data_permissions = await get();
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
            update(e.target, this.state.id).then(data => {
                if (data.success) {
                    this.getData();
                    toastr.success('', data.message, {
                        closeButton: true
                    });
                    this.setState({ redirect: true})
                    // location.href = '/app/roles';
                } else {
                    this.setState({ message: data.errors.name })
                }
            })
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
        if (!this.state.role || !this.state.permissions || !this.state.keys) {
            return <Loader />
        }
        if(this.state.redirect){
            return<Redirect to="/app/roles"/>
        }
        return (
            <>

                <div className="row">
                    <div className="col">
                        <h3>Editar Rol</h3>
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
                                    defaultValue={this.state.role.name}
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
                                                    <Permissions permissions={this.state.permissions[key]} userPermissions={this.state.role.permissions} />
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

const Permissions = ({ permissions, userPermissions }) => {
    const user_permissions_ids = userPermissions.map(userPermission => userPermission.id);
    return (
        <>
            {permissions.map((permission, i) => (
                <div className="form-check" key={i}>
                    <input className="form-check-input" type="checkbox" name="permissions[]" value={permission.id} id={"permission" + permission.id} defaultChecked={user_permissions_ids.includes(permission.id)} />
                    <label className="form-check-label" htmlFor={"permission" + permission.id}>
                        {permission.spanish_name}
                    </label>
                </div>
            ))}
        </>
    )
}

export default Roles;
