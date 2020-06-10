/* eslint-disable jsx-a11y/accessible-emoji */
import React , { useState, useEffect } from 'react';

import ProjectForm from './components/ProjectForm';
import { isNullOrUndefined, isNull } from 'util';
import moment from 'moment';
import 'moment/locale/ko';
import { postChallenge } from '../../api/challenge';
import { useDispatch } from 'react-redux';
import { getAllChallengesThunk } from '../../modules/challenges/thunks';

interface ProjectInsertProps {
    onCancel : Function,
    onComplete : Function,
}

const ProjectInsert = (props: ProjectInsertProps)=>{
    const [title, setTitle] = useState("");
    const [startDt, setStartDt] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [finishDt, setFinishDt] = useState(moment(new Date()).add(1,'day').format('YYYY-MM-DD'));
    const dispatch = useDispatch();

    useEffect(()=>{
        return ()=>{
            setTitle("");
            setStartDt("");
            setFinishDt("");
        }
    },[]);

    const fn ={
        submit : async ()=>{
            if(window.confirm("프로젝트를 추가할까요?")){
                try{
                    const result = await postChallenge({
                        title : title,
                        start_dt : moment(startDt).toDate(),
                        finish_dt : moment(finishDt).toDate(),
                    });    
                    alert(result.message);
                }
                catch(e){
                    alert("일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요");
                }
                finally{
                    dispatch(getAllChallengesThunk());
                    props.onComplete();
                }
            }
        }
    }

    return <div className="project-detail-container">
        <div className="header-wrapper">
            <p className="title">프로젝트 추가 😎</p>
            <p className="desc">새로운 프로젝트를 추가합니다</p>
        </div>
        <div className="project-detail-form">
            <ProjectForm
                title={ title }
                onTitleChange={ setTitle }
                startDt={startDt}
                onStartDtChange={ setStartDt }
                finishDt={ finishDt }
                onFinishDtChange={ setFinishDt }
                submitButtonClick={ fn.submit }
                submitButtonText={ "추가" }
                cancelButtonClick={ ()=>props.onCancel() }
                cancelButtonText={ "취소" }  
            />
        </div>
    </div>
};

export default ProjectInsert;