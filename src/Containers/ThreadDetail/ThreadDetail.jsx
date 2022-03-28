import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'

import { Button, Typography } from 'antd';
import { Input } from 'antd';

import axios from 'axios';
import './ThreadDetail.css'

const { Title, Text } = Typography;
const { TextArea } = Input;


const ThreadDetail = (props) => {
    const [thread, setThread] = useState(null);
    const [formData, setformData] = useState({ postTitle: '', postContent: '' })

    const modifyData = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value })
    }

    const createNewPost = (e) => {
        console.log(formData);
    }

    useEffect(() => {
        axios.get('http://localhost:5000/threads')
            .then(res => setThread(res.data[0]));
    }, []);

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

            <Title level={2}>Posts</Title>

            {/** Mostramos la lista de post asociados al hilo */}
            {
                thread.post.map(post => {
                    return (
                        <div key={post._id} style={{
                            border: '1px solid black',
                            borderRadius: '3px',
                            width: '80%',
                            margin: '8px auto',
                        }}>
                            <Title level={3}>{post.headLine_post}</Title>
                            <Text strong>{post.userName_owner}</Text>
                            <Text>{post.text_post}</Text>
                            <br />
                            <Text>{post.created_post}</Text>
                        </div>
                    );
                })
            }

            {/** Formulario para crear un nuevo post */}
            <form
                onSubmit={(e) => createNewPost(e)}
                style={{
                    margin: '0px auto',
                    padding: '20px 0px',
                    width: '80%',
                    textAlign: 'left'
                }}>
                <Title level={2}>Write your opinion:</Title>

                <Text strong>Title</Text>
                <Input name="postTitle" value={formData.postTitle} onChange={(e) => modifyData(e)} placeholder='Type the title for the post' />

                <div style={{ height: '15px' }}></div>

                <Text strong>Content</Text>
                <TextArea name="postContent" value={formData.postContent} onChange={(e) => modifyData(e)} placeholder='Type your opinion!' />

                <Button type="primary" onClick={(e) => createNewPost(e)} style={{ marginTop: '15px' }}>Send</Button>
            </form>
        </div>

        || <div>Cargando..</div>
    )
}



export default connect((state) => ({
    //variables de rdx a crear
}))(ThreadDetail);