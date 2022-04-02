import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { SET_THREADS, THREAD_DETAIL } from '../../Redux/types';
import debounce from 'lodash.debounce';
import { Button, Text, Input, Textarea, Title } from '@mantine/core';


import './Home.css'

const Home = (props) => {

    let navigate = useNavigate();

    // Threads ya no se usa, se usa el state de redux
    const threads = props.threads;

    threads.reverse();

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
            let response = await axios.get('http://localhost:5000/threads');

            // Ya no usamos useState, se usa el state de redux
            props.dispatch({ type: SET_THREADS, payload: response.data });



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

    const debouncedrellenarDatosUsuarios = debounce(rellenarDatos, 500);

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

            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    }


    if (props.userData.token !== null && threads.length !== 0) {
        console.log("estamos en el if juaaaaaaaaaaan")

        return (

            <div className='designHome'>


                <Title color="gray" order={1}>Topics:</Title>
                {console.log(threads, "esto es threads")}

                {
                    threads.map(hilo => {
                        return (
                            <div className='userShow' onClick={() => escogerHilo(hilo)} key={hilo._id} style={{
                                borderRadius: '.3em',
                                width: '40em',
                                margin: '8px auto',
                                display: 'flex',
                                padding: '1em',
                                gap: '50px',
                            }}>

                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <img style={{ width: '3em', height: '3em', justifyContent: 'center', alignItems: 'center' }}
                                        src="https://api.minimalavatars.com/avatar/random/png" />
                                    <br />


                                    <Text weight={700}>{(hilo.userName_owner)}</Text>
                                </div>

                                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
                                    <Text>{hilo.headLine}</Text>
                                </div>

                            </div>
                        )
                    }).reverse()
                }
                <Title order={3}>CREATE NEW THREAT:</Title>
                <Textarea style={{
                    margin: '0px auto',
                    padding: '20px 0px',
                    width: '30em',
                    textAlign: 'center',
                }} type="text" name="headLine" id="headLine" title="headLine" placeholder="what do you want to talk about ?" autoComplete="off" onChange={(e) => debouncedrellenarDatosUsuarios(e)} />
                <Button
                    type="submit"
                    onClick={() => crearHilo()}
                    style={{ margin: '15px' }}
                    color="dark"
                    gradient={{ from: 'indigo', to: 'cyan' }}>Submit
                </Button>




            </div>
        )

    } else if (threads.length !== 0) {
        return (
            <div className='designHome'>
                <Title color="gray" order={1}>Topics:</Title>
                {console.log(threads, "esto es threads")}

                {
                    threads.map(hilo => {
                        return (
                            <div className='userShow' onClick={() => escogerHilo(hilo)} key={hilo._id} style={{
                                borderRadius: '.3em',
                                width: '40em',
                                margin: '8px auto',
                                display: 'flex',
                                padding: '1em',
                                gap: '50px',
                            }}>

                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <img style={{ width: '3em', height: '3em', justifyContent: 'center', alignItems: 'center' }}
                                        src="https://api.minimalavatars.com/avatar/random/png" />
                                    <br />


                                    <Text weight={700}>{(hilo.userName_owner)}</Text>
                                </div>

                                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
                                    <Text>{hilo.headLine}</Text>
                                </div>

                            </div>
                        )
                    }).reverse()
                }
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
