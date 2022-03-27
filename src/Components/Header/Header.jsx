import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../../Redux/types";
import './Header.css'


const Header = (props) => {

    let navigate = useNavigate();

    // Traernos de Redux los datos del usuario y comprobar si está logueado
    // const { isLoggedIn, userName } = props;
    const isLoggedIn = props.isLoggedIn;
    const userName = props.userName;
    console.log(userName)

    const navegar = (lugar) => {
        setTimeout(() => {
            navigate(lugar);
        }, 200);
    }

    const logout = () => {
        props.dispatch({ type: LOGOUT });
    }

    return (
        <div className='designHeader'>

            <div className="link" onClick={() => navegar("/")}>Home</div>
            {/* <div className="link" onClick={() => navegar("/profile")}>Profile</div> */}

            {/* Si el usuario no está loguado no mostraremos estos botones */}

            {!isLoggedIn && <div className="link" onClick={() => navegar("/login")}>Login</div>}
            {!isLoggedIn && <div className="link" onClick={() => navegar("/register")}>Register</div>}

            {/* Si el usuario está loguado mostraremos estos botones */}
            {isLoggedIn && <div className="link" onClick={() => navegar("/profile")}>{userName}</div>}
            {isLoggedIn && <div className="link" onClick={() => logout()}>Logout</div>}


        </div >
    )

}


export default connect((state) => ({
    isLoggedIn: state.credentials.token !== null,
    userName: state.credentials.user.firstName
}))(Header);