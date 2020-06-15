/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';



const ProjectDetailNotSelected = ()=>{
    return <div className="project-not-selected">
        <p className="title">
            선택된 프로젝트가 없습니다 🤷🏽‍
        </p>
        <p className="desc">
            새로 프로젝트를 등록하거나, 기존 프로젝트를 선택해 수정 / 삭제등 관리할 수 있습니다
        </p>
    </div>;
}

export default ProjectDetailNotSelected;