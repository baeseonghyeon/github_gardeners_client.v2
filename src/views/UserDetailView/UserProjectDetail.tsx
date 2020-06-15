/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './scss/UserProjectDetail.scss';

import { TextHeader, Card } from '../../components';
import Carousel from 'nuka-carousel';
import { isNullOrUndefined } from 'util';
import * as Lib from '../../lib';

import { RootState } from '../../modules/';
import { useDispatch, useSelector } from 'react-redux';
import { getChallengesByUserThunk, clearChallengesByUserThunk } from '../../modules/challenges/thunks';

import { GoVerified, GoPulse, GoPackage } from 'react-icons/go';

import UserProjectDetailItems from './UserProjectDetailItems';

interface IUserProjectDetailProps {
    login: string,
    // onReload?: (page:number)=>void,
}

const UserProjectDetail = (props: IUserProjectDetailProps) => {
    const dispatch = useDispatch();
    const { challenges_by_user } = useSelector((state: RootState) => state.challenge);
    const { user } = useSelector((state: RootState) => state.user);
    const [ selectedChallenge, setSelectedChallenge] = useState<string>("");
    const [ selectedChallengeState, setSelectedChallengeState] = useState(0);

    useEffect(() => {
        dispatch(getChallengesByUserThunk(props.login));
        return () => {
            dispatch(clearChallengesByUserThunk());
        }
    }, [user.loading]);

    return <div className="user-project-detail-container">
        <div className="user-project-detail-header">
            <TextHeader title="참여한 프로젝트" desc="정원사님이 참여중이거나, 기존에 참여하신 프로젝트들입니다" />
            {
                !isNullOrUndefined(challenges_by_user.data)
                    && !isNullOrUndefined(challenges_by_user.data.data)
                    && challenges_by_user.data.data.length > 0 ?
                    <Carousel
                        className="user-participated-projects"
                        withoutControls={true}
                        cellAlign={'left'}
                        slideWidth={'270px'}
                        height={"90px"}
                        cellSpacing={15}
                    >
                        {
                            challenges_by_user.data.data.map((challenge, idx) => {
                                return <Card
                                    key={idx}
                                    className={`user-project-card ${selectedChallenge === challenge.id ? 'selected' : ""}`}
                                    onClick={() => {
                                        setSelectedChallenge(challenge.id);
                                        setSelectedChallengeState(Lib.Date.fromNow(challenge.start_dt, challenge.finish_dt))
                                    }}>
                                    <div className="card-content">
                                        <p className="challenge-title">{challenge.title}</p>
                                        <p className="challenge-period" >{Lib.Date.getPeriodString(challenge.start_dt, challenge.finish_dt, "YY.MM.DD")}</p>
                                        <div className="card-footer">
                                            <p >참가자 : {challenge.participants.length} 명</p>
                                            {
                                                (() => {
                                                    const _fromNow = Lib.Date.fromNow(challenge.start_dt, challenge.finish_dt);
                                                    if (_fromNow < 0) {
                                                        return <div className="challenge-from-now soon">
                                                            <GoPackage />
                                                            <p>준비중</p>
                                                        </div>
                                                    }
                                                    else if (_fromNow === 0) {
                                                        return <div className="challenge-from-now process">
                                                            <GoPulse />
                                                            <p>진행중</p>
                                                        </div>
                                                    }
                                                    else {
                                                        return <div className="challenge-from-now verified">
                                                            <GoVerified />
                                                            <p>종료됨</p>
                                                        </div>
                                                    }
                                                })()
                                            }
                                        </div>
                                    </div>

                                </Card>
                            })
                        }
                    </Carousel> :
                    <TextHeader
                        className="user-participated-projects empty"
                        title="프로젝트 없음 🧐"
                        desc="참여중인 프로젝트가 아직 없습니다"
                    />
            }

        </div>
        {
            !isNullOrUndefined(challenges_by_user.data)
                && !isNullOrUndefined(challenges_by_user.data.data)
                && challenges_by_user.data.data.length > 0 ?
                selectedChallenge !== "" ?
                        <UserProjectDetailItems
                        className="user-project-detail-contents"
                        login={props.login}
                        challengeState={selectedChallengeState}
                        challengeId={selectedChallenge} />
                    : <TextHeader className="user-project-detail-contents empty" title="선택된 프로젝트가 없음 🧐" desc="조회할 프로젝트를 선택해주세요" />
                : <></>
        }
    </div>
}

export default UserProjectDetail;