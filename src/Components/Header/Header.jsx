import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Header.css'


const Header = () => {

    let navigate = useNavigate();

    const navegar = (lugar) => {

        setTimeout(() => {
            navigate(lugar);
        }, 200);

    }

    return (
        <div className='designHeader'>

            <div className="link" onClick={() => navegar("/")}>Home</div>
            <div className="link" onClick={() => navegar("/profile")}>Profile</div>
            <div className="link" onClick={() => navegar("/login")}>Login</div>
            <div className="link" onClick={() => navegar("/register")}>Register</div>

        </div>
    )

}

export default Header;