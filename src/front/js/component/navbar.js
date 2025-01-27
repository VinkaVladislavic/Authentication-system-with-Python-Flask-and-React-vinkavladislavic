import React, {useContext} from "react";
import { Link } from "react-router-dom";
import LoginForm from "./loginForm";
import { Context } from '../store/appContext'

export const Navbar = () => {
    const {store, actions} = useContext(Context)
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    React Boilerplate
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                {store.accessToken?
                <div className="ml-auto">
                    <Link to="/demo">
                        <button className="btn btn-primary">User info</button>
                    </Link>
                    <button onClick={()=>actions.logoutUser()} className="btn btn-primary">Logout</button>
                </div>:   
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item dropdown">
                            <button
                                className="btn btin-primary dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Login
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li>
                                    <LoginForm />
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                }
            </div>
        </nav>
    );
};
