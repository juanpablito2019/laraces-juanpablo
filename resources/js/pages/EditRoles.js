import React, { Component } from 'react';
import Loader from '../components/Loader';
import { validate, formValid, setRules } from '../containers/Validator';
import { get, rules, store, find, update } from '../containers/Roles';

class Roles extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            rols: [],
            name:'',
            rules: rules,
            permissions: [],
            rolPermissions:null,
            message: null
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    async getData(){
        // Data Roles
        this.setState({ rols: [] });
        let data = await find(this.state.id);
        this.setState({rols: data})
        this.setState({name: data.name})

        // console.log(data)

        // Data Permisos
        let dataPermission = await get();
        this.setState({permissions: dataPermission.permissions})

        this.setState({rolPermissions: dataPermission.userPermissions})



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
                    }else{
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

                <div className="row">
                    <div className="col col-sm-12 col-md-12 col-lg-6 m-auto">


                            <h3> Nuevo Rol </h3>



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
                                            defaultValue={this.state.name}
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
                                                <label className="form-check-label">{permission.spanish_name}</label>
                                            </div>
                                        ))}

                                    </div>

                                </form>

                                <button type="submit" form="form" className="btn btn-primary">Guardar</button>




                    </div>

                </div>

            </>
        )
    }
}

export default Roles;
