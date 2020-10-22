/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

import Loader from "./components/Loader";

require('./bootstrap');

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import routes from './routes';
import Roles from './pages/Roles';
import Users from './pages/Users';
import VerifyPermission from "./components/VerifyPermission";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

function App() {
    const [permissions, setPermissions] = useState(localStorage.getItem('permissions'));
    const [superAdmin, setSuperAdmin] = useState(null);
    const prefix = '/app';
    const authUsername = document.getElementById('auth-username').content.split('-')[0];
    const authId = document.getElementById('auth-username').content.split('-')[1];
    const handleToggle = () => {
        $('#sidebar').toggleClass('active');
        $('#content').toggleClass('active');
    }
    const handleActive = (e) => {
        let actives = document.getElementsByClassName('active');
        for (let i = 0; i < actives.length; i++) {
            actives[i].classList.remove('active');
        }
        $(e.target).parent().addClass('active');
    }

    const getPermissions = async () => {
        try {
            let res = await fetch('/userPermissions');
            let data = await res.json();
            let permissions = data.permissions.map(permission => permission.name);
            localStorage.setItem('permissions', permissions);
            localStorage.setItem('super', data.superAdmin ? 1 : 2);
            setPermissions(permissions);
            setSuperAdmin(data.superAdmin);
        } catch (err) {
            console.log(err)
        }
    }

    const clear = () => {
        localStorage.clear();
    }

    useEffect(() => {
        getPermissions();
    }, []);

    let path = location.pathname.split('/')[2];
    if (!permissions && !superAdmin) {
        return (
            <>
                <div className="container" style={{ margin: '200px auto' }}>
                    <div className="row">
                        <div className="col">
                            <Loader />
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <Router>
            <div className="wrapper">
                <nav id="sidebar">
                    <div className="sidebar-header text-center">
                        <div className="row">
                            <div className="col-2 p-2 ml-5">
                                <img src="/img/LOGOCES.svg" className="d-block" style={{ width: '50px' }} alt="" />
                            </div>
                            <div className="col p-3 mr-3 text-left">
                                <h3 className="d-inline">CES</h3>
                            </div>
                        </div>
                    </div>

                    <ul className="list-unstyled components">
                        < li onClick={handleActive} >
                            <Link to={prefix + "/"}>- Home</Link>
                        </li>
                        {routes.map((route, index) => (
                            route.type == 'menu' && route.visible ? (
                                <li key={index}>
                                    <a href={"#submenu" + index} data-toggle="collapse" aria-expanded="false">+ {route.name}</a>
                                    <ul className="collapse list-unstyled" id={"submenu" + index}>
                                        {route.routes.map((subroute, index) => (
                                            <VerifyPermission permission={subroute.permission} key={index}>
                                                {
                                                    subroute.visible ? (
                                                        <li onClick={handleActive} className={route.path === '/' + path ? 'active' : ''}>
                                                            <Link to={prefix + subroute.path}>- {subroute.name}</Link>
                                                        </li>
                                                    ) : (
                                                            <div key={index} className=""></div>
                                                        )
                                                }
                                            </VerifyPermission>
                                        ))}

                                    </ul>
                                </li>
                            ) : (
                                    <VerifyPermission permission={route.permission} key={index}>
                                        {
                                            route.visible ? (
                                                < li onClick={handleActive} className={route.path === '/' + path ? 'active' : ''} >
                                                    <Link to={prefix + route.path}>- {route.name}</Link>
                                                </li>
                                            ) : (
                                                    <div key={index} className=""></div>
                                                )
                                        }
                                    </VerifyPermission>
                                )
                        ))}
                    </ul>
                </nav>
                <div id="content">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">

                            <button type="button" id="sidebarCollapse" onClick={handleToggle} className="btn btn-primary">
                                <i className="fas fa-bars"></i>
                            </button>
                            <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <i className="fas fa-align-justify"></i>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item dropdown">
                                        <a className="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {authUsername} <i className="fa fa-angle-down" aria-hidden="true"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                            <Link className="dropdown-item" to={prefix + "/profile/" + authId}>Perfil</Link>
                                            <div className="dropdown-divider"></div>
                                            <VerifyPermission permission="list_report">
                                                <Link className="dropdown-item" to={prefix + "/reports"}>Reportes</Link>
                                            </VerifyPermission>
                                            <VerifyPermission permission="list_role">
                                                <Link className="dropdown-item" to={prefix + "/roles"}>Roles</Link>
                                            </VerifyPermission>
                                            <VerifyPermission permission="list_user">
                                                <Link className="dropdown-item" to={prefix + "/users"}>Usuarios</Link>
                                            </VerifyPermission>
                                            <a className="dropdown-item" onClick={clear} href={prefix + "/logout"}>Cerrar session</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <Route 
                        path="*"
                    />
                        <Redirect to="/app/" />
                    <Route
                        path={prefix + "/"}
                        exact
                        component={Home}
                    />
                    <VerifyPermission permission="list_role">
                    <Route
                        path={prefix + "/roles"}
                        exact
                        component={Roles}
                    />
                    </VerifyPermission>
                    <VerifyPermission permission="list_user">
                    <Route
                        path={prefix + "/users"}
                        exact
                        component={Users}
                    />
                    </VerifyPermission>
                    <Route
                        path={prefix + "/profile/:id"}
                        exact
                        component={Profile}
                    />
                    <VerifyPermission permission="list_report">
                        <Route
                            path={prefix + "/reports"}
                            exact
                            component={Reports}
                        />
                    </VerifyPermission>
                    {routes.map((route, index) => (
                        route.type == 'menu' ? (
                            route.routes.map((subroute, index) => (
                                <VerifyPermission permission={subroute.permission} key={index}>
                                    <Route
                                        path={prefix + subroute.path}
                                        exact
                                        component={subroute.component}
                                    />
                                </VerifyPermission>
                            ))

                        ) :
                            (
                                <VerifyPermission permission={route.permission} key={index}>
                                    <Route
                                        path={prefix + route.path}
                                        exact
                                        component={route.component}
                                    />
                                </VerifyPermission>
                            )
                    ))}
                </div>
            </div>
        </Router >
    )
}
export default App;
if (document.getElementById('react-app')) {
    ReactDOM.render(<App />, document.getElementById('react-app'));
}
