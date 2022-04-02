
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
// import { MOVIE_DETAIL } from '../../redux/types';

import './Users.css'


function Users (props) {

    let navigate = useNavigate();

    

    useEffect(() => {
        console.log(props.userData);
    }, []);


    //useEffect custom para el hook films

    useEffect(() => {
        console.log(" CAMBIARON LOS USUARIOS, ", props.userData);
    }, []);

    const escogeUsuario = (usuarios) => {

        console.log(usuarios, "he escogido este pendejo....");
        //Guardamos la pelicula escogida en redux
        // props.dispatch({ type: MOVIE_DETAIL, payload: pelicula });


        //Redirigimos a movieDetail con navigate
        navigate("/profile");
    }

    const busquedaPorusuario = async () => {
    
        //Axios que trae resultados....

        // let config = {
        //     headers: { Authorization: `Bearer ${props.credentials.token}` }
        // };

            try {
                let resultados = await axios.get(`http://localhost:5000/users`);
    
                //Guardo en redux los resultados de las películas
    
                // props.dispatch({type: MOVIES_TITLE, payload: resultados.data});
    
                setTimeout(()=>{
                    navigate("/searchresults");
                },500);
    
    
            } catch (error) {
                console.log(error);
            }
        }
        


    if (props.userData._id !== undefined) {
        return (
            <div className="designUserSearch">

                

            </div>
        )
    }
}

export default connect((state) => ({
    userData: state.credentials
}))(Users);