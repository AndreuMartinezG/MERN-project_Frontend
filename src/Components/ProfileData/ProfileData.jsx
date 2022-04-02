import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

import './ProfileData.css'

const ProfileData = (props) => {

    console.log(props, "SOOOOOOOOOOOOOOOOOOOOOOOOOOY PROFILE DATA")
    
    const userData = props.userData;

    return (
        <div className="userShow">

            <div className="userShowBottom">
                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                    <span className="userShowInfoTitle">{userData.user.firstName} {userData.user.lastName}</span>
                </div>
                <div className="userShowInfo">
                    <span className="userShowInfoTitle">Birthday : {userData.user.birthday} </span>
                </div>
                <div className="userShowInfo">
                    <span className="userShowInfoTitle">Followed : {userData.user.followed?.length} people</span>
                </div>
                <div className="userShowInfo">
                    <span className="userShowInfoTitle">Followers : {userData.user.followers?.length}</span>
                </div>
                <span className="userShowTitle">Contact Details</span>
                <div className="userShowInfo">
                    <span className="userShowInfoTitle">Nickname : {userData.user.userName}</span>
                </div>
                <div className="userShowInfo">
                    <span className="userShowInfoTitle">Email : {userData.user.email}</span>
                </div>

            </div>
        </div>
    )
}
export default connect((state) => ({
    userData: state.credentials
}))(ProfileData);