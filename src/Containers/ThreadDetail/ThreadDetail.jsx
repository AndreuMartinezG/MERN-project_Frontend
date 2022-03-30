import React, { useState } from 'react';
import { connect } from 'react-redux'

import { Button, Text, Textarea, Title } from "@mantine/core";

import './ThreadDetail.css'
import axios from 'axios';
import { SET_THREADS, THREAD_DETAIL } from '../../Redux/types';


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

/**
 * Componente que muestra el formulario para crear un nuevo post del hilo
 */
const __NewThreadPostForm = (props) => {
    const [formData, setformData] = useState({ postContent: '' })

    const modifyData = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value })
    }

    const updateInfo = async () => {
        try {
            const response = await axios.get('http://localhost:5000/threads');

            props.dispatch({ type: SET_THREADS, payload: response.data });

            const hilo = response.data.find(hilo => hilo._id === props.threadId);

            props.dispatch({ type: THREAD_DETAIL, payload: hilo });

            setformData({ ...formData, postContent: '' });
        } catch (error) {
            console.log(error);
        }
    }

    const createNewPost = (e) => {
        e.preventDefault();

        // Crear el nuevo post en el servidor
        const data = {
            _id: props.thread._id,
            id_owner: props.idOwner,
            userName_owner: props.userName,
            headLine_post: 'XXX',
            text_post: formData.postContent,
        }

        axios.post('http://localhost:5000/threads/post', data)
            .then(() => { updateInfo() });
    }

    return <form
        onSubmit={(e) => createNewPost(e)}
        style={{
            margin: '0px auto',
            padding: '20px 0px',
            width: '80%',
            textAlign: 'left'
        }}>
        <Title order={2}>Write your opinion:</Title>

        <Text weight={700}>Content</Text>
        <Textarea name="postContent" value={formData.postContent} onChange={(e) => modifyData(e)} placeholder='Type your opinion!' />

        <Button
            type="submit"
            style={{ marginTop: '15px' }}
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}>Send</Button>
    </form>;
}

/**
 * Componente que muestra el formulario para crear un nuevo post del hilo
 * Wrapper del componente __NewThreadPostForm usando connect
 */
const NewThreadPostForm = connect((state) => ({
    thread: state.threads.selectedThread,
    idOwner: state.credentials.user._id,
    userName: state.credentials.user.userName,
}))(__NewThreadPostForm);

const ThreadDetail = (props) => {
    const thread = props.thread;

    return (
        // Mostramos información del hilo

        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/** Título, Creador y fecha del hilo */}
            <Title style={{ textTransform: 'uppercase' }}>{thread.headLine}</Title>

            <Text>Owner: {thread.userName_owner}</Text>
            <Text>{thread.created}</Text>

            <Title order={2}>Posts ({thread.post.length})</Title>

            {/** Mostramos la lista de post asociados al hilo */}
            {
                thread.post.map((post, index) => <ThreadPost key={index} post={post} />)
            }

            {/** Formulario para crear un nuevo post */}
            <NewThreadPostForm threadId={thread._id} />

        </div>
    )
}

export default connect((state) => ({
    thread: state.threads.selectedThread
}))(ThreadDetail);