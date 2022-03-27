import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { LOGIN } from '../../Redux/types';

import './Login.css'

const Login = (props) => {

    let navigate = useNavigate();

    const [userData, setUserData] = useState({ email: "", password: "" });
    const [msgError, setMsgError] = useState("");


    useEffect(() => {
        if (props.isLoggedIn) {
            navigate('/');
        }
    }, []);


    const introduceData = (e) => {

        setUserData({ ...userData, [e.target.name]: e.target.value })

    };

    const login = async () => {
        try {

            //Me invento las credenciales
            let body = {
                email: userData.email,
                password: userData.password
            }

            let resultado = await axios.post("http://localhost:5000/users/login", body);

            //Cambiamos el valor del hook credenciales, por lo tanto se recargará el componente
            if (resultado.data === "Usuario o contraseña inválido") {
                setMsgError("Usuario o contraseña inválido")
            } else {

                //Guardaríamos los datos en redux...

                props.dispatch({ type: LOGIN, payload: resultado.data });


                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }


        } catch (error) {

            console.log(error)

        }

    }



    return (
        <div className='designLogin'>Login


            <div className="designFormulario">
                <input type="email" name="email" id="email" title="email" placeholder="Correo Electrónico" autoComplete="off" onChange={(e) => { introduceData(e) }} />
                <input type="password" name="password" id="password" title="password" placeholder="Contraseña" autoComplete="off" onChange={(e) => { introduceData(e); }} />
                {msgError}
            </div>
            <div className="loginButton espacio" onClick={() => login()}>LOG ME!</div>
        </div>
    )
}
export default connect((state) => ({
    isLoggedIn: state.credentials.token !== null
}))(Login);