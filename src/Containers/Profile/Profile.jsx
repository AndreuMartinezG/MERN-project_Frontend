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
        let userId = props.userData.user._id
        userPosts(userId)
    }, [])

    useEffect(() => {
        if (props.userData.token === null) {
            navigate("/");
        }
    })


    const userPosts = async (userId) => {

        let body =  {id_owner : userId}
        
        // let config = {
        //     headers: { Authorization: `Bearer ${props.credentials.token}` }
        // };

        try {
            console.log(body)
            let res = await axios.post(`http://localhost:5000/threads/post/${userId}`, body);
            console.log(res)

        } catch (error) {
            console.log(error)
        }

    }


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