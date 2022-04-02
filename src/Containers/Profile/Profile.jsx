import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Text, Textarea, Title } from "@mantine/core";
import { TextInput, Checkbox, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MODIFY_CREDENTIALS } from '../../Redux/types';

import './profile.css'
import HeaderProfile from '../../Components/HeaderProfile/HeaderProfile';
import ProfileData from '../../Components/ProfileData/ProfileData';

const Profile = (props) => {

    let navigate = useNavigate();


    //HOOKS 
    const [userData, setUserData] = useState([{}]);
    const [modifyState, setModifyState] = useState(true);
    const [profileState, setProfileState] = useState(false);

    useEffect(() => {
        let userId = props.userData.user._id
        userPosts(userId)
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
            console.log(body)
            let res = await axios.post(`http://localhost:5000/threads/post/${userId}`, body);
            console.log(res)
            console.log(res.data.length)
            let reverse = res.data.reverse()
            setUserData(reverse)
            console.log(userData)

        } catch (error) {
            console.log(error)
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


    // LLamada al back end para modificar el perfil

    const updateUser = async (dataToSubmit) => {

        let body = {
            firstName: dataToSubmit.firstName,
            lastName: dataToSubmit.lastName,
            email: props.userData.user.email,
            _id: props.userData.user._id
        }
        console.log(body, "body")
        // let config = {
        //     headers: { Authorization: `Bearer ${props.credentials.token}` }
        // };

        try {
            //Hacemos el update en la base de datos
            let res = await axios.put(`http://localhost:5000/users`, body);
            console.log(res)
            if (res) {
                //Guardamos en redux
                props.dispatch({ type: MODIFY_CREDENTIALS, payload: dataToSubmit });
            }
        } catch (error) {
            console.log(error)
        }

    }


    //Cambio de vistas de Modificar perfil o ver post

    const handler = () => {
        if (modifyState) {
            setModifyState(false)
            setProfileState(true)
        } else {
            setModifyState(true)
            setProfileState(false)
        }
    }


    //Apartado para la modificacion del perfil

    const UpdateUserForm = (props) => {

        const form = useForm({
            initialValues: {
                firstName: `${props.data.firstName}`,
                lastName: `${props.data.lastName}`,
                userName: `${props.data.userName}`,

            },

            validate: {

                firstName: (value) => (/[a-z]/gi.test(value) ? null : 'Invalid first name'),
                lastName: (value) => (/[a-z]/gi.test(value) ? null : 'Invalid last name'),
                userName: (value) => (/[a-z]/gi.test(value) ? null : 'Invalid user name'),

            },
        });
        
        return (
            <Box sx={{ maxWidth: 300 }} mx="auto">
                <form onSubmit={form.onSubmit((values) => updateUser(values))}>
                    <TextInput
                        required
                        label="First Name"
                        placeholder="FirstName"
                        {...form.getInputProps('firstName')}
                    />
                    <TextInput
                        required
                        label="Last Name"
                        placeholder="LastName"
                        {...form.getInputProps('lastName')}
                    />
                    <TextInput
                        required
                        label="User Name"
                        placeholder="UserName"
                        {...form.getInputProps('userName')}
                    />

                    <Group position="center" mt="md">
                        <Button type="submit">Save</Button>
                    </Group>
                </form>
            </Box>
        );
    }

    return (
        <div className="designProfile">
            <HeaderProfile />
            <h2>{props.userData.user.firstName} {props.userData.user.lastName}</h2>

            <div className="bodyProfile">
                <div className="halfBodyProfileL">
                    <ProfileData />
                    <Button
                        type="submit"
                        onClick={() => handler()}
                        style={{ marginTop: '5em' }}
                        variant="gradient"
                        gradient={{ from: 'indigo', to: 'cyan' }}>{modifyState && "Modify Profile"}{profileState && `Go back`}</Button>
                </div>

                {/* Aqui va mostrar post del usuario */}

                {profileState &&
                    <div className="halfBodyProfileR userShow">

                        {/** Título, Creador y fecha del hilo */}

                        <Title order={4} style={{
                            textTransform: 'uppercase'
                        }}>Modify Profile </Title>
                        <hr style={{
                            width: '60%',
                            height: '1px',
                            marginBottom: '2em'
                        }} />
                        {/** Mostramos la lista de post asociados al hilo */}
                        <UpdateUserForm data={props.userData.user} />

                    </div>
                }

                {/* Aqui va modificacion del perfil */}

                {modifyState &&
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
                            userData.map((post, index) => <ThreadPost key={index} post={post} />)
                        }
                    </div>
                }
            </div>

        </div>
    );
}

export default connect((state) => ({
    userData: state.credentials
}))(Profile);