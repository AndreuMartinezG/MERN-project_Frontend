import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {connect} from 'react-redux'
 
import './profile.css'
 
const Profile = (props) => {
 
    let navigate = useNavigate();
 
    useEffect(()=>{
    console.log(props)
 
    },[])
 
    useEffect(()=>{
    //UseEffect equivalente a componentDidUpdate (actualizado)
 
    },)
 
 
    return (
        <div className='designProfile'>Profile</div>
    )
}

export default connect((state) => ({ 
    userData: state.credentials
}))(Profile);