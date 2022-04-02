import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Text, Title } from "@mantine/core";
import { TextInput, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MODIFY_CREDENTIALS } from '../../Redux/types';
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
    const [userUnfollow, setUserUnfollow] = useState(false)

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


    /* Traemos todos los posts de un usuario */
    const userPosts = async (userId) => {

        let body = { id_owner: userId }

        // let config = {
        //     headers: { Authorization: `Bearer ${props.credentials.token}` }
        // };

        try {
            let res = await axios.post(`http://localhost:5000/threads/post/${userId}`, body);
            let reverse = res.data.reverse()
            setUserData(reverse)

        } catch (error) {
            console.log(error)
        }

    }

    const checkIfFollow = () => {

        let userFollowed = props.userData.user.followed
        console.log(userFollowed[2].id_followed, "Soy userFollowed")
        console.log(UserSearched._id, "Soy UserSearched_id")
        let userIdFind = userFollowed.find(user => user.id_followed === UserSearched._id);
        console.log(userIdFind, "Soy user Id Find")

        if (userIdFind){
            setUserFollow(true)
            setUserUnfollow(false)
            console.log(userFollow, "entro en el if = true")
            
        }else {
            setUserFollow(false)
            setUserUnfollow(true)
            console.log(userFollow, "entro en el else = false")
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


    //Apartado para la modificacion del perfil

    return (
        <div className="designProfile">
            <HeaderProfile />
            <h2>{UserSearched.firstName} {UserSearched.lastName}</h2>

            <div className="bodyProfile">
                <div className="halfBodyProfileL">
                    <ProfileUser />
                    <Button
                        type="submit"
                        // onClick={() => handler()}
                        style={{ marginTop: '5em' }}
                        variant="gradient"
                        gradient={{ from: 'indigo', to: 'cyan' }}>{userFollow && "Unfollow"}{userUnfollow && "Follow"}</Button>
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