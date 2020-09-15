import React from 'react';

import './scss/MainView.scss';

import { RootState } from '../../modules';
import { useSelector } from 'react-redux';

import { TextHeader } from '../../components';

import MainViewHeader from './MainViewHeader';
import ProjectSummary from './ProjectSummary';
import CurrentAttendantChart from './CurrentAttendantChart';
import ParticipatedUserList from './ParticipatedUserList';
import UserRankList from './UserRankList';
import NotableRepos from './NotableRepos';
import LanguageUsageChart from './LanguageUsageChart';

const MainView = () => {
    const { selectedChallenge } = useSelector((state: RootState) => state.main_view);

    return (<div className="main-container">
        <MainViewHeader />
        <div className="main-contents-container">
            {/* 프로젝트 요약 */}
            <div className="main-content-item flex-pc-3">
                <ProjectSummary />
            </div>
            {/* 참가한 정원사 목록 + 오늘 출석 현황 */}
            <div className="main-content-item flex-pc-3" style={{
                width: '-webkit-fill-available'
            }}>
                {/* <TextHeader className='main-content-item-header' title="참여중인 정원사들" desc="현재 프로젝트에 참여중인 정원사분들 입니다"/> */}
                <ParticipatedUserList />
            </div>
            {/* 프로젝트 내 일별 출석 현황 : 차트 */}
            <div className="main-content-item flex-pc-3">
                {/* <TextHeader className='main-content-item-header' title="일별 출석 현황" desc="현재 프로젝트의 출석 현황 차트 입니다"/> */}
                <CurrentAttendantChart />
            </div>
            {/* 프로젝트 내 출석 순위 : 차트 아님 */}
            <div className="main-content-item flex-pc-1">
                {/* <TextHeader className='main-content-item-header' title="출석 순위" desc="지금 프로젝트를 진행중인 정원사님들의 출석 순위 입니다"/> */}
                <UserRankList selectedChallenge={selectedChallenge} />
            </div>
            {/* 가장 커밋이 많은 저장소 */}
            {/* 가장 기여자가 많은 저장소 */}

            <div className="main-content-item flex-pc-1 no-margin">
                {/* <TextHeader className='main-content-item-header' title="언어 분포" desc="현재 프로젝트에서 사용되고 있는 언어의 분포입니다"/> */}
                <NotableRepos selectedChallenge={selectedChallenge} />
            </div>
            {/* 언어 분포도 */}
            <div className="main-content-item flex-pc-1 ">
                {/* <TextHeader className='main-content-item-header' title="언어 분포" desc="현재 프로젝트에서 사용되고 있는 언어의 분포입니다"/> */}
                <LanguageUsageChart selectedChallenge={selectedChallenge} />
            </div>

        </div>
    </div>);
}

export default MainView;