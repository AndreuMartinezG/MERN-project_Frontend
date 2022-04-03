import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { checkError } from '../../tools'
import './Register.css'

const Register = (props) => {

    let navigate = useNavigate();

    useEffect(() => {
        //UseEffect equivalente a componentDidMount (montado)

    }, [])

    useEffect(() => {
        //UseEffect equivalente a componentDidUpdate (actualizado)

    })

    const [datosUsuario, setDatosUsuario] = useState({
        firstName: "", surname: "", userName: "", birthday: "",
        email: "", password: "", password2: "",
    });

    const [msgError, setMsgError] = useState("");

    const rellenarDatos = (e) => {
        setDatosUsuario({
            ...datosUsuario,
            [e.target.name]: e.target.value
        })
    };

    const registrame = async () => {

        //Array de distintos campos

        setMsgError("");
        let error = "";

        let arrayCampos = Object.entries(datosUsuario);

        console.log(datosUsuario.password,"esta es password")
        console.log(datosUsuario.password2,"esta es password2")

        // //1 comprobación de errores antes de enviar al backend

        if (datosUsuario.password !== datosUsuario.password2) {

            return (setMsgError("the passwords must coincide each other, try again"));

        } else {
            setMsgError("");
        }

        for (let elemento of arrayCampos) {
            error = checkError(elemento[0], elemento[1]);

            if (error !== "ok") {
                setMsgError(error);
                return;
            };
        };

        console.log("todo ha ido biennnnnnnnnnnnnnnnn")

        //2construimos el body

        let body = {
            firstName: datosUsuario.firstName,
            lastName: datosUsuario.surname,
            userName: datosUsuario.userName,
            email: datosUsuario.email,
            password: datosUsuario.password,
            birthday: datosUsuario.birthday,
        }

        console.log("le llaman BODYYY PAPAAAAA", body);
        //3 envio de axios

        try {

            let resultado = await axios.post("https://mern-backend-forum.herokuapp.com/users", body);
            console.log(resultado);

            setTimeout(() => {
                navigate("/login");
            }, 1000);



        } catch (error) {
            console.log(error);
        }

    }



    return (
        <div className='designRegister'>

            <div className="recuadro">
                <div className="titulo">Register form
                    <div className="relleno"></div></div>
                <div className="inpunts">
                    <input className='inp' type="text" name="firstName" id="fisrtName" title="fisrtName" placeholder="Name" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='inp' type="text" name="surname" id="lastName" title="lastName" placeholder="Surname" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='inp' type="text" name="userName" id="username" title="username" placeholder="Username" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='inp date' type="date" name="birthday" id="birthday" title="birthday" placeholder="Birthday" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='inp' type="email" name="email" id="email" title="email" placeholder="Email" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='inp' type="password" name="password" id="password" title="password" placeholder="Password" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='inp' type="password" name="password2" id="password2" title="password2" placeholder="Repeat Password" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                </div>
                <div className="bottomCardRegister">
                    <div className="relleno2">{msgError} </div>
                    <div className="registerButton" onClick={() => registrame()}>
                        Register
                    </div>
                </div>
            </div>
        </div>

    )
}



export default connect((state) => ({
    //variables de rdx a crear
}))(Register);