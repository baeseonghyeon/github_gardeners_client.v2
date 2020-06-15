/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './scss/UserRepos.scss';

import { RootState } from '../../modules/';
import { useDispatch, useSelector } from 'react-redux';
import { getRepositoriesByUserThunk, clearRepositoriesByUserThunk } from '../../modules/repositories';
import { isNullOrUndefined } from 'util';
import { ExternalLink, UserInfo, CustomButton } from '../../components';
import * as Lib from '../../lib';
import { IRepositoryWithUser, IRepositoryLanguage } from '../../api/interfaces/Repository';

import { GoStar, GoRepoForked } from 'react-icons/go';
import moment from 'moment';

import { useHistory } from 'react-router';

interface IUserRepoItemProps {
    data: IRepositoryWithUser,
    key? : number | string,
}

const UserRepoItem = (props: IUserRepoItemProps) => {
    const [lanUsage, setLanUsage] = useState(0);
    const _history = useHistory();
    useEffect(() => {
        let sum = 0;
        props.data.languages.forEach(lang => {
            sum += lang.rate;
        });
        setLanUsage(sum);

    }, [props, props.data]);

    const fn = {
        lanPerc: (usage: number, all_usage: number) => {
            const percentage = ((usage / all_usage) * 100).toFixed(2);
            return `${percentage}%`;
        }
    }

    const ui = {
        lanPercBar: (languages: [IRepositoryLanguage]) => {
            return <div className="languages-percentage-bar" >
                {
                    languages.map((item) => {
                        const _styles: any = {
                            width: fn.lanPerc(item.rate, lanUsage),
                            ...Lib.Github.lanColor(item.name),
                        }
                        return <span key={item.name + (new Date()).getDate().toString()} className="language-percentage" style={_styles}></span>
                    })
                }
            </div>
        }
    }

    return <div className="user-repo-item-container">
        <div className="user-repo-item-header">
            <ExternalLink className="repo-title" text={props.data.name} to={`https://github.com/${props.data.name}`} />
            <p className="repo-desc">{props.data.description}</p>
            <div className="repo-details">
                <div className="repo-detail-item star">
                    <GoRepoForked />
                    <p className="repo-detail-item-desc">
                        {props.data.forks_count}
                    </p>
                </div>
                <div className="repo-detail-item forks">
                    <GoStar />
                    <p className="repo-detail-item-desc">
                        {props.data.stargazers_count}
                    </p>
                </div>
                <div className="repo-detail-item created_at">
                    <p className="repo-detail-item-desc">
                        {moment(props.data.created_at).format("YYYY-MM-DD HH:mm:ss")}
                    </p>
                </div>
            </div>
        </div>
        <div className="user-repo-item-content">

            <div className="languages-list-container">
                {
                    props.data.languages.map((lan, idx) => {
                        return <div key={idx} className="language-item-container" >
                            <span className="language-item-dot" style={Lib.Github.lanColor(lan.name)} ></span>
                            <p className="language-item-name">{lan.name}</p>
                            <p className="language-item-rate">{fn.lanPerc(lan.rate, lanUsage)}</p>
                        </div>
                    })
                }
            </div>
            {ui.lanPercBar(props.data.languages)}
        </div>
        <div className="contributors-container">
            {
                props.data.contributor.map((user, idx) => {
                    return <UserInfo
                        key={idx}
                        className="contributor-item"
                        isVertical={true}
                        onClick={() => _history.push(`/users/${user.login}`)}
                        {...user} />
                })
            }
        </div>
    </div>;
}

interface IUserReposViewProps {
    login: string,
    onReload?: (page: number) => void
}

const UserReposView = (props: IUserReposViewProps) => {
    const _dispatch = useDispatch();
    const { data, loading } = useSelector((state: RootState) => state.repository.repos_by_user);
    const [currentPage, setCurrentPage] = useState(1);
    const [displayItems, setDisplayItems] = useState<IRepositoryWithUser[]>([]);
    useEffect(() => {
        _dispatch(getRepositoriesByUserThunk(props.login));
        return () => {
            _dispatch(clearRepositoriesByUserThunk());
        }
    }, [props.login]);

    useEffect(() => {
        if (!isNullOrUndefined(data) && !isNullOrUndefined(data.data)) {
            setDisplayItems([
                ...displayItems,
                ...data.data
            ]);
        }
    }, [data]);

    const fn = {
        loadMore: () => {
            if (!loading && !isNullOrUndefined(data) && !isNullOrUndefined(data.data)) {
                _dispatch(getRepositoriesByUserThunk(props.login, currentPage));
                setCurrentPage(currentPage + 1);
                if (!isNullOrUndefined(props.onReload)) {
                    props.onReload(currentPage + 1);
                }
            }
        }
    }

    return <div className="user-repos-list-container">
        {
            displayItems.map((repo,idx) => {
                return <UserRepoItem data={repo} key={idx}/>
            })
        }
        {
            displayItems.length % 10 === 0 ?
                <div className="user-repos-list-reload">
                    <CustomButton
                        className="user-repos-reload-btn"
                        text="LOAD MORE"
                        onClick={() => fn.loadMore()}
                    />
                </div> : <></>
        }
    </div>;
}

export default UserReposView;