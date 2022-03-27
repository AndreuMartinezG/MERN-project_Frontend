import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from 'antd'
import "antd/dist/antd.css";

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
            <h2>{props.userData.user.firstName} {props.userData.user.lastName}</h2>

            <div className="bodyProfile">
                <div className="halfBodyProfileL">
                    <ProfileData />
                    <Button type="primary" style={{marginTop: '5em'}}>
                        Modify Profile
                    </Button>
                </div>
                <div className="halfBodyProfileR">
                    Last Posts
                </div>
            </div>

        </div>
    );
}

export default connect((state) => ({
    userData: state.credentials
}))(Profile);