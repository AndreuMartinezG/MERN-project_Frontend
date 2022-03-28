import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.min.css';

import './Home.css'

const Home = (props) => {

    let navigate = useNavigate();

    const [threads, setThreads] = useState([]);

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
            console.log(response.data.userName_owner,"esto es el response");
            
            setTimeout(() => {
                
                setThreads(response.data);
            }, 2000);

        } catch (error) {
            console.log(error);
        }


    }

    const escogerHilo = (hilos) => {
        console.log(hilos);
        //Guardamos la pelicula escogida en redux
        props.dispatch({type:THREAD_DETAIL, payload: hilos});


        //Redirigimos a movieDetail con navigate
        navigate("/moviedetail");
    }

    if (threads.length !== 0) {
        return (
            <div className='designHome'>
                
                {
                    threads.map(hilos => {
                        return(
                        <div className='threads' key={hilos._id} >
                            {console.log(hilos,"esto es hilo bro",hilos._id,"esto es el id")}
                            <div className='renThread'>{hilos.userName_owner}<br/>{hilos.headLine}</div>
                        </div>
                        )
                    })
                }
            </div>
        )
    }else {
        return(
            <div className='designHome'>{"we don't have any thread at this moment"}</div>
        )
    }
}

export default connect()(Home);