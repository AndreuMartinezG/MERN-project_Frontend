import { Button, Textarea } from "@mantine/core";
import { updateNotification, useNotifications } from "@mantine/notifications";
import { CheckIcon } from "@modulz/radix-icons";
import axios from "axios";
import { useState } from "react";
import { connect } from "react-redux";
import { SET_THREADS, THREAD_DETAIL } from "../../Redux/types";

/**
 * Componente que muestra el formulario para editar el post de un hilo
 */
const UpdateThreadPostForm = (props) => {
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

export default connect()(UpdateThreadPostForm);