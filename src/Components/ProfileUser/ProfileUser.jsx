import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment';

import './ProfileUser.css'

const ProfileUser = (props) => {

    console.log(props )
    
    const userData = props.userData.userSearch[0];
    console.log(userData, "SOOOOOOOOOOOOOOOOOOOOOOOOOOY User DATA")
    return (
        <div className="userShow">

            <div className="userShowBottom">
                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                    <span className="userShowInfoTitle">Name : {userData.firstName} {userData.lastName}</span>
                </div>
                <div className="userShowInfo">
                    <span className="userShowInfoTitle">Birthday : {moment(userData.birthday).format('L') } 
                      </span>
                </div>
                <div className="userShowInfo">
                    <span className="userShowInfoTitle">Followed : {userData.followed?.length}</span>
                </div>
                <div className="userShowInfo">
                    <span className="userShowInfoTitle">Followers : {userData.followers?.length}</span>
                </div>

                <div className="userShowInfo">
                    <span className="userShowInfoTitle">Nickname : {userData.userName}</span>
                </div>


            </div>
        </div>
    )
}
export default connect((state) => ({
    userData: state.credentials
}))(ProfileUser);