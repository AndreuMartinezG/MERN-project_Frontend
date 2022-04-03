import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux'

import { Button, Divider, Text, Textarea, Title } from "@mantine/core";
import { useNotifications, updateNotification } from '@mantine/notifications';
import { CheckIcon } from '@modulz/radix-icons';
import './ThreadDetail.css'
import axios from 'axios';
import { SET_THREADS, THREAD_DETAIL } from '../../Redux/types';
import moment from 'moment';


/**
 * Componente que muestra un post del hilo
 */
const __ThreadPost = (props) => {
    const post = props.post;
    const postUserId = post.id_owner;
    const postId = post._id;
    const threadId = useSelector(state => state.threads.selectedThread._id);

    const [isEditing, setIsEditing] = useState(false);
    const loggedUserId = useSelector(state => state.credentials.user._id);
    const canUpdateOrDelete = loggedUserId === postUserId;

    const updateInfo = async () => {
        try {
            const response = await axios.get('https://mern-backend-forum.herokuapp.com/threads');

            props.dispatch({ type: SET_THREADS, payload: response.data });

            const hilo = response.data.find(hilo => hilo._id === threadId);

            props.dispatch({ type: THREAD_DETAIL, payload: hilo });
        } catch (error) {
            console.log(error);
        }
    }

    const notification = useNotifications();

    const deletePost = async () => {
        const data = { postId, threadId };

        await axios.delete('https://mern-backend-forum.herokuapp.com/threads/post', { data });

        notification.showNotification({
            id: 'load-data',
            loading: true,
            title: 'Deleting Post',
            message: 'The post is being deleted',
            autoClose: false,
            disallowClose: true,
        });

        setTimeout(() => {
            updateNotification({
                id: 'load-data',
                color: 'red',
                title: 'Post Deleted',
                message: 'Your post was Deleted correctly',
                icon: <CheckIcon />,
                autoClose: 2000,
            });
        }, 500)

        updateInfo();
    }

    const likePost = async () => {
        const data = { postId, threadId };

        await axios.post('https://mern-backend-forum.herokuapp.com/threads/post/like', data);

        updateInfo();
    }

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

            <div style={{ width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
                {isEditing
                    && <UpdateThreadPostForm
                        initialText={post.text_post}
                        postId={postId}
                        threadId={threadId}
                        setIsEditing={setIsEditing}
                    />
                    || <div>
                        <Text>{post.text_post}</Text>
                        <Text weight={700}>Created: {moment(post.created_post).format('LL')}</Text>


                    </div>
                }

                <div style={{ marginTop: '20px', }}>
                    <Divider my="sm" variant="dashed" />

                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                        <Button onClick={() => likePost()}>LIKE ({post.likes || 0})</Button>

                        {canUpdateOrDelete &&
                            <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                                <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Stop editing' : 'Edit'}</Button>
                                <Button onClick={() => deletePost()} variant='outline' color="red">Delete Post</Button>
                            </div>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

const ThreadPost = connect()(__ThreadPost);

/**
 * Componente que muestra el formulario para editar el post de un hilo
 */
const __UpdateThreadPostForm = (props) => {
    const { postId, threadId, initialText } = props;

    const [formData, setformData] = useState({ postContent: initialText });

    const modifyData = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    }

    const notification = useNotifications();

    const updateInfo = async () => {

        try {

            notification.showNotification({
                id: 'load-data',
                loading: true,
                title: 'Saving Edit',
                message: 'Edit will updated in a few seconds',
                autoClose: false,
                disallowClose: true,
            });

            setTimeout(() => {
                updateNotification({
                    id: 'load-data',
                    color: 'green',
                    title: 'Post Edited',
                    message: 'Your post was edited correctly',
                    icon: <CheckIcon />,
                    autoClose: 2000,
                });
            }, 1000)
            const response = await axios.get('https://mern-backend-forum.herokuapp.com/threads');

            props.dispatch({ type: SET_THREADS, payload: response.data });

            const hilo = response.data.find(hilo => hilo._id === threadId);

            props.dispatch({ type: THREAD_DETAIL, payload: hilo });

            props.setIsEditing(false)
        } catch (error) {
            console.log(error);
        }
    }

    const editPost = (e) => {
        e.preventDefault();

        // Crear el nuevo post en el servidor
        const data = {
            threadId,
            postId,
            postContent: formData.postContent
        }

        axios.patch('https://mern-backend-forum.herokuapp.com/threads/post', data)
            .then(() => { updateInfo() });
    }

    return <form
        onSubmit={(e) => editPost(e)}
        style={{
            margin: '0px auto',
            padding: '20px 0px',
            width: '80%',
            textAlign: 'left'
        }}>
        <Textarea name="postContent" value={formData.postContent} onChange={(e) => modifyData(e)} placeholder='Type your opinion!' />

        <Button
            type="submit"
            style={{ marginTop: '15px' }}
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}>Send</Button>
    </form>;
}

const UpdateThreadPostForm = connect()(__UpdateThreadPostForm);

/**
 * Componente que muestra el formulario para crear un nuevo post del hilo
 */
const __NewThreadPostForm = (props) => {
    const [formData, setformData] = useState({ postContent: '' })

    const modifyData = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value })
    }

    const notification = useNotifications();

    const updateInfo = async () => {
        try {
            const response = await axios.get('https://mern-backend-forum.herokuapp.com/threads');

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

        axios.post('https://mern-backend-forum.herokuapp.com/threads/post', data)
            .then(() => { updateInfo() })
            .then(() => {
                notification.showNotification({
                    id: 'load-data',
                    color: 'green',
                    title: 'Creted Post',
                    message: 'Your post was successfully created',
                    icon: <CheckIcon />,
                    autoClose: 2000,
                })
            });
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
    console.log(props.thread.post.length, 'props');

    if (thread.post.length >= 4) {

        return (
            // Mostramos información del hilo

            <div style={{
                width: '100%',
                height: 'min-content',
                display: 'flex',
                flexDirection: 'column',
            }}>
                {/** Título, Creador y fecha del hilo */}
                <Title style={{ textTransform: 'uppercase' }}>{thread.headLine}</Title>

                <Text>Owner: {thread.userName_owner}</Text>
                <Text>{moment(thread.created).format('L')}</Text>


                <Title order={2}>Posts ({thread.post.length})</Title>

                {/** Mostramos la lista de post asociados al hilo */}
                {
                    thread.post.map((post, index) => <ThreadPost key={index} post={post} />)
                }

                {/** Formulario para crear un nuevo post */}
                {props.loggedUser && <NewThreadPostForm threadId={thread._id} />}

            </div>
        )
    } else {

        return (
            <div style={{
                width: '100%',
                height: '87.1vh',
                display: 'flex',
                flexDirection: 'column',
            }}>
                {/** Título, Creador y fecha del hilo */}
                <Title style={{ textTransform: 'uppercase' }}>{thread.headLine}</Title>

                <Text>Owner: {thread.userName_owner}</Text>
                <Text>Created: {moment(thread.created).format('L')}</Text>

                <Title order={2}>Posts ({thread.post.length})</Title>

                {/** Mostramos la lista de post asociados al hilo */}
                {
                    thread.post.map((post, index) => <ThreadPost key={index} post={post} />)
                }

                {/** Formulario para crear un nuevo post */}
                {props.loggedUser && <NewThreadPostForm threadId={thread._id} />}

            </div>
        )
    }
}

export default connect((state) => ({
    thread: state.threads.selectedThread,
    loggedUser: state.credentials.token !== null,
}))(ThreadDetail);