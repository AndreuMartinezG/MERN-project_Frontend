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
                    className="object-cover w-full h-full rounded-b"
                    alt="cover"
                />
                <div className="absolute -bottom-6">
                    <img
                        src="https://picsum.photos/id/1005/1000"
                        className="object-cover border-4 border-white w-40 h-40 rounded-full"
                        alt="cover"
                    />
                </div>
            </div>
        </div>
    );
}

export default connect((state) => ({
    userData: state.credentials
}))(Profile);