/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { TextHeader } from '../../components';

import './scss/UserProjectDetailItems.scss';

import { getUserAttendanceToday, getUserRank } from '../../api/analytics';

import { IoMdCheckmarkCircleOutline, IoMdCheckmarkCircle } from 'react-icons/io';
import { FaMedal } from 'react-icons/fa';
import { GoVerified, GoPulse, GoPackage } from 'react-icons/go';
import ICommit from '../../api/interfaces/Commit';
import { isNullOrUndefined } from 'util';

import UserAttendanceChart from './UserAttendanceChart';
import UserLanguageUsageChart from './UserLanguageUsageChart';

interface ChallengeStateCardProps {
    challengeState: number;
}

const ChallegeStateCard = (props: ChallengeStateCardProps) => {
    return <div className={
        "summary-item " +
        (
            props.challengeState < 0 ? "state-prev" :
                (
                    props.challengeState === 0 ? "state-process" :
                        "state-finished"
                )
        )
    }>
        {
            props.challengeState < 0 ? <GoPackage /> :
                (
                    props.challengeState === 0 ? <GoPulse /> :
                        <GoVerified />
                )
        }
        <div className="summary-content">
            <p className="summary-header">{
                props.challengeState < 0 ? "준비중" :
                    (
                        props.challengeState === 0 ? "진행중" :
                            "종료됨"
                    )
            }</p>
            <p className="summary-desc">
                {
                    props.challengeState < 0 ? "이 프로젝트는 아직 진행 전 입니다" :
                        (
                            props.challengeState === 0 ? "이 프로젝트는 지금 진행 중 입니다" :
                                "이 프로젝트는 종료 되었습니다"
                        )
                }
            </p>
        </div>
    </div>
}

interface AttendanceTodayCardProps {
    challengeId: string,
    login: string
}

const AttendanceTodayCard = (props: AttendanceTodayCardProps) => {
    const [resultCode, setResultCode] = useState(0);
    const [data, setData] = useState<ICommit[]>([]);
    const fn = {
        getAttendanceToday: async () => {
            let _code = 0;
            try {
                const result = await getUserAttendanceToday(props.challengeId, props.login);
                _code = result.code as number;
                if (result.code > 0) {
                    setData(result.data);
                }
            }
            catch (e) {
                _code = e.code;
            }
            finally {
                setResultCode(_code);
            }
        }
    }
    useEffect(() => {
        fn.getAttendanceToday();
    }, [props]);

    if (resultCode > 0 && !isNullOrUndefined(data)) {
        if (data.length > 0) {
            return <div className="summary-item attendance attended">
                <IoMdCheckmarkCircle />
                <div className="summary-content">
                    <p className="summary-header">출석함</p>
                    <p className="summary-desc">오늘은 출석했어요</p>
                </div>
            </div>
        }
        else {
            return <div className="summary-item attendance">
                <IoMdCheckmarkCircleOutline />
                <div className="summary-content">
                    <p className="summary-header">출석 안함</p>
                    <p className="summary-desc">오늘 아직 출석하지 않았어요</p>
                </div>
            </div>
        }
    }
    else {
        return <></>
    }
}

interface UserRankCardProps {
    challengeId: string,
    login: string
}

const UserRankCard = (props: UserRankCardProps) => {
    const [resultCode, setResultCode] = useState(0);
    const [rank, setRank] = useState(0);
    const [total, setTotal] = useState(0);
    const fn = {
        getUserRank: async () => {
            let _code = 0;
            try {
                const result = await getUserRank(props.challengeId, props.login);
                _code = result.code as number;
                if (result.code > 0) {
                    setRank(result.data.rank);
                    setTotal(result.data.total);
                }
            }
            catch (e) {
                _code = e.code;
            }
            finally {
                setResultCode(_code);
            }
        }
    }
    useEffect(() => {
        fn.getUserRank();
    }, [props]);

    if (resultCode > 0) {
        return <div className={"summary-item rank " + (rank === 1 ? "first" : (rank === 2 ? "second" : (rank === 3 ? "third" : "etc")))}>
            <FaMedal />
            <div className={`summary-content`}>
                <p className="summary-header">{rank}위 🔥</p>
                <p className="summary-desc">정원사 {total}명 중 {rank}위를 기록했습니다</p>
            </div>
        </div>
    }
    else {
        return <></>
    }
}

interface UserProjectDetailItemsProps {
    login: string,
    challengeId: string,
    challengeState: number,
    className?: string,
}

const UserProjectDetailItems = (props: UserProjectDetailItemsProps) => {
    useEffect(() => {

    }, [props]);

    // 일별 출석 현황
    // 최근 활동
    // 가장 많이 사용된 언어 
    // 가장 커밋이 많은 저장소 
    return (
        <div className={props.className}>
            <div className="user-project-detail-item">
                <TextHeader title={"요약"} desc="해당 프로젝트의 요약입니다" />
                {/* 프로젝트 탈퇴 */}
                <div className="summary-wrapper">
                    {/* 수행 여부 */}
                    <ChallegeStateCard challengeState={props.challengeState}/>
                    {/* 출석 여부 */}
                    <AttendanceTodayCard challengeId={props.challengeId} login={props.login} />
                    {/* 오늘까지 랭크 */}
                    <UserRankCard challengeId={props.challengeId} login={props.login} />
                </div>
            </div>
            <div className="user-project-detail-item">
                <TextHeader title={"프로젝트 출석률"} desc="해당 프로젝트에서의 출석률입니다" />
                <UserAttendanceChart challengeId={ props.challengeId } login={ props.login } />
            </div>
            <div className="user-project-detail-item">
                <TextHeader title={"가장 많이 사용된 언어"} desc="해당 프로젝트에서 가장 많이 사용된 언어들 입니다" />
                <UserLanguageUsageChart challengeId={ props.challengeId } login={ props.login } />
            </div>
        </div>
    )
};

export default UserProjectDetailItems;