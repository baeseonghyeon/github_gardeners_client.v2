/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { IEvent } from '../../api/interfaces/Event';
import { isNullOrUndefined } from 'util';
import moment from 'moment';
import * as Lib from '../../lib';
import { GoStar, GoRepoForked } from 'react-icons/go';

interface IEventsTimelineItemProps {
    event: IEvent,
    dateLabel?: string,
}

const EventsTimelineItem = (props: IEventsTimelineItemProps) => {
    return <div className="users-activity-log-item" data-date={!isNullOrUndefined(props.dateLabel) ? props.dateLabel : undefined}>
        <div className="users-activity-log-item-wrapper">
            <div className="activity-log-header">
                <p className="message"><b>{props.event.actor_login}</b> 님이 <b>{props.event.payload.size}</b>건의 커밋을 push 했습니다</p>
                <p className="timestamp">{moment(props.event.created_at).fromNow()}</p>
            </div>
            <div className="activity-log-content">
                {
                    !isNullOrUndefined(props.event.repo_detail) ?
                    <>
                        <div className="repo-info-header">
                            <a className="repo-info-header-title"
                                rel="noopener noreferrer"
                                target="_blank"
                                href={`https://github.com/${props.event.repo_detail.name}`}
                            >{props.event.repo_detail.name}</a>
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