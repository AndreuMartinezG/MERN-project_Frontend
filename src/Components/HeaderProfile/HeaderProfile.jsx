import React from 'react';
import './HeaderProfile.css'
const HeaderProfile = () => {

    return (

        <div className="headerProfile">
            <img
                src="https://picsum.photos/id/1018/3000"
                className="headerProfileMainImg"
                alt="cover"
            />
            <div className="headerProfileImg">
                <img
                    src="https://picsum.photos/id/1005/1000"
                    className="headerProfileBodyImg"
                    alt="cover"
                />
            </div>
        </div>

    )

}
    
export default HeaderProfile;