import React, { useEffect, useState } from 'react';

import { RootState } from '../../modules';
import { getUsersInfoThunk } from '../../modules/user/thunks';
import { getEventsThunk, getEventsByUserThunk } from '../../modules/events/thunks';
import { useSelector, useDispatch } from 'react-redux';

import './UsersView.scss';

import { TextHeader, EventsTimeline } from '../../components';
import UserSearch from './UserSearch';
import UserList from './UserList';

const UsersView = () => {
    const _dispatch = useDispatch();
    const { users, searched_users } = useSelector((state: RootState) => state.user);
    const { events, events_by_user } = useSelector((state: RootState) => state.event);
    const [isSearched, setIsSearched] = useState(false);

    useEffect(() => {
        _dispatch(getUsersInfoThunk());
    }, []);

    return (<div className="users-view-container">
        <div className="users-view-content">
            <div className="users-list-container">
                <div className="users-list-header">
                    <TextHeader title="정원사들 👩‍💻" desc="활동중인 모든 정원사분들입니다" />
                    {/* 검색 기능 */}
                    <UserSearch isSearched={isSearched} onSearch={setIsSearched} />
                </div>
                {/* 사용자 목록 */}
                <UserList isSearched={isSearched} users={users.data} searched_users={searched_users.data} />
            </div>
            <div className="users-activity-logs-container">
                <div className="users-activity-logs-header">
                    <TextHeader title="정원사들 활동" desc="정원사님들의 최근 활동 내역입니다" />
                </div>
                <div className="users-activity-logs-content">
                    <EventsTimeline events={ events } onReload={ page=>{
                        _dispatch(getEventsThunk(page));
                    } }/>
                </div>
            </div>
        </div>
    </div>);
}

export default UsersView;   