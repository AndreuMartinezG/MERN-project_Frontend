import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

import './profile.css'
import HeaderProfile from '../../Components/HeaderProfile/HeaderProfile';
import ProfileData from '../../Components/ProfileData/ProfileData';

const Profile = (props) => {

    let navigate = useNavigate();

    useEffect(() => {
        console.log(props)

    }, [])

    useEffect(() => {
        //UseEffect equivalente a componentDidUpdate (actualizado)

    })


    return (
        <div className="designProfile">
            <HeaderProfile />
            <h3>{props.userData.user.firstName} {props.userData.user.lastName}</h3>
            
            <div className="bodyProfile">
                <div className="halfBodyProfileL">
                    <ProfileData />
                    
                </div>
                <div className="halfBodyProfileR"></div>
            </div>

        </div>
    );
}

export default connect((state) => ({
    userData: state.credentials
}))(Profile);