import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Text, Title } from "@mantine/core";
import { TextInput, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MODIFY_CREDENTIALS, USER_SEARCH } from '../../Redux/types';
import { useNotifications, updateNotification } from '@mantine/notifications';
import { CheckIcon } from '@modulz/radix-icons';
import HeaderProfile from '../../Components/HeaderProfile/HeaderProfile';
import ProfileUser from '../../Components/ProfileUser/ProfileUser';
import './Users.css'



const Users = (props) => {

    let navigate = useNavigate();

    const notification = useNotifications();

    const UserSearched = props.userData.userSearch[0]

    //HOOKS 
    const [userData, setUserData] = useState([{}]);
    const [userFollow, setUserFollow] = useState(true)
    const [userUnfollow, setUserUnfollow] = useState()

    useEffect(() => {
        let userId = UserSearched._id
        userPosts(userId)
        checkIfFollow()
    }, [])

    useEffect(() => {
        if (props.userData.token === null) {
            navigate("/");
        }
    })
    useEffect(() => {

    }, [userFollow])

    useEffect(() => {

    }, [userUnfollow])


    /* Traemos todos los posts de un usuario */
    const userPosts = async (userId) => {

        let body = { id_owner: userId }

        // let config = {
        //     headers: { Authorization: `Bearer ${props.credentials.token}` }
        // };

        try {
            let res = await axios.post(`https://mern-backend-forum.herokuapp.com/threads/post/${userId}`, body);
            let reverse = res.data.reverse()
            setUserData(reverse)

        } catch (error) {
            console.log(error)
        }

    }


    //Comprobamos si ya seguimos a este usuario
    const checkIfFollow = async () => {

        let userFollowed = props.userData.user.followed
        let userIdFind = userFollowed.find(user => user.id_followed === UserSearched._id);

        if (userIdFind) {
            setUserFollow(false)
            setUserUnfollow(true)

        } else {
            setUserFollow(true)
            setUserUnfollow(false)

        }
    }

    /**
     * Componente que muestra un post del hilo
     */

    const ThreadPost = (props) => {
        const post = props.post;

        return (
            <div key={post._id} className='userShow' style={{
                borderRadius: '3px',
                width: '80%',
                margin: '8px auto',
                display: 'flex',
                padding: '8px',
                gap: '32px',

            }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <img style={{ width: '48px', height: '48px' }}
                        src="https://api.minimalavatars.com/avatar/random/png" />
                    <Text weight={700}>{post.userName_owner}</Text>
                </div>

                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
                    <Text>{post.text_post}</Text>
                    <Text>{post.created_post}</Text>
                </div>
            </div>
        )
    }

    //Funcion para seguir a un usuario

    const follow = async () => {

        let body = {
            _id: props.userData.user._id,
            id_followed: UserSearched._id,
            name_followed: UserSearched.firstName,
            userName_followed: UserSearched.userName
        }

        try {

            let res = await axios.post('https://mern-backend-forum.herokuapp.com/users/followed', body)
            props.dispatch({ type: MODIFY_CREDENTIALS, payload: res.data });
            checkIfFollow()
            let resultados = await axios.post(`https://mern-backend-forum.herokuapp.com/users/results/${UserSearched.userName}`)
            props.dispatch({ type: USER_SEARCH, payload: resultados.data })
            notification.showNotification({
                message: 'You are now following this user',
                color: "green",
                icon: <CheckIcon />,
                autoclose: 2000,
            })
            setTimeout(() => {
                window.location.reload()
            }, 2000)

        } catch (error) {

            console.log(error)
        }
    }


    //Funcion para dejar de seguir a un usuario
    const unfollow = async () => {
        let body = {
            userId: props.userData.user._id,
            unfollowedId: UserSearched._id
        }
        try {
            let res = await axios.delete('https://mern-backend-forum.herokuapp.com/users/followed', { data: body })
            props.dispatch({ type: MODIFY_CREDENTIALS, payload: res.data[0] })
            checkIfFollow()
            let resultados = await axios.post(`https://mern-backend-forum.herokuapp.com/users/results/${UserSearched.userName}`)
            props.dispatch({ type: USER_SEARCH, payload: resultados.data })
            notification.showNotification({
                message: 'You stopped following this user',
                color: "green",
                icon: <CheckIcon />,
                autoclose: 2000,
            })
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }



    //Apartado para la modificacion del perfil

    return (
        <div className="designProfile">
            <HeaderProfile />
            <h2>{UserSearched.firstName} {UserSearched.lastName}</h2>

            <div className="bodyProfile">
                <div className="halfBodyProfileL">
                    <ProfileUser />
                    {userUnfollow &&
                        <Button
                            type="submit"
                            onClick={() => unfollow()}
                            style={{ marginTop: '5em' }}
                            variant="gradient"
                            gradient={{ from: 'indigo', to: 'cyan' }}>Unfollow</Button>
                    }
                    {userFollow &&
                        <Button
                            type="submit"
                            onClick={() => follow()}
                            style={{ marginTop: '5em' }}
                            variant="gradient"
                            gradient={{ from: 'indigo', to: 'cyan' }}>Follow</Button>
                    }
                </div>

                <div className="halfBodyProfileR userShow">

                    {/** Título, Creador y fecha del hilo */}

                    <Title order={4} style={{
                        textTransform: 'uppercase'
                    }}>Last Posts</Title>
                    <hr style={{
                        width: '60%',
                        height: '1px',
                        marginBottom: '2em'
                    }} />
                    {/** Mostramos la lista de post asociados al hilo */}
                    {
                        userData.map((post, index) => <ThreadPost key={index} post={post} />).slice(0, 5)
                    }
                </div>
            </div>

        </div>
    );
}

export default connect((state) => ({
    userData: state.credentials
}))(Users);