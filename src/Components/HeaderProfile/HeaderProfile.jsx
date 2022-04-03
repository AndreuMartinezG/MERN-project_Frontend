import React from 'react';
import './HeaderProfile.css'
import { connect } from 'react-redux';

const HeaderProfile = (props) => {

    return (

        <div className="headerProfile">
            <img
                src="https://picsum.photos/id/1018/3000"
                className="headerProfileMainImg"
                alt="cover"
            />
            <div className="headerProfileImg">
                <img
                    src="https://i.pinimg.com/564x/00/40/5f/00405f60c89d832520ef8a8f7529ab6b.jpg"
                    className="headerProfileBodyImg"
                    alt="cover"
                />
            </div>
        </div>

    )

}

export default connect((state) => ({
    userData: state.credentials.user
}))(HeaderProfile);