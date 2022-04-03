import { Button, Text, Textarea, Title } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { CheckIcon } from "@modulz/radix-icons";
import axios from "axios";
import { useState } from "react";
import { connect } from "react-redux";
import { SET_THREADS, THREAD_DETAIL } from "../../Redux/types";

/**
 * Componente que muestra el formulario para crear un nuevo post del hilo
 */
const NewThreadPostForm = (props) => {
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
export default connect((state) => ({
    thread: state.threads.selectedThread,
    idOwner: state.credentials.user._id,
    userName: state.credentials.user.userName,
}))(NewThreadPostForm);