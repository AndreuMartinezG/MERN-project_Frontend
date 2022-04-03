import { Button, Divider, Text } from "@mantine/core";
import { updateNotification, useNotifications } from "@mantine/notifications";
import { CheckIcon } from "@modulz/radix-icons";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { connect, useSelector } from "react-redux";
import { SET_THREADS, THREAD_DETAIL } from "../../Redux/types";
import UpdateThreadPostForm from "../UpdateThreadPostForm/UpdateThreadPostForm";

/**
 * Componente que muestra un post del hilo
 */
const ThreadPost = (props) => {
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

export default connect()(ThreadPost);