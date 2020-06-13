/* eslint-disable react-hooks/exhaustive-deps */
import React , { useEffect, useState } from 'react';

import './scss/ParticipatedUserList.scss';

import { Card, UserInfo } from '../../components';

import { RootState } from '../../modules';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersInProjectThunk, clearUsersInProjectThunk } from '../../modules/user/thunks';
import { isNullOrUndefined } from 'util';

import { GoVerified, GoUnverified } from 'react-icons/go';

const ParticipatedUserList = ()=>{
    const { selectedChallenge } = useSelector((state:RootState)=>state.main_view);
    const dispatch = useDispatch();
    const { data, loading }  = useSelector((state:RootState)=>state.user.users_in_project);

    useEffect(() => {
        if(!isNullOrUndefined(selectedChallenge)){
            dispatch(getUsersInProjectThunk(selectedChallenge.id));
        }
        return () => {
            dispatch(clearUsersInProjectThunk());
        }
    }, [selectedChallenge])

    return <Card 
        header={ { title : "참여한 정원사들" , desc:"프로젝트에 참여중인 정원사분들입니다" } }
        className="participated-user-list-container" 
        wrapperClassName="participated-user-list-wrapper">
        {
            !isNullOrUndefined(data) && !isNullOrUndefined(data.data) ? 
            data.data.map((user, idx)=>{
                return <UserInfo 
                    className={ `participated-user ${ user.attended ? "" : "not-attended" }` } 
                    isVertical={true} 
                    key={idx} 
                    Badge={ user.attended ? <GoVerified/> : <GoUnverified/> }
                    { ...user.user } />
            }) : <></>
            
        }
    </Card>
}

export default ParticipatedUserList;