/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import './scss/RequestManageHeader.scss';

import { RootState } from '../../modules';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthThunk } from '../../modules/user/thunks';
import { getActiveChallengesThunk } from '../../modules/challenges';
import { isNullOrUndefined } from 'util';

import { MdArrowDropDown } from 'react-icons/md';
import IChallenge from '../../api/interfaces/Challenge';

interface RequestManageHeaderProps{
    selectedChallenge : IChallenge | null | undefined,
    onChange : (selected : IChallenge)=>void
}
const RequestManageHeader = (props:RequestManageHeaderProps) => {
    const _dispatch = useDispatch();
    const { data, loading } = useSelector((state: RootState) => state.challenge.active_challenges);
    const [ isCollapsed, setIsCollapsed ] = useState(true);
    useEffect(() => {
        _dispatch(getActiveChallengesThunk());
        _dispatch(getUserAuthThunk());
    }, []);

    useEffect(() => {
        if (!loading && !isNullOrUndefined(data) && !isNullOrUndefined(data.data) && data.data.length > 0) {
            props.onChange(data.data[0]);
        }
    }, [loading, data]);
    return (<div className="request-header-container">

        {/* 프로젝트 정보 */}
        <div className={`header-challenge-collapse ${isCollapsed ? "collapsed" : ""}`}>
            <button className="header-collapse-btn" type="button" onClick={() => setIsCollapsed(!isCollapsed)} >
                <MdArrowDropDown />
            </button>
            <p className="header-collapse-title">
                {props.selectedChallenge?.title}
            </p>
        </div>
        <div className={`header-challeges-container ${isCollapsed ? "collapsed" : ""}`}>
            <div className="header-challenges-wrapper">
                {
                    !isNullOrUndefined(data) && !isNullOrUndefined(data.data) ?
                        data.data.map((item, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className={"header-challenge-item " + (props.selectedChallenge === item ? "active" : "")}
                                    onClick={() => {
                                        setIsCollapsed(true);
                                        props.onChange(item);
                                    }}
                                >
                                    <p className="header-challenge-title">{item.title}</p>
                                </div>
                            );
                        }) : <></>
                }
            </div>
        </div>
    </div>
    );
}
export default RequestManageHeader;