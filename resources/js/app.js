/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

import Loader from "./components/Loader";

require("./bootstrap");

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import routes from "./routes";
import Roles from "./pages/Roles";
import Users from "./pages/Users";
import VerifyPermission from "./components/VerifyPermission";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";

import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarContent,
    SidebarFooter
} from "react-pro-sidebar";

function App() {
    const [permissions, setPermissions] = useState(
        localStorage.getItem("permissions")
    );
    const [superAdmin, setSuperAdmin] = useState(null);
    const [toggle, setToggle] = useState(false);
    const prefix = "/app";
    const authUsername = document
        .getElementById("auth-username")
        .content.split("-")[0];
    const authId = document
        .getElementById("auth-username")
        .content.split("-")[1];

    const getPermissions = async () => {
        try {
            let res = await fetch("/userPermissions");
            let data = await res.json();
            let permissions = data.permissions.map(
                permission => permission.name
            );
            localStorage.setItem("permissions", permissions);
            localStorage.setItem("super", data.superAdmin ? 1 : 2);
            setPermissions(permissions);
            setSuperAdmin(data.superAdmin);
        } catch (err) {
            console.log(err);
        }
    };

    const clear = () => {
        localStorage.clear();
    };

    useEffect(() => {
        getPermissions();
    }, []);

    let path = location.pathname.split("/")[2];
    if (!permissions && !superAdmin) {
        return (
            <>
                <div className="container" style={{ margin: "200px auto" }}>
                    <div className="row">
                        <div className="col">
                            <Loader />
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return (
        <Router>
            <ProSidebar breakPoint="md" toggled={toggle}>
                <SidebarHeader className="text-center">
                    <img
                        src="/img/LOGOCES.svg"
                        className="d-block"
                        style={{ width: "100px", margin: "20px auto" }}
                        alt=""
                    />
                    <h4>Comité y evaluacion</h4>
                </SidebarHeader>
                <SidebarContent>
                    <Menu>
                        <MenuItem>
                            Dashboard
                            <Link to={prefix + "/"} />
                        </MenuItem>
                        {routes.map((route, i) =>
                            route.type == "menu" && route.visible ? (
                                <SubMenu title={route.name} key={i}>
                                    {route.routes.map((subroute, i) => (
                                        <VerifyPermission
                                            permission={subroute.permission}
                                            key={i}
                                        >
                                            {subroute.visible ? (
                                                <MenuItem>
                                                    {subroute.name}
                                                    <Link
                                                        to={
                                                            prefix +
                                                            subroute.path
                                                        }
                                                    />
                                                </MenuItem>
                                            ) : (
                                                <div key={i}></div>
                                            )}
                                        </VerifyPermission>
                                    ))}
                                </SubMenu>
                            ) : (
                                <VerifyPermission
                                    permission={route.permission}
                                    key={i}
                                >
                                    {route.visible ? (
                                        <MenuItem>
                                            {route.name}
                                            <Link to={prefix + route.path} />
                                        </MenuItem>
                                    ) : (
                                        <div></div>
                                    )}
                                </VerifyPermission>
                            )
                        )}
                        <SubMenu title={authUsername}>
                            <MenuItem>
                                Perfil
                                <Link to={prefix + "/profile/" + authId} />
                            </MenuItem>
                            <a href={prefix + "/logout"} onClick={clear}>
                                <MenuItem>Cerrar sesion</MenuItem>
                            </a>
                        </SubMenu>
                        <MenuItem onClick={() => setToggle(false)} className="close-menu">
                            Cerrar menu
                        </MenuItem>
                    </Menu>
                </SidebarContent>
                <SidebarFooter className="text-center">
                    © {new Date().getFullYear()} - Comité
                </SidebarFooter>
            </ProSidebar>
            <main>
                <div className="container">
                    <div className="btn-toggle" onClick={() => setToggle(true)}>
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 448 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
                        </svg>
                        <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
                    </div>
                    <Route path="*" />
                    <Redirect to="/app/" />
                    <Route path={prefix + "/"} exact component={Home} />
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
                    {routes.map((route, index) =>
                        route.type == "menu" ? (
                            route.routes.map((subroute, index) => (
                                <VerifyPermission
                                    permission={subroute.permission}
                                    key={index}
                                >
                                    <Route
                                        path={prefix + subroute.path}
                                        exact
                                        component={subroute.component}
                                    />
                                </VerifyPermission>
                            ))
                        ) : (
                            <VerifyPermission
                                permission={route.permission}
                                key={index}
                            >
                                <Route
                                    path={prefix + route.path}
                                    exact
                                    component={route.component}
                                />
                            </VerifyPermission>
                        )
                    )}
                </div>
            </main>
        </Router>
    );
}
export default App;
if (document.getElementById("react-app")) {
    ReactDOM.render(<App />, document.getElementById("react-app"));
}
