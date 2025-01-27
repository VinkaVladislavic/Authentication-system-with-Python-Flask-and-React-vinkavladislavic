import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    const {store, actions} = useContext(Context)
    const navigate = useNavigate()

    async function submitForm(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const email = formData.get("email")
        const password = formData.get("password")
        let success = await actions.loginUser(email, password)
        if (!success) {
            console.log("Error en el inicio de sesion")
            return
        } else {
            console.log("Usuario logeado")
            navigate(-1)
        }
    }

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <form onSubmit={submitForm} className="p-3 border rounded">
                <h3 className="text-center mb-4">Iniciar Sesión</h3>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="email"
                        placeholder="Ingresa tu correo"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="password"
                        placeholder="Ingresa tu contraseña"
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-100">
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
