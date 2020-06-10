/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';

import { RootState } from '../../modules/';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfoThunk } from '../../modules/user';
import { isNullOrUndefined } from 'util';
import { TextHeader, CustomButton, EventsTimeline } from '../../components';
import { getEventsByUserThunk, clearEventsByUserThunk } from '../../modules/events';

import './scss/UserDetailView.scss';

import UserProfile from './UserProfile';
import UserRepos from './UserRepos';
import UserProjectDetail from './UserProjectDetail';

enum NavFlags {
    SUMMARY,
    REPOS,
    ACTIVITY,
}

const UserDetailView = () => {
    const { user_name } = useParams();
    const _history = useHistory();
    const _dispatch = useDispatch();
    const { loading, data } = useSelector((state: RootState) => state.user.user);
    const { events_by_user } = useSelector((state: RootState) => state.event);
    const [navState, setNavState] = useState(NavFlags.SUMMARY);

    useEffect(() => {
        _dispatch(getUserInfoThunk(user_name));
    }, [user_name]);

    useEffect(() => {
        if (!loading && !isNullOrUndefined(data)) {
            if (data.code <= 0) {
                // 사용자가 조회되지 않은 경우 
                _history.push('/__not_found');
            }
            else {
                _dispatch(getEventsByUserThunk(data.data.login, 1));
            }
        }
    }, [loading, data]);

    useEffect(() => {
        if (navState !== NavFlags.ACTIVITY) {
            _dispatch(clearEventsByUserThunk());
        }
    }, [navState]);

    return (<div className="user-detail-container">
        <div className="user-detail-wrapper">
            <div className="user-profile-container">
                {
                    !isNullOrUndefined(data) ?
                        <UserProfile data={data} /> :
                        <></>
                }
            </div>
            <div className="user-activity-container">
                <div className="user-activity-header">
                    <TextHeader
                        title="정원사 상세 정보"
                        desc="정원사님의 상세 정보와 활동 내역입니다. 관련 정보를 조회할 프로젝트를 선택해주세요."
                    />
                    <nav className="__custom_nav_container__">
                        <ul className="__custom_nav_wrapper__">
                            <li className="__customer_nav_item__ ">
                                <CustomButton className={`__custom_nav_item_btn__ ${navState === NavFlags.SUMMARY ? "active" : ""}`} text="프로젝트 요약" onClick={() => setNavState(NavFlags.SUMMARY)} />
                            </li>
                            <li className="__customer_nav_item__">
                                <CustomButton className={`__custom_nav_item_btn__ ${navState === NavFlags.ACTIVITY ? "active" : ""}`} text="최근 활동" onClick={() => setNavState(NavFlags.ACTIVITY)} />
                            </li>
                            <li className="__customer_nav_item__">
                                <CustomButton className={`__custom_nav_item_btn__ ${navState === NavFlags.REPOS ? "active" : ""}`} text="저장소" onClick={() => setNavState(NavFlags.REPOS)} />
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="user-activity-content">
                    {
                        navState === NavFlags.ACTIVITY ?
                            <EventsTimeline
                                events={events_by_user}
                                onReload={(page) => {
                                    if (!isNullOrUndefined(data) && !isNullOrUndefined(data.data)) {
                                        _dispatch(getEventsByUserThunk(data?.data.login, page));
                                    }
                                }}
                            /> :
                            <></>
                    }
                    {
                        navState === NavFlags.REPOS ?
                            <UserRepos
                                login={user_name}
                            /> :
                            <></>
                    }
                    {
                        navState === NavFlags.SUMMARY ?
                            <UserProjectDetail
                                login={user_name}
                            /> : <></>
                    }
                </div>
            </div>
        </div>
    </div>);
}

export default UserDetailView;