/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { IEvent } from '../../api/interfaces/Event';
import { isNullOrUndefined } from 'util';
import moment from 'moment';
import 'moment/locale/ko';
import * as Lib from '../../lib';
import { GoStar, GoRepoForked, GoGitCommit } from 'react-icons/go';
import { ExternalLink } from '../index';

interface IEventsTimelineItemProps {
    event: IEvent,
    dateLabel?: string,
}

const EventsTimelineItem = (props: IEventsTimelineItemProps) => {
    return <div className="users-activity-log-item" data-date={!isNullOrUndefined(props.dateLabel) ? props.dateLabel : undefined}>
        <div className="users-activity-log-item-wrapper">
            <div className="activity-log-header">
                <p className="message">
                    <b>
                        <ExternalLink 
                            className="repo-info-header-title" 
                            to={ `https://github.com/${props.event.actor_login}` }
                            text={ props.event.actor_login }
                        />
                    </b> 님이 
                    <b> {props.event.payload.size}</b>건의 커밋을 push 했습니다</p>
                <p className="timestamp">{moment(props.event.created_at).fromNow()}</p>
            </div>
            <div className="activity-commits">
                {
                    props.event.payload.commits.map((commit, idx)=>{
                        return <div className="activity-commit-item">
                            <GoGitCommit/>
                            <ExternalLink text={commit.message} 
                                to={
                                    `https://github.com/${props.event.repo.name}/commit/${commit.sha}`
                                }
                                className="commit-message"
                            />
                            <p className="commit-author">{ commit.author.name }</p>
                        </div>
                    })
                }
            </div>
            <div className="activity-log-content">
                {
                    !isNullOrUndefined(props.event.repo_detail) ?
                    <>
                        <div className="repo-info-header">
                            <ExternalLink
                                className="repo-info-header-title"
                                to={ `https://github.com/${props.event.repo_detail.name}` }
                                text={ props.event.repo_detail.name }
                            />
                            <p className="repo-info-header-desc">
                                {props.event.repo_detail.description}
                            </p>
                        </div>
                        <div className="languages-container">
                            {
                                props.event.repo_detail.languages.map((lan, idx) => {
                                    return <div key={idx} className="language-item" >
                                        <span className="language-dot" style={Lib.Github.lanColor(lan.name)}></span>
                                        <p className="language-name">{lan.name}</p>
                                    </div>
                                })
                            }
                        </div>
                        <div className="repo-additional-info">
                            <div className="repo-additional-info-item">
                                <GoStar />
                                <p className="repo-additional-info-item-desc">{props.event.repo_detail.stargazers_count}</p>
                            </div>

                            <div className="repo-additional-info-item">
                                <GoRepoForked />
                                <p className="repo-additional-info-item-desc">{props.event.repo_detail.forks_count}</p>
                            </div>

                        </div>
                    </> : 
                    <div className="repo-info-header">
                        <p className="repo-info-header-title">{props.event.repo.name}</p>
                        <p className="repo-info-header-desc">❗️삭제된 저장소 입니다</p>
                    </div>
                }
            </div>
        </div>
    </div>
}

export default EventsTimelineItem;