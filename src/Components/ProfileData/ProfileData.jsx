import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

import './ProfileData.css'

const ProfileData = (props) => {

    console.log(props)
    
    const userData = props.userData;

    return (
        <div className="userShow">

            <div className="userShowBottom">
                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                    <span className="userShowInfoTitle">{userData.firstName} {userData.lastName}</span>
                </div>
                <div className="userShowInfo">
                    <span className="userShowInfoTitle">{userData.birthday} años</span>
                </div>
                <div className="userShowInfo">
                    <span className="userShowInfoTitle">Followed : {userData.followed.length} people</span>
                </div>
                <div className="userShowInfo">
                    <span className="userShowInfoTitle">Followers : {userData.followers.length}</span>
                </div>
                <span className="userShowTitle">Contact Details</span>
                <div className="userShowInfo">
                    <span className="userShowInfoTitle">{userData.userName}</span>
                </div>
                <div className="userShowInfo">
                    <span className="userShowInfoTitle">{userData.email}</span>
                </div>

            </div>
        </div>
    )
}
export default connect((state) => ({
    userData: state.credentials.user
}))(ProfileData);