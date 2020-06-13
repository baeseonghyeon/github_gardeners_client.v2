import React, { ReactNode } from 'react';
import './UserInfo.scss';
import { isNullOrUndefined } from 'util';
import { Github } from '../../lib';
interface UserInfoProps {
    avatar_url: string,
    login: string,
    user_name?: string,
    name?: string,
    id: Number | number,
    className?: string,
    avatar_size?: number,
    title_size?: string,
    desc_size?: string,
    isVertical?: boolean,
    Badge? : ReactNode,
    onClick?: (event:React.MouseEvent)=>void,
}

const UserInfo = (props: UserInfoProps) => {
    const _avatar_url = isNullOrUndefined(props.avatar_url) ? Github.getAvatarUrl(props.id) : props.avatar_url

    return <div 
        className={`__user_info_container ${props.className} ${!isNullOrUndefined(props.isVertical) && props.isVertical ? "vertical" : ""}`}
        onClick={ props.onClick }
    >
        <div className="__user_info_avatar">
            <img
                src={_avatar_url}
                alt={props.user_name + "의 아바타 이미지"}
                style={
                    !isNullOrUndefined(props.avatar_size) ?
                        { width: props.avatar_size, height: props.avatar_size } :
                        {}
                }
            ></img>
            <div className="__user_info_avatar_verified">
                { props.Badge }
            </div>

        </div>
        <div className="__user_info_desc">
            <a 
                style={ !isNullOrUndefined(props.title_size) ? { fontSize: props.title_size } : {} }
                className="__user_info_login" 
                href={`https://github.com/${props.login}`} target="_blank" rel="noopener noreferrer">
                {props.login}
            </a>
            {
                (!isNullOrUndefined(props.name) || !isNullOrUndefined(props.user_name)) ?
                    <p 
                    style={ !isNullOrUndefined(props.desc_size) ? { fontSize: props.desc_size } : {} }
                    className="__user_info_username">{(props.name || props.user_name)}</p> :
                    <></>
            }
        </div>
    </div>;
}


export default UserInfo;