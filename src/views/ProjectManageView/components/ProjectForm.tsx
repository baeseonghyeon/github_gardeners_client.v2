import React from 'react';

import './ProjectForm.scss';
import { AnimatedTextInput, AnimatedDateInput } from '../../../components';
import { isNullOrUndefined } from 'util';

interface ProjectDetailFormProps {
    // 프로젝트 제목
    title: string,
    // 프로젝트 제목 변경 이벤트 
    onTitleChange: Function,
    // 프로젝트 시작 일자 
    startDt: string,
    // 프로젝트 시작 일자 변경 이벤트 
    onStartDtChange: Function,
    // 프로젝트 종료 일자
    finishDt: string,
    // 프로젝트 종료 일자 변경 이벤트
    onFinishDtChange: Function,
    // form 버튼들
    submitButtonClick: Function,
    submitButtonText: string,
    cancelButtonClick: Function,
    cancelButtonText: string,
    deleteButtonClick?: Function,
    // 메시지 
    message?: string,
}

const ProjectDetailForm = (props: ProjectDetailFormProps) => {
    
    return (<div className="__project-detail-form">
        <div className="__project-detail-form-wrapper">
            <AnimatedTextInput
                title={"프로젝트 명"}
                value={props.title}
                onChange={(text: string) => props.onTitleChange(text)}
            />
            <AnimatedDateInput
                title="프로젝트 시작 일자"
                value={props.startDt}
                onChange={(date: string) => props.onStartDtChange(date)}
                index={0}
            />
            <AnimatedDateInput
                title="프로젝트 종료 일자"
                value={props.finishDt}
                onChange={(date: string) => props.onFinishDtChange(date)}
                index={1}
            />
        </div>
        <div className="__project-detail-form-footer">
            <button type="button" className="__project-detail-form-button submit" onClick={e => props.submitButtonClick()}>{props.submitButtonText}</button>
            <button type="button" className="__project-detail-form-button cancel" onClick={e => props.cancelButtonClick()}>{props.cancelButtonText}</button>
            {
                (!isNullOrUndefined(props.deleteButtonClick) ?
                    <button type="button" className="__project-detail-form-button delete" onClick={e => { if (!isNullOrUndefined(props.deleteButtonClick)) { props.deleteButtonClick() } }}>삭제</button> :
                    <></>)
            }
        </div>
    </div>);
}

export default ProjectDetailForm;