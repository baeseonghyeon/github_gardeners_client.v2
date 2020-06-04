/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect } from 'react';
import { IUserAuthReponse } from '../../api/user';
import { isNullOrUndefined, isNull } from 'util';
import { FaGithubAlt } from 'react-icons/fa';

interface NavUserInfoPropsInterface{
    user : IUserAuthReponse | undefined | null,
}

const NavUserInfo = (props:NavUserInfoPropsInterface) => {
    return (<>
        <div className="avatar-wrapper">
            {
                (!isNullOrUndefined(props.user) && !isNullOrUndefined(props.user.data) && props.user.data.is_authenticated) ? 
                <img src={ props.user.data.user.avatar_url } alt="avatar" /> : 
                <FaGithubAlt/>
            }
        </div>
        <div className="desc-wrapper">
            {
                (!isNullOrUndefined(props.user) && !isNullOrUndefined(props.user.data) && props.user.data.is_authenticated) ? 
                <>
                    <p className="login">
                        YOOGOMJA
                    </p>
                    <p className="username">KyeongSoo Yoo</p>
                </> :     
                <p className="message">
                    로그인이 필요합니다 😎
                </p>
            }
        </div>
        <div className="status-wrapper">
            {
                (!isNullOrUndefined(props.user) && !isNullOrUndefined(props.user.data) && props.user.data.is_authenticated) ? 
                props.user.data.challenges.map(c=>{
                    return (<div className="status-item">
                        <p>{ c.title} 참여 중🧑‍💻</p>
                    </div>);
                }) :     
                <></>
            }
        </div>
    </>);
}

export default NavUserInfo;