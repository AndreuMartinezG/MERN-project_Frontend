
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
// import { MOVIE_DETAIL } from '../../redux/types';
import './UserSearch.css';

const SearchResults = (props) => {

    // const [films, setFilms] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        console.log(props.userData);
    }, []);


    //useEffect custom para el hook films

    useEffect(() => {
        console.log(" films ha cambiado, ", props.userData);
    }, [props.userData]);


    const escogePelicula = (pelicula) => {

        console.log(pelicula, "he escogido esta....");
        //Guardamos la pelicula escogida en redux
        props.dispatch({ type: MOVIE_DETAIL, payload: pelicula });


        //Redirigimos a movieDetail con navigate
        navigate("/moviedetail");
    }

    if (props.films[0]?.id !== undefined) {
        return (
            <div className="designUserSearch">

                {
                    //Voy a mapear las películas
                    props.films.map(pelicula => {
                        //a cada elemento que voy a mapear
                        //le brindo un KEY (obligatorio) que lo distinguirá de
                        //el resto de elementos
                        return (
                            //Al mapear, cada elemento que se itera del array (en este caso pelicula es ese elemento),
                            //si le hacemos propiedad onclick y pasamos el elemento como argumento,
                            //a esa funcion le va a llegar el objeto que hayamos clickado entero
                            <div className='designSR' key={pelicula.id} onClick={() => escogePelicula(pelicula)}>
                                <div className="tit">
                                    <div className='tituloPelicula'>{pelicula.titulo}</div>
                                </div>
                                <div className="fot">
                                    <img className='cartel' src={pelicula.image} alt={pelicula.titulo} />
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        )
    } else {
        return (
            <div className='designHome'>
                <div className="marginLoader">
                    {/* <img src={require('../../img/spi.gif')} alt="cargador" /> */}

                    {setTimeout(() => {
                        alert("we don't have this movie on our store, please search for another one.")

                        {
                            setTimeout(() => {
                                navigate('/')
                            }, 1000);
                        }
                    }, 5000)};

                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    userData: state.credentials
}))(UserSearch);