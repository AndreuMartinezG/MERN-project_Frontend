import React, { useState } from 'react';
import { connect } from 'react-redux'

import { Text, Title } from "@mantine/core";
import './ThreadDetail.css'
import moment from 'moment';
import ThreadPost from '../../Components/ThreadPost/ThreadPost';
import NewThreadPostForm from '../../Components/NewThreadPostForm/NewThreadPostForm';

const ThreadDetail = (props) => {
    const thread = props.thread;

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
}

export default connect((state) => ({
    thread: state.threads.selectedThread,
    loggedUser: state.credentials.token !== null,
}))(ThreadDetail);


// Esta funcion es la misma que la de arriba pero escrito por partes.
// const connectCallback = (state) => {
//     return {
//         loggedUser: state.credentials.token !== null,
//         thread: state.threads.selectedThread,
//     }
// }

// const connectFunction = connect(connectCallback)

// export default connectFunction(ThreadDetail);