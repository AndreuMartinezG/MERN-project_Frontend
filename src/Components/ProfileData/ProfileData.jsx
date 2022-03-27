import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

import './ProfileData.css'

const ProfileData = (props) => {



    return (
        <div className="userShow">
            <div className="userShowTop">
                <img
                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                    className="userShowImg"
                />
                <div className="userShowTopTitle">
                    <span className="userShowUsername">{props.credentials.userData.firstName}</span>
                    <span className="userShowUserTitle">Web Developer</span>
                </div>
            </div>
            <div className="userShowBottom">
                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                    <span className="userShowInfoTitle">{props.credentials.userData.firstName} {props.credentials.userData.lastName}</span>
                </div>
                <div className="userShowInfo">
                    <span className="userShowInfoTitle">{props.credentials.userData.birthday} años</span>
                </div>
                <span className="userShowTitle">Contact Details</span>
                <div className="userShowInfo">
                    <span className="userShowInfoTitle">{props.credentials.userData.nickName}</span>
                </div>
                <div className="userShowInfo">
                    <span className="userShowInfoTitle">{props.credentials.userData.email}</span>
                </div>
            </div>
        </div>
    )
}
export default connect((state) => ({
    userData: state.credentials.user
}))(ProfileData);