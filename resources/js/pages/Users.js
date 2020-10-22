import React, { Component } from 'react';
import Loader from '../components/Loader';
import { validate, formValid, setRules } from '../containers/Validator';
import { get, store, find, update, destroy, rules} from '../containers/User';
import { get as getRoles } from '../containers/Roles';
import VerifyPermission from '../components/VerifyPermission';

class Users extends Component {
    constructor(props) {

        super(props);
        this.state = {
            users: null,
            edit: false,
            roles: [],
            id: null,
            message: null,
            redirect: null,
            rules: rules
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }



    async getUsers() {
        let data = await get();
        if(!this.state.redirect){
            data.shift();
        }

        if (data[0] == 403) {
            // this.props.history.replace('/app');
            this.setState({ redirect: '/app' });
        }

        this.setState({ users: data });

    }

    async getRoles() {
        let data = await getRoles();
        if(!this.state.redirect){
            data.rols.shift();
        }

        this.setState({ roles: data.rols });
    }

    handleInput(e) {
        let { name, value } = e.target;
        let newRules = validate(name, value, rules)
        this.setState({ rules: newRules });
    }

    async handleEdit(e) {
        let id = $(e.target).data('id');
        this.setState({ edit: true});

        setRules(rules,false);

        let data = await find(id);
        this.setState({ id: data.roles[0].id });

        $('.modal').find('.modal-title').text('Editar usuario');
        $('.modal').find('#name').val(data.name);
        $('.modal').find('#email').val(data.email);
        // $('.modal').find('#rol').val(data.roles[0].id);

        $('.modal').modal('toggle');
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
                        if(data.success == false){
                            toastr.error('', data.message, {
                                closeButton: true
                            });
                        }if (data.success == true) {
                            this.getUsers();
                            toastr.success('', data.message, {
                                closeButton: true
                            });
                        }
                    })
            }
        })
    }

    handleModal() {
        $('#form').trigger('reset');
        setRules(rules);

        $('.modal').find('.modal-title').text('Agregar usuario');
        $('.modal').modal('toggle');
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (formValid(rules)) {
            if (this.state.edit) {
                let data = await update(e.target, this.state.id);
                if (data.success) {
                    this.getUsers();
                    $('.modal').modal('toggle');
                    toastr.success('', data.message, {
                        closeButton: true
                    });
                }else{
                    this.setState({message: data.errors.name})
                }
            } else {
                store(e.target).then(data => {
                    if (data.success) {
                        this.getUsers();
                        $('.modal').modal('toggle');
                        toastr.success('', data.message, {
                            closeButton: true
                        });
                    }else{
                        this.setState({message: data.errors.name})
                    }
                });
            }
        }else{
            this.setState({message:'Por favor completa el formulario'});
        }

    }


    componentDidMount() {
        this.getUsers();
        this.getRoles();
    }

    componentWillUnmount(){
        if (this.state.redirect) {
            this.setState({ users: null,
                edit: false,
                roles: null,
                id: null,
                message: null,
                redirect: null,
                rules: null });
        }
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }

        if (!this.state.users) {
            return <Loader />
        }



        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Usuarios</h3>
                        <VerifyPermission permission="create_user">
                            <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Agregar <span className="d-none d-md-inline ">nuevo usuario</span></a>
                        </VerifyPermission>
                    </div>
                </div>
                <div className="row">
                    {this.state.users.length > 0 ? (
                        this.state.users.map(user => (
                            <div className="col-12 col-lg-4 mt-3" key={user.id}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5>{user.name}</h5>
                                        <h6 className="text-muted">{user.email}</h6>
                                        <div className="row">
                                            <div className="col-3">
                                                <VerifyPermission permission="edit_user">
                                                    <a href="#" data-id={user.id} onClick={this.handleEdit} >Editar</a>
                                                </VerifyPermission>
                                            </div>
                                            <div className="col-9">
                                                <VerifyPermission permission="delete_user">
                                                     <a href="#" data-id={user.id} onClick={this.handleDelete} className="text-danger ml-3">Eliminar</a>
                                                </VerifyPermission>
                                            </div>

                                        </div>
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
                <div className="modal fade" data-backdrop="static" tabIndex="-1" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="form" onSubmit={this.handleSubmit}>
                                        {this.state.message ? (

                                        <div className="alert alert-info" role="alert">
                                            <span><i className="fa fa-info-circle" aria-hidden="true"></i>{this.state.message}</span>
                                        </div>
                                        ):(
                                            <div></div>
                                        )}
                                    <div className="form-group">
                                        <label htmlFor="">Nombre</label>
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
                                        <label htmlFor="">Correo electronico</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className={rules.email.isInvalid && rules.email.message != '' ? 'form-control is-invalid' : 'form-control'}
                                            onInput={this.handleInput}
                                        />
                                        <div className="invalid-feedback">
                                            {rules.email.isInvalid && rules.email.message != '' ? rules.email.message : ''}
                                        </div>
                                    </div>

                                    <div className="col">
                                            <label htmlFor="">Asigne un rol</label>
                                            {this.state.roles.length > 0 ? (
                                                this.state.roles.map((rol, i) => (
                                                    <div className="form-check" key={i}>
                                                        <input className="form-check-input" type="radio" name="rol" id={"rol" + rol.id} value={rol.id} defaultChecked={this.state.id == rol.id ? true : false} />
                                                        <label className="form-check-label" htmlFor={"rol" + rol.id}>
                                                            {rol.name}
                                                        </label>
                                                    </div>
                                                ))
                                            ) : (
                                                    <p>No hay clasificacion de faltas disponibles</p>
                                                )}
                                        </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="submit" form="form" className="btn btn-primary">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Users;
