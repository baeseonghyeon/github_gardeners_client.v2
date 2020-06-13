import React, { useEffect } from 'react';

import { Card, ExternalLink } from '../../components';
import { IChallenge } from '../../api/interfaces/Challenge';

import { isNullOrUndefined } from 'util';
import { RootState } from '../../modules';
import { getHottestRepoThunk, getPopularRepoThunk } from '../../modules/repositories/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { IExtRepositoryWithoutUser } from '../../api/interfaces/Repository';

import './scss/NotableRepos.scss';

interface RepoItemProps{
    data : IExtRepositoryWithoutUser
}

const RepoItem = (props:RepoItemProps)=>{
    return <div className="repo-item-container">
        <div className="repo-item-header">
            {/* <p className="repo-item-title">{ props.data.repo.name }</p> */}
            <ExternalLink className="repo-item-owner" to={ `http://github.com${props.data.repo.name.split("/")[0]}` } text={props.data.repo.name.split("/")[0] + "/"}/>
            <ExternalLink className="repo-item-title" to={`https://github.com/${props.data.repo.name}`} text={ props.data.repo.name.split("/")[1] }/>
            {/* <p className="repo-item-desc">{ props.data.repo.description }</p> */}
        </div>
        <div className="repo-stats">
            <div className="repo-stat-item">
                <p className="repo-stat-item-name">커밋</p>
                <p className="repo-stat-item-value">{ props.data.commit_cnt }</p>
            </div>
            <div className="repo-stat-item">
                <p className="repo-stat-item-name">참여자</p>
                <p className="repo-stat-item-value">{ props.data.repo.contributor.length}</p>
            </div>
            <div className="repo-stat-item">
                <p className="repo-stat-item-name">포크</p>
                <p className="repo-stat-item-value">{ props.data.repo.forks_count}</p>
            </div>
            <div className="repo-stat-item">
                <p className="repo-stat-item-name">스타</p>
                <p className="repo-stat-item-value">{ props.data.repo.stargazers_count}</p>
            </div>
        </div>
    </div>;
}

interface NotableReposProps{
    selectedChallenge : IChallenge | null
}

const NotableRepos = (props:NotableReposProps)=>{
    const dispatch = useDispatch();
    const { hottest, popular } = useSelector((state:RootState)=>state.repository);
    
    useEffect(()=>{
        if(!isNullOrUndefined(props.selectedChallenge)){
            dispatch(getHottestRepoThunk(props.selectedChallenge.id));
            dispatch(getPopularRepoThunk(props.selectedChallenge.id));
        }
    },[props,props.selectedChallenge]);

    return <div className="notable-repos-container">
        <Card 
            header={{
                title : "가장 핫한 저장소",
                desc : "현재 프로젝트에서 최근 가장 커밋이 많은 저장소 입니다"
            }}
            className="repo-item-card-container hottest"
            wrapperClassName="repo-item-card-wrapper"
        >
            {
                !isNullOrUndefined(hottest) && !isNullOrUndefined(hottest.data) && !isNullOrUndefined(hottest.data.data) ?
                <RepoItem data={ hottest.data.data }/> : <></>
            }
        </Card>

        <Card 
            header={{
                title : "가장 붐비는 저장소",
                desc : "현재 프로젝트에서 최근 가장 참여자가 많은 저장소 입니다"
            }}
            className="repo-item-card-container popular"
            wrapperClassName="repo-item-card-wrapper"
        >
            {
                !isNullOrUndefined(popular) && !isNullOrUndefined(popular.data) && !isNullOrUndefined(popular.data.data) ?
                <RepoItem data={ popular.data.data }/> : <></>
            }
        </Card>
    </div>
}

export default NotableRepos;