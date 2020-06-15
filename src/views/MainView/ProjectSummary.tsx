/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect, useState } from 'react';

import { Card } from '../../components';

import { RootState } from '../../modules';
import { getSummaryThunk } from '../../modules/analytics/thunks';
import { getUserAuthThunk } from '../../modules/user/thunks';
import { getUserJoinRequest, postUserJoinRequest } from '../../api/user';
import { useSelector, useDispatch } from 'react-redux';
import { isNullOrUndefined } from 'util';
import { IChallenge } from '../../api/interfaces/Challenge';


import Carousel from 'nuka-carousel';

interface UserStateInProjectCardProps {
    selectedChallenge: IChallenge
};

const UserStateInProjectCard = (props: UserStateInProjectCardProps) => {
    enum USER_PARTICIPATION_STATE{
        NOT_PARTICIPATED,
        PARTICIPATED,
        REQUESTED,
        NOT_LOGGED_IN,
    }
    const { user_auth } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const [ userState, setUserState ] = useState(USER_PARTICIPATION_STATE.NOT_PARTICIPATED);

    const init = async ()=>{
        if (!isNullOrUndefined(user_auth) && 
            !isNullOrUndefined(user_auth.data) && 
            !isNullOrUndefined(user_auth.data.data)) {
            if(!user_auth.data.data.is_authenticated){
                setUserState(USER_PARTICIPATION_STATE.NOT_LOGGED_IN);
            }
            else{
                let found = false;
                for(const _c of user_auth.data.data.challenges){
                    if(_c.id === props.selectedChallenge.id){
                        found = true;
                        break;
                    }
                }
                if(found){
                    setUserState(USER_PARTICIPATION_STATE.PARTICIPATED);
                }
                else{
                    const prevRequest = await getUserJoinRequest(props.selectedChallenge.id);
                    if(prevRequest.code > 0 && isNullOrUndefined(prevRequest.data)){
                        setUserState(USER_PARTICIPATION_STATE.NOT_PARTICIPATED);
                    }
                    else{
                        setUserState(USER_PARTICIPATION_STATE.REQUESTED);
                    }
                }
            }
        }
    }

    const request = async ()=>{
        try{
            if(window.confirm("이 프로젝트에 참가 신청을 할까요?")){
                const result = await postUserJoinRequest(props.selectedChallenge.id);
                if(result.code > 0){
                    window.alert("신청했습니다! \n확인 후 참가 처리됩니다!");
                    await init();
                }
            }
        }
        catch(e){
            alert("일시적인 오류가 발생했습니다 : \n " + e.message);
        }
    }

    useEffect(() => {
        dispatch(getUserAuthThunk());
    }, [props.selectedChallenge]);

    useEffect(() => {
        init();
    }, [user_auth.loading]);

    if(userState === USER_PARTICIPATION_STATE.NOT_PARTICIPATED){
        return <Card 
            className="summary-item state not-participated" 
            wrapperClassName="summary-item-wrapper"
            onClick={ request }>
            <p className="summary-title">지금 참여중이 아닙니다</p>
            <p className="summary-desc"><b>참가 신청 하기</b></p>
        </Card>
    }
    else if(userState === USER_PARTICIPATION_STATE.PARTICIPATED){
        return <Card className="summary-item state" wrapperClassName="summary-item-wrapper">
            <p className="summary-title">나의 참여 여부</p>
            <p className="summary-desc"><b>참여 중😎</b></p>
        </Card>
    }
    else if(userState === USER_PARTICIPATION_STATE.REQUESTED){
        return <Card className="summary-item state requested" wrapperClassName="summary-item-wrapper">
            <p className="summary-title">나의 참여 여부</p>
            <p className="summary-desc"><b>승인 대기 중</b></p>
        </Card>
    }
    // 로그인 되어있지 않은 경우
    else{ return <Card className="summary-item state not-participated" wrapperClassName="summary-item-wrapper">
        <p className="summary-title">나의 참여 여부 : 로그인 필요</p>
        <p className="summary-desc"><b>구경왔습니다🧑‍💻</b></p>
    </Card> }
}

const ProjectSummary = () => {
    const dispatch = useDispatch();
    const { selectedChallenge } = useSelector((state: RootState) => state.main_view);
    const { data } = useSelector((state: RootState) => state.analytics.summary);

    useEffect(() => {
        if (!isNullOrUndefined(selectedChallenge)) {
            dispatch(getSummaryThunk(selectedChallenge.id));
        }
    }, [dispatch, selectedChallenge]);

    if (!isNullOrUndefined(data) && !isNullOrUndefined(data.data)) {
        return <div className="main-content-item-wrapper summary">
            <Carousel
                className="summary-items-wrapper"
                withoutControls={true}
                cellAlign={'left'}
                slideWidth={'240px'}
                height={"95px"}
                cellSpacing={15}>
                
                {
                    !isNullOrUndefined(selectedChallenge) ?
                        <UserStateInProjectCard selectedChallenge={selectedChallenge} /> : <></>
                }
                {
                    data.data.days_from_start_to_now < 0 ?
                        <Card className="summary-item d-day" wrapperClassName="summary-item-wrapper" >
                            <p className="summary-title">시작까지 앞으로 🔥</p>
                            <p className="summary-desc"><b>D{data.data.days_from_start_to_now}</b> 일</p>
                        </Card> :
                        <Card className="summary-item remain-days" wrapperClassName="summary-item-wrapper" >
                            <p className="summary-title">종료까지 앞으로 🔥</p>
                            <p className="summary-desc"><b>{data.data.days_from_now_to_finish}</b> 일</p>
                        </Card>
                }
                <Card className="summary-item users" wrapperClassName="summary-item-wrapper">
                    <p className="summary-title">지금까지 참여 중인 정원사 수 🌱</p>
                    <p className="summary-desc"><b>{data.data.user_cnt}</b> 명</p>
                </Card>
                <Card className="summary-item commits" wrapperClassName="summary-item-wrapper">
                    <p className="summary-title">지금까지 게시된 커밋 수 😎</p>
                    <p className="summary-desc"><b>{data.data.commit_cnt}</b> 건</p>
                </Card>
                <Card className="summary-item repos" wrapperClassName="summary-item-wrapper">
                    <p className="summary-title">등록된 저장소 수 🧑‍💻</p>
                    <p className="summary-desc"><b>{data.data.repo_cnt}</b> 개</p>
                </Card>
            </Carousel>
        </div>
    }
    else {
        return <></>
    }
}

export default ProjectSummary;
