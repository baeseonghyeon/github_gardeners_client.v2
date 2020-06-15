/* eslint-disable jsx-a11y/accessible-emoji */
import React , { useState, useEffect } from 'react';
import ChallengeInterface from '../../api/interfaces/Challenge';
import ProjectForm from './components/ProjectForm';
import { isNullOrUndefined } from 'util';
import moment from 'moment';
import 'moment/locale/ko';

import { putChallenge, deleteChallenge, deleteUserFromChallenge } from '../../api/challenge';
import { useDispatch } from 'react-redux';
import { getAllChallengesThunk } from '../../modules/challenges/thunks';
import { TextHeader, UserInfo } from '../../components';



interface ProjectDetailProps {
    data : ChallengeInterface,
    onCancel? : Function,
}

const ProjectDetail = (props: ProjectDetailProps)=>{
    const [title, setTitle] = useState("");
    const [startDt, setStartDt] = useState("");
    const [finishDt, setFinishDt] = useState("");
    const dispatch= useDispatch();

    useEffect(()=>{
        setTitle(props.data.title);
        setStartDt(props.data.start_dt);
        setFinishDt(props.data.finish_dt);

        return ()=>{
            setTitle("");
            setStartDt("");
            setFinishDt("");
        }
    },[props.data]);

    const fn ={
        put : async ()=>{
            if(window.confirm("정말 이 프로젝트 내용을 수정할까요?")){
                try{
                    const result = await putChallenge(
                        props.data.id,
                        {
                            title : title,
                            start_dt : moment(startDt).toDate(),
                            finish_dt: moment(finishDt).toDate()
                        }
                    );
                    alert(result.message);
                    dispatch(getAllChallengesThunk());
                }
                catch(e){
                    alert("오류가 발생했습니다. 잠시 후 다시시도해주세요");
                }
            }
        },
        del : async ()=>{
            if(window.confirm("정말 이 프로젝트를 삭제할까요?")){
                try{
                    const result = await deleteChallenge(
                        props.data.id
                    );
                    alert(result.message);
                    dispatch(getAllChallengesThunk());
                }
                catch(e){
                    alert("오류가 발생했습니다. 잠시 후 다시시도해주세요");
                }
            }
        },
        delUser : async(login:string)=>{
            if(window.confirm("사용자를 프로젝트에서 제외할까요?")){
                try{
                    const result = await deleteUserFromChallenge(
                        props.data.id,
                        login
                    );
                    if(result.code > 0){
                        dispatch(getAllChallengesThunk());
                    }
                    else{
                        alert(result.message + " | " + result.error.message);
                    }
                }
                catch(e){
                    alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요");
                }
            }
        }
    }

    return <div className="project-detail-container">
        <div className="header-wrapper">
            <p className="title">프로젝트 편집 😎</p>
            <p className="desc">기존 프로젝트 내용을 편집합니다. 관리자 권한이 있는 사용자만 수정/삭제 할 수 있습니다</p>
        </div>
        <div className="project-detail-form">
            <ProjectForm
                title={ title }
                onTitleChange={ setTitle }
                startDt={startDt}
                onStartDtChange={ setStartDt }
                finishDt={ finishDt }
                onFinishDtChange={ setFinishDt }
                submitButtonClick={ fn.put }
                submitButtonText={ "수정" }
                cancelButtonClick={ ()=>{ if(!isNullOrUndefined(props.onCancel)){ props.onCancel() } } }
                cancelButtonText={ "취소" }
                deleteButtonClick={ fn.del }
            />
        </div>
        <div className="project-participants-list-container">
            <TextHeader title="참여 중인 정원사" desc="현재 참여중인 정원사들입니다 클릭시 현재 프로젝트에서 제외할 수 있습니다"/>
            <div className="project-participants-list-wrapper">
                {  
                    props.data.participants.map((item,idx)=>{
                        return <UserInfo key={idx} className="project-participant-item" onClick={ ()=>fn.delUser(item.login) } { ...item } />
                    })
                }
                
            </div>
        </div>

    </div>
};

export default ProjectDetail;