import React, { useState, useEffect } from 'react';

import './scss/MainViewHeader.scss';

import { RootState } from '../../modules';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthThunk } from '../../modules/user/thunks';
import { getActiveChallengesThunk } from '../../modules/challenges';
import { setHeaderChallenge } from '../../modules/mainView/actions';
import { isNullOrUndefined } from 'util';

import { MdArrowDropDown, MdPerson } from 'react-icons/md';

const MainViewHeader = () => {
    const _dispatch = useDispatch();
    const { data, loading } = useSelector((state: RootState) => state.challenge.active_challenges);
    const { user_auth } = useSelector((state:RootState)=>state.user);
    const { selectedChallenge } = useSelector((state:RootState)=>state.main_view);
    const [ isCollapsed, setIsCollapsed ] = useState(true);
    useEffect(() => {
        _dispatch(getActiveChallengesThunk());
        _dispatch(getUserAuthThunk());
    }, []);

    useEffect(() => {
        if (!loading && !isNullOrUndefined(data) && !isNullOrUndefined(data.data) && data.data.length > 0) {
            _dispatch(setHeaderChallenge(data.data[0]));
        }
    }, [loading, data]);
    return (<div className="main-header-container">

        {/* 프로젝트 정보 */}
        <div className={`header-challenge-collapse ${isCollapsed ? "collapsed" : ""}`}>
            <button className="header-collapse-btn" type="button" onClick={() => setIsCollapsed(!isCollapsed)} >
                <MdArrowDropDown />
            </button>
            <p className="header-collapse-title">
                {selectedChallenge?.title}
            </p>
        </div>
        <div className={`header-challeges-container ${isCollapsed ? "collapsed" : ""}`}>
            <div className="header-challenges-wrapper">
                {
                    !isNullOrUndefined(data) && !isNullOrUndefined(data.data) ?
                        data.data.map((item, idx) => {
                            return (
                                <div
                                    className={"header-challenge-item " + (selectedChallenge === item ? "active" : "")}
                                    onClick={() => {
                                        setIsCollapsed(true);
                                        _dispatch(setHeaderChallenge(item));
                                    }}
                                >
                                    <p className="header-challenge-title">{item.title}</p>
                                </div>
                            );
                        }) : <></>
                }
            </div>
        </div>
        {/* 로그인 정보  */}
        <div className="header-user-info">
            <div className="avatar">
                {
                    !isNullOrUndefined(user_auth.data) && !isNullOrUndefined(user_auth.data.data) && !isNullOrUndefined(user_auth.data.data.user) ? 
                    <img src={ user_auth.data.data.user.avatar_url } alt="avatar" /> : 
                    <div className="avatar-placeholder">
                        <MdPerson/>
                    </div>
                }
            </div>
            <p className="login">{
                !isNullOrUndefined(user_auth.data) && !isNullOrUndefined(user_auth.data.data) && !isNullOrUndefined(user_auth.data.data.user)? 
                user_auth.data.data.user.login : 
                "로그인해주세요 🧐"
            }</p>
        </div>
    </div>
    );
}
export default MainViewHeader;