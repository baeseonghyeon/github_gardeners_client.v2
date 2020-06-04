import React, { useEffect, useState } from 'react';
import './ProjectManage.scss';

import ProjectListItem from './ProjectListItem';
import ProjectDetailNotSelected from './ProjectDetailNotSelected';
import ProjectDetail from './ProjectDetail';
import ProjectInsert from './ProjectInsert';
import ProjectNotAuthenticated from './NotAuthenticated';

import { getAllChallengesThunk } from '../../modules/challenges/thunks';
import { RootState } from '../../modules';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddToPhotos } from 'react-icons/md';

import Carousel from 'nuka-carousel';

import { isNullOrUndefined } from 'util';
import ChallengeInterface from '../../api/interfaces/Challenge';

enum projectManageViewState {
    EDIT,
    INSERT,
} 

const ProjectManageView = () => {
    const { all_challenges } = useSelector((state: RootState) => state.challenge);
    const { user_auth } = useSelector((state:RootState)=>state.user);
    const [ currentSlideIndex , setCurrentSlideIndex ] = useState(0);
    const [ selectedProjectId, setSelectedProjectId ] = useState("");
    const [ manageMode, setManageMode ] = useState(projectManageViewState.EDIT);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllChallengesThunk());
    }, []);
    
    const fn = {
        setMode : (mode: projectManageViewState)=>{
            if(mode === projectManageViewState.INSERT){
                setManageMode(projectManageViewState.INSERT);
                setSelectedProjectId("");
            }
            else{
                setManageMode(projectManageViewState.EDIT);
            }
        }
    }

    const ui = {
        form : function(manageMode:projectManageViewState, challenge_id: string , challenges? : [ChallengeInterface]){
            if(!isNullOrUndefined(user_auth.data) && !isNullOrUndefined(user_auth.data.data)){
                if(!user_auth.data.data.is_authenticated){
                    return <ProjectNotAuthenticated/>;
                }
            }
            if(manageMode === projectManageViewState.EDIT){
                if(challenge_id === "" || isNullOrUndefined(challenges)){
                    return <ProjectDetailNotSelected/>
                }
                else{
                    const selectedChallenge = challenges.find( item=> item.id === challenge_id )
                    if(!isNullOrUndefined( selectedChallenge)){
                        return <ProjectDetail
                            data={ selectedChallenge }
                            onCancel={ ()=>{ 
                                setSelectedProjectId("");
                            } }
                        />
                    }
                    else{
                        // 오류가 있음
                        return <ProjectDetailNotSelected/>
                    }
                }
            }
            else{
                return <ProjectInsert
                    onComplete={
                        ()=>{
                            setSelectedProjectId("");
                            setManageMode(projectManageViewState.EDIT);
                        }
                    }
                    onCancel={ ()=>{ 
                        setSelectedProjectId("");
                        setManageMode(projectManageViewState.EDIT);
                    } }
                />
            }
        }
    }

    return (<div className="project-manage-container">
        <div className="project-manage-wrapper">
            <div className="project-manage-header">
                <p className="title">
                    프로젝트 관리 🛠
                </p>
                <p className="desc">
                    등록된 프로젝트를 관리합니다. 프로젝트의 추가 / 수정 / 삭제는 관리자 권한이 있는 정원사만 가능합니다.
                </p>
            </div>
            <div className="project-manage-content">
                <Carousel
                    withoutControls={true}
                    cellAlign={'left'}
                    slideWidth={'250px'}
                    cellSpacing={15}
                    disableEdgeSwiping={true}
                    slideIndex={ currentSlideIndex }
                    afterSlide={ slideIndex => setCurrentSlideIndex(slideIndex) }
                >
                    {
                        all_challenges.data?.data.map((challenge, idx) => {
                            return (
                                <ProjectListItem   
                                    key={ idx }
                                    index={ idx }
                                    challenge={challenge}
                                    selectedId={selectedProjectId}
                                    onSelect={(selectedId:any, selectedIndex:any)=>{
                                        setSelectedProjectId(selectedId);
                                        // setCurrentSlideIndex(selectedIndex);
                                        setManageMode(projectManageViewState.EDIT);
                                    }}
                                />
                            );
                        })
                    }
                    <div className="add-project-btn" onClick={ ()=>fn.setMode(projectManageViewState.INSERT) }>
                        <MdAddToPhotos/>
                    </div>
                </Carousel>


            </div>
        </div>
        <div className="project-detail-wrapper">
            {
                ui.form(
                    manageMode,
                    selectedProjectId,
                    all_challenges.data?.data
                )
            }
        </div>
    </div>);
}

export default ProjectManageView;
