import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

import './profile.css'

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
            <div className="headerProfile">
                <img
                    src="https://picsum.photos/id/1018/3000"
                    className="headerProfileMainImg"
                    alt="cover"
                />
                <div className="headerProfileImg">
                    <img
                        src="https://picsum.photos/id/1005/1000"
                        className="headerProfileBodyImg"
                        alt="cover"
                    />
                    
                </div>
                
            </div>
            <h3>{props.userData.user.firstName} {props.userData.user.lastName}</h3>
            <div className="bodyProfile">
                
            </div>


            


        </div>
    );
}

export default connect((state) => ({
    userData: state.credentials
}))(Profile);