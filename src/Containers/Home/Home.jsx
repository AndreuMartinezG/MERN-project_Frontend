import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { SET_THREADS, THREAD_DETAIL } from '../../Redux/types';
import { userData } from '../../Redux/reducers/datosLogin-reducer';
import debounce from 'lodash.debounce';

import './Home.css'

const Home = (props) => {


    let navigate = useNavigate();

    // Threads ya no se usa, se usa el state de redux
    const threads = props.threads;

    const [datosUsuarios, setDatosUsuarios] = useState({
        id_owner: "", userName_owner: "", headLine: ""
    });

    useEffect(() => {
        //UseEffect equivalente a componentDidMount (montado)
        // let userId = props.userData.user._id

        traerHilos();
    }, [])

    useEffect(() => {
        //UseEffect equivalente a componentDidUpdate (actualizado)


    }, [threads])

    const traerHilos = async () => {

        try {
            const response = await axios.get('http://localhost:5000/threads');

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

    
    const rellenarDatos = (e) => {
        setDatosUsuarios({
            ...datosUsuarios,
            [e.target.name]: e.target.value
        })
    };
    const debouncedrellenarDatosUsuarios = debounce(rellenarDatos,2000);

    const crearHilo = async () => {

        // let array = Object.entries(datosUsuarios);
        console.log("SOY PROPSSSSSSSSSSSSSSSSSSSSSSSSSSSSS ", props.userData);

        let body = {
            id_owner: props.userData.user._id,
            userName_owner: props.userData.user.userName,
            headLine: datosUsuarios.headLine
        }

        console.log("esto es body", body);

        try {

            let response = await axios.post('http://localhost:5000/threads', body);
            console.log(response.data, "este es el hilo NUEVO");


        } catch (error) {
            console.log(error);
        }
    }

    if (props.userData.token !== null && threads.length !== 0) {
        console.log("estamos en el if juaaaaaaaaaaan")
        return (

            <div className='designHome'>

                {
                    threads.map(hilo => {
                        return (
                            <div className='threads' key={hilo._id} onClick={() => escogerHilo(hilo)}>
                                <div >{hilo.userName_owner}<br />{hilo.headLine}</div>
                            </div>
                        )
                    })
                }<br />


                CREATE NEW THREAT:
                <input className='' type="text" name="headLine" id="headLine" title="headLine" placeholder="topic" autoComplete="off" onChange={(e) => debouncedrellenarDatosUsuarios(e)} />
                <div className='buttonThreadNew' onClick={() => crearHilo()}>submit</div>
            </div>
        )

    } else if (threads.length !== 0) {
        return (
            <div className='designHome'>
                
                {console.log("estamos en el else iffffffff juaaaaaaaaaaan")}
                {
                    threads.map(hilo => {
                        return (
                            <div className='threads' key={hilo._id} onClick={() => escogerHilo(hilo)}>
                                <div >{hilo.userName_owner}<br />{hilo.headLine}</div>
                            </div>
                        )
                    })
                }<br />
            </div>
        )
    }
    else {
        return (
            <div className='designHome'>{"we don't have any thread at this moment"}</div>
        )
    }
}

// Conectar con redux
export default connect(state => ({
    threads: state.threads.threads,
    userData: state.credentials
}))(Home);
