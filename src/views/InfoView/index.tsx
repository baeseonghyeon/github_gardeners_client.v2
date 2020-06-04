import React from 'react';
import './info.scss';
import { DiMitlicence } from 'react-icons/di';
const InfoView = () => {
    return (
        <div className="contents info">
            <h1 className="title">
                <b>정원사 프로젝트</b>를 이용해주셔서 감사합니다 😎
            </h1>
            <p className="desc">
                <b>정원사 프로젝트</b>는 깃허브 API를 이용해 a commit a day 프로젝트를 진행하는 것을 도와주는 서비스입니다.
            </p>

            <div className="content-wrapper">
                <div className="info-item">
                    <p className="info-title">제작 : </p>
                    <a className="info-link" href="https://github.com/YOOGOMJA" target="_blank" rel="noopener noreferrer">
                        유경수
                    </a>
                </div>
                <div className="info-item">
                    <p className="info-title">메일 : </p>
                    <a className="info-link" href="mailto://dev.yoogomja@gmail.com" target="_blank" rel="noopener noreferrer">
                        dev.yoogomja@gmail.com
                    </a>
                </div>
                <div className="info-item">
                    <p className="info-title">API Github Repository : </p>
                    <a className="info-link" href="https://github.com/YOOGOMJA/github_garden_mern" target="_blank" rel="noopener noreferrer">
                        YOOGOMJA/github_garden_mern
                    </a>
                </div>
                <div className="info-item">
                    <p className="info-title">Client Github Reposioty : </p>
                    <a className="info-link" href="https://github.com/YOOGOMJA/github_garden_mern_client" target="_blank" rel="noopener noreferrer">
                        YOOGOMJA/github_garden_mern_client
                    </a>
                </div>
                <div className="info-item">
                    <p className="info-title">License : </p>
                    <p className="license"><DiMitlicence/>MIT Licence</p>
                </div>
            </div>
        </div>
    );
}

export default InfoView;