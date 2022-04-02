import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../../Redux/types";
import { USER_SEARCH } from '../../Redux/types.js';
import axios from "axios";
import './Header.css'

import {Input, Button} from '@mantine/core';


const Header = (props) => {

    let navigate = useNavigate();


    const [formData, setformData] = useState({ postContent: "" });

    const modifyData = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    }

    // Traernos de Redux los datos del usuario y comprobar si está logueado
    // const { isLoggedIn, userName } = props;
    const isLoggedIn = props.isLoggedIn;
    const userName = props.userName;


    const navegar = (lugar) => {
        setTimeout(() => {
            navigate(lugar);
        }, 200);
    }

    const logout = () => {
        props.dispatch({ type: LOGOUT });
    }


    //Buscamos usuarios por nombre
    const busquedaPorusuario = async (e) => {
        e.preventDefault();
        // 
        console.log(formData, "sssssssssssssssssssssssssssssssssssssssssss")
        let name = formData.postContent
            try {
                let resultados = await axios.post(`http://localhost:5000/users/results/${name}`);

    
                props.dispatch({type: USER_SEARCH, payload: resultados.data});
    
                setTimeout(()=>{
                    navigate("/users");
                },500);
    
    
            } catch (error) {
                console.log(error);
            }
    }



    return (
        <div className='designHeader'>

            <div className="link" onClick={() => navegar("/")}>Home</div>

            {/* Si el usuario no está loguado no mostraremos estos botones */}
            {isLoggedIn &&
            <form 
            onSubmit={(e) => busquedaPorusuario(e)}
            style={{
                width: '25%',
                display: 'flex',
                flexDirection: 'row'
            }}>
            <Input 
                value={formData.postContent}
                onChange={(e) => modifyData(e)}
                name="postContent" 
                placeholder="Search User"/>
            <Button
                    type="submit"
                    style={{ marginLeft: '1em', marginRight: '1em'}}
                    color="light"
                    gradient={{ from: 'indigo', to: 'cyan' }}>Submit
                </Button>
            </form>
            }
            {!isLoggedIn && <div className="link" onClick={() => navegar("/login")}>Login</div>}
            {!isLoggedIn && <div className="link" onClick={() => navegar("/register")}>Register</div>}

            {/* Si el usuario está loguado mostraremos estos botones*/}
            {isLoggedIn && <div className="link" onClick={() => navegar("/profile")}>{userName}</div>}
            {isLoggedIn && <div className="link" onClick={() => logout()}>Logout</div>} 


        </div >
    )

}


export default connect((state) => ({
    isLoggedIn: state.credentials.token !== null,
    userName: state.credentials.user.firstName
}))(Header);