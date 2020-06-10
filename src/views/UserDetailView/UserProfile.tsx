import React, { useState } from 'react';
import { IUserResponse } from '../../api/user';
import { AnimatedButton, CustomButton, ExternalLink } from '../../components';

import { GoOrganization, GoLink } from 'react-icons/go';
import { MdEmail } from 'react-icons/md';

import moment from 'moment';
import 'moment/locale/ko';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { getUserInfoThunk } from '../../modules/user/thunks';
import { fetchUserInfo, getUserLatestFetchLog } from '../../api/user';

import { isNullOrUndefined } from 'util';
import * as Lib from '../../lib';

interface IUserProfileProps{
    data : IUserResponse
}

const UserProfile = (props:IUserProfileProps)=>{
    
    const _dispatch = useDispatch();
    const _history = useHistory();
    const [isRequested , setIsRequested]  = useState(false);
    const [fetchBtnText , setFetchBtnText] = useState("갱신");
    
    const fn = {
        fetch : async ()=>{
            if(!isRequested){
                setIsRequested(true);
                const result = await fetchUserInfo(props.data.data.login);
                setIsRequested(false);
                if(result.code > 0){
                    _dispatch(getUserInfoThunk(props.data.data.login));
                }
                const _fetchLog = await getUserLatestFetchLog(props.data.data.login);
                
                const lastTimestamp = moment((_fetchLog.data as any).created_at);
                setFetchBtnText("갱신 됨 : " + lastTimestamp.fromNow());
            }
        }
    }

    return <div className="user-profile-wrapper">
        <div className="user-profile-header">   
            <div className="user-profile-avatar">
                
                {
                    !isNullOrUndefined(props.data.data) ? 
                    <img className="user-profile-avatar-img" src={ Lib.Github.getAvatarUrl(props.data.data.id, 150) } alt="avatar img" /> : 
                    <div className="user-profile-avatar-placeholder">이미지가 없음</div>
                }
            </div>
            <div className="user-profile-desc">
                <ExternalLink
                    text={ props.data.data.login }
                    className="user-profile-login"
                    to={ `https://github.com/${props.data.data.login}` } 
                />
                <p className="user-profile-name">{ props.data.data?.name }</p>
            </div>
        </div>
        <div className="user-profile-content">
            <div className="user-profile-content-item">
                {
                    !isNullOrUndefined(props.data.data.bio) ?  
                    <>
                    { 
                        props.data.data.bio.split('\n').map( (text, idx)=>{
                            return (<p key={ idx }>{ text }</p>)
                        }) 
                    }
                    </>:
                    <></>
                }
            </div>
            {
                !isNullOrUndefined(props.data.data.company) && props.data.data.company !== ""? 
                <div className="user-profile-content-item info">
                    <GoOrganization/>
                    <p>{props.data.data.company}</p>
                </div>:
                <></>
            }
            {
                !isNullOrUndefined(props.data.data.blog) && props.data.data.blog !== "" ? 
                <div className="user-profile-content-item info">
                    <GoLink/>
                    <ExternalLink
                        text={ props.data.data.blog }
                        to={props.data.data.blog}
                    />
                </div>:
                <></>
            }
            {
                !isNullOrUndefined(props.data.data.blog) && props.data.data.blog !== "" ? 
                <div className="user-profile-content-item info">
                    <MdEmail/>
                    <ExternalLink
                        text={ props.data.data.email }
                        to={`mailto://${props.data.data.email}`}
                    />
                </div>:
                <></>
            }
        </div>
        <div className="user-profile-footer">
            <AnimatedButton
                className="profile-btn fetch"
                isRequested={isRequested}
                text={fetchBtnText}
                onClick={fn.fetch}
            />
            <CustomButton
                className="profile-btn cancel"
                text="뒤로가기"
                onClick={()=>{
                    _history.goBack();
                }}
            />
        </div>
    </div>
}

export default UserProfile;
