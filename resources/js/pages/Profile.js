import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { find, updatePersonalInformation as updatePI, updatePassword as updatePW } from '../containers/User';
import Loader from '../components/Loader';

const Profile = (props) => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [validaPWD, setValidPWD] = useState(false);
    const history = useHistory();
    const getUser = async (id) => {
        let data = await find(id);
        setUser(data);
    }
    const updatePersonalInformation = async (e) => {
        e.preventDefault();
        let data = await updatePI(id, e.target);
        if(data.success){
            window.location.replace(`/app/profile/${id}`);
            toastr.success(data.message);
            return;
        }
        toastr.warning(data.message);
    }
    const updatePassword = async (e) => {
        e.preventDefault();
        if(validaPWD){
            let data = await updatePW(id, e.target);
            if(data.success){
                toastr.success(data.message);
                $('#password').val('');
                $('#password_confirm').val('');
                $('#password_confirm').removeClass('is-valid');
                setValidPWD(false);
                return;
            }
            toastr.warning(data.message);
        }else{
            toastr.info('Verifica el cambio de contraseña')
        }
    }
    const verifyPassword = (e) => {
        let pwd = e.target.value;
        
        if(pwd.length < 8){
            $(e.target).addClass('is-invalid');
        }else{
            $(e.target).removeClass('is-invalid');
        }
    }
    const verifyPasswordConfirm = (e) => {
        let pwd_confirm = e.target.value;
        let pwd = $('#password').val();
        if(pwd.length < 8){
            $(e.target).addClass('is-invalid');
        }else{
            $(e.target).removeClass('is-invalid');
        }
        if(pwd != pwd_confirm){
            $(e.target).removeClass('is-valid');
            $(e.target).addClass('is-invalid');
        }
        if(pwd == pwd_confirm){
            $(e.target).removeClass('is-invalid');
            $(e.target).addClass('is-valid');
        }

        if(pwd == pwd_confirm && pwd.length >= 8){
            setValidPWD(true);
        }
    }
    useEffect(() => {
        getUser(id)
    }, []);
    if (!user) {
        return (
            <Loader />
        )
    }
    return (
        <>
            <div className="row">
                <div className="col">
                    <h4>Informacion de usuario</h4>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5>Personal</h5>
                            <form onSubmit={updatePersonalInformation}>
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input type="text" className="form-control" name="name" id="name" defaultValue={user.name} />
                                </div>
                                <div className="form-group">
                                    <label>Correo electronico</label>
                                    <input type="email" className="form-control" name="email" id="email" defaultValue={user.email} />
                                </div>
                                <button className="btn btn-outline-primary">Guardar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5>Cuenta</h5>
                            <form onSubmit={updatePassword}>
                                <div className="form-group">
                                    <label>Rol</label>
                                    <p>{user.roles[0].name}</p>
                                </div>
                                <hr />
                                <h5>Cambiar contraseña</h5>
                                <div className="form-group">
                                    <label>Nueva contraseña</label>
                                    <input type="password" onInput={verifyPassword} className="form-control" name="password" id="password" />
                                    <div className="invalid-feedback">
                                        La contraseña debe tener minimo 8 caracteres
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Confirmacion de contraseña</label>
                                    <input type="password" onInput={verifyPasswordConfirm} className="form-control" name="password_confirm" id="password_confirm" />
                                    <div className="invalid-feedback">
                                        Las contraseñas no coinciden
                                    </div>
                                </div>
                                <button disabled={!validaPWD} className="btn btn-outline-primary">Guardar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Profile;