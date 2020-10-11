/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import routes from './routes';
import Roles from './pages/Roles';
import Users from './pages/Users';
import NotFound from './pages/NotFound';
/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

function App() {
    const prefix = '/app';
    const authUsername = document.getElementById('auth-username').content;
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

    let path = location.pathname.split('/')[2];

    return (
        <Router>
            <div className="wrapper">
                <nav id="sidebar">
                    <div className="sidebar-header text-center">
                        <div className="row">
                            <div className="col-2 p-2 ml-5">
                                <img src="/img/logo.svg" className="d-block" style={{width: '50px'}} alt=""/>
                            </div>
                            <div className="col p-3 mr-3 text-left">
                                <h3 className="d-inline">CES</h3>
                            </div>
                        </div>
                    </div>

                    <ul className="list-unstyled components">

                        {routes.map((route, index) => (
                            route.type == 'menu' && route.visible ? (
                                <li key={index}>
                                    <a href={"#submenu" + index} data-toggle="collapse" aria-expanded="false">+ {route.name}</a>
                                    <ul className="collapse list-unstyled" id={"submenu" + index}>
                                        {route.routes.map((subroute, index) => (
                                            subroute.visible ? (
                                                <li key={index} onClick={handleActive} className={route.path === '/' + path ? 'active' : ''}>
                                                    <Link to={prefix + subroute.path}>- {subroute.name}</Link>
                                                </li>
                                            ):(
                                                <div key={index} className=""></div>
                                            )

                                        ))}

                                    </ul>
                                </li>
                            ) : (
                                    route.visible ? (
                                        < li key={index} onClick={handleActive} className={route.path === '/' + path ? 'active' : ''} >
                                            <Link to={prefix + route.path}>- {route.name}</Link>
                                        </li>
                                    ):(
                                        <div key={index} className=""></div>
                                    )
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
                                            <Link className="dropdown-item" to={prefix + "/roles"}>Roles</Link>
                                            <Link className="dropdown-item" to={prefix + "/users"}>Usuarios</Link>
                                            <a className="dropdown-item" href={prefix + "/logout"}>Cerrar session</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <Route
                        path={prefix + "/roles"}
                        exact
                        component={Roles}
                    />
                    <Route
                        path={prefix + "/users"}
                        exact
                        component={Users}
                    />
                    {routes.map((route, index) => (
                        route.type == 'menu' ? (
                            route.routes.map((subroute, index) => (
                                <Route
                                    key={index}
                                    path={prefix + subroute.path}
                                    exact
                                    component={subroute.component}
                                />
                            ))

                        ) :
                            (
                                <Route
                                    key={index}
                                    path={prefix + route.path}
                                    exact
                                    component={route.component}
                                />
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
