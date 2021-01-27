/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { IUserAuthReponse } from '../../api/user';
import { isNullOrUndefined } from 'util';
import { FaGithubAlt } from 'react-icons/fa';

interface NavUserInfoPropsInterface {
    user: IUserAuthReponse | undefined | null,
}

const NavUserInfo = (props: NavUserInfoPropsInterface) => {
    return (<>
        <div className="avatar-wrapper">
            {
                (!isNullOrUndefined(props.user) && !isNullOrUndefined(props.user.data) && props.user.data.is_authenticated) ?
                    <img src={props.user.data.user.avatar_url} alt="avatar" /> :
                    <FaGithubAlt />
            }
        </div>
        <div className="desc-wrapper">
            {
                (!isNullOrUndefined(props.user) && !isNullOrUndefined(props.user.data) && props.user.data.is_authenticated) ?
                    <>
                        <p className="login">
                            {props.user.data.user.login}
                        </p>
                        <p className="username">
                            {props.user.data.user.name}
                        </p>
                    </> :
                    <p className="message">
                        로그인이 필요합니다 😎
                </p>
            }
        </div>
        <div className="status-wrapper">
            {
                (!isNullOrUndefined(props.user) && !isNullOrUndefined(props.user.data) && props.user.data.is_authenticated) ?
                    props.user.data.challenges.map((c, idx) => {
                        return (<div key={idx} className="status-item">
                            <p>{c.title} 참여 중🧑‍💻</p>
                        </div>);
                    }) :
                    <></>
            }
        </div>
    </>);
}

export default NavUserInfo;