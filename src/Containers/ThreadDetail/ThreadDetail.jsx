import React, { useState } from 'react';
import { connect } from 'react-redux'

import { Button, Typography } from 'antd';
import { Input } from 'antd';

import './ThreadDetail.css'

const { Title, Text } = Typography;
const { TextArea } = Input;

const ThreadPost = (props) => {
    const post = props.post;

    return (
        <div key={post._id} style={{
            border: '1px solid black',
            borderRadius: '3px',
            width: '80%',
            margin: '8px auto',
            display: 'flex',
            padding: '8px',
            gap: '32px',
        }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <img style={{ width: '48px', height: '48px' }} src="https://api.minimalavatars.com/avatar/random/png" />
                <Text strong>{post.userName_owner}</Text>
            </div>

            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
                <Text>{post.text_post}</Text>
                <Text>{post.created_post}</Text>
            </div>
        </div>
    )
}

const NewThreadPostForm = () => {
    const [formData, setformData] = useState({ postContent: '' })

    const modifyData = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value })
    }

    const createNewPost = (e) => {
        // Crear el nuevo post en el servidor
    }

    return <form
        onSubmit={(e) => createNewPost(e)}
        style={{
            margin: '0px auto',
            padding: '20px 0px',
            width: '80%',
            textAlign: 'left'
        }}>
        <Title level={2}>Write your opinion:</Title>

        <Text strong>Content</Text>
        <TextArea name="postContent" value={formData.postContent} onChange={(e) => modifyData(e)} placeholder='Type your opinion!' />

        <Button type="primary" onClick={(e) => createNewPost(e)} style={{ marginTop: '15px' }}>Send</Button>
    </form>;
}


const ThreadDetail = (props) => {
    const thread = props.thread;

    return (
        // Mostramos información del hilo
        thread !== null &&
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/** Título, Creador y fecha del hilo */}
            <Title style={{ textTransform: 'uppercase' }}>{thread.headLine}</Title>

            <Text>Owner: {thread.userName_owner}</Text>
            <Text>{thread.created}</Text>

            <Title level={2}>Posts ({thread.post.length})</Title>

            {/** Mostramos la lista de post asociados al hilo */}
            {
                thread.post.map(post => <ThreadPost post={post} />)
            }

            {/** Formulario para crear un nuevo post */}
            <NewThreadPostForm />

        </div>

        || <div>Cargando..</div>
    )
}

export default connect((state) => ({
    thread: state.threads.selectedThread
}))(ThreadDetail);