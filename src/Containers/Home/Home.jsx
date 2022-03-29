import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.min.css';
import { SET_THREADS, THREAD_DETAIL } from '../../Redux/types';

import './Home.css'

const Home = (props) => {

    let navigate = useNavigate();

    // Threads ya no se usa, se usa el state de redux
    const threads = props.threads;

    useEffect(() => {
        //UseEffect equivalente a componentDidMount (montado)
        traerHilos();
    }, [])

    useEffect(() => {
        //UseEffect equivalente a componentDidUpdate (actualizado)

    }, [threads])

    const traerHilos = async () => {

        try {
            const response = await axios.get('http://localhost:5000/threads');
            console.log(response.data.userName_owner, "esto es el response");

            setTimeout(() => {
                // Ya no usamos useState, se usa el state de redux
                props.dispatch({ type: SET_THREADS, payload: response.data });
            }, 2000);

        } catch (error) {
            console.log(error);
        }

    }

    const escogerHilo = (hilo) => {
        console.log(hilo);
        //Guardamos el hilo escogido en redux
        props.dispatch({ type: THREAD_DETAIL, payload: hilo });


        navigate("/threadDetail");
    }

    if (threads.length !== 0) {
        return (
            <div className='designHome'>

                {
                    threads.map(hilo => {
                        return (
                            <div className='threads' key={hilo._id} onClick={() => escogerHilo(hilo)}>
                                {/* {console.log(hilo, "esto es hilo bro", hilo._id, "esto es el id")} */}
                                <div className='renThread'>{hilo.userName_owner}<br />{hilo.headLine}</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    } else {
        return (
            <div className='designHome'>{"we don't have any thread at this moment"}</div>
        )
    }
}

// Conectar con redux
export default connect(state => ({
    threads: state.threads.threads
}))(Home);