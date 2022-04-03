import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { LOGIN } from '../../Redux/types';

import './Login.css'
import { Button, Input, Title } from '@mantine/core';

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

            let resultado = await axios.post("https://mern-backend-forum.herokuapp.com/users/login", body);

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
        <div className='designLogin'> <Title order={1}>Login</Title>


            <div className="designFormulario">
                <Input style={{ display: 'flex', margin: '.5em', width: '30em' }} name="email" type="email" id="email" title="email" variant="default" placeholder="Email" autoComplete="off" onChange={(e) => { introduceData(e) }} />
                <Input style={{ display: 'flex', margin: '.5em', width: '30em' }} name="password" type="password" id="password" title="password" variant="default" autoComplete="off" placeholder="Password" onChange={(e) => { introduceData(e) }} />
                {msgError}
            </div>
            <div className="loginButton espacio" > <Button onClick={() => login()}>Login </Button></div>
        </div>
    )
}
export default connect((state) => ({
    isLoggedIn: state.credentials.token !== null
}))(Login);


