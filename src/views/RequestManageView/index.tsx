/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { TextHeader, CustomButton } from '../../components';

import './scss/RequestManageView.scss';

import { getJoinRequests, acceptJoinRequest, rejectJoinRequest } from '../../api/admin';
import IChallenge from '../../api/interfaces/Challenge';

import RequestManageHeader from './RequestManageHeader';
import { IExtJoinRequest } from '../../api/interfaces/JoinRequest';
import { isNullOrUndefined } from 'util';
import moment from 'moment'; 
import { useHistory } from 'react-router';

const RequestManageView = ()=>{
    const [ page , setPage ]  = useState(1);
    const [ selectedChallenge, setSelectedChallenge ] = useState<IChallenge>();
    const [ requestItems , setRequestItems ] = useState<IExtJoinRequest[]>([]);
    const [ prevBtnDisabled , setPrevBtnDisabled ] = useState(false);
    const [ nextBtnDisabled , setNextBtnDisabled ] = useState(false);
    const history = useHistory();
    const fn = {
        fetch : async (page: number)=>{
            if(!isNullOrUndefined(selectedChallenge)){
                const result = await getJoinRequests(selectedChallenge.id , page);
                if(result.code > 0){
                    if(result.data.length > 0){
                        setPage(page);
                        setRequestItems(result.data);
                        if(page === 1){ setPrevBtnDisabled(true); }
                        else{
                            setPrevBtnDisabled(false);
                        }
                        if(result.data.length < 10){
                            setNextBtnDisabled(true);
                        }
                        else{
                            setNextBtnDisabled(false);
                        }
                    }
                    else{ setNextBtnDisabled(true); }
                }
                else if(result.code < 0){
                    window.alert(result.error.message);
                    history.push("/");
                }
            }
        },
        accept : async (login:string)=>{
            if(!isNullOrUndefined(selectedChallenge)){
                if(window.confirm("해당 정원사의 참여 요청을 승인 처리할까요?")){
                    const result = await acceptJoinRequest(selectedChallenge.id , login);
                    if(result.code > 0){
                        await fn.fetch(1);
                    }
                }
            }
        },
        reject : async (login:string)=>{
            if(!isNullOrUndefined(selectedChallenge)){
                if(window.confirm("해당 정원사의 참여 요청을 반려 처리할까요?")){
                    const result = await rejectJoinRequest(selectedChallenge.id , login);
                    if(result.code > 0){
                        await fn.fetch(1);
                    }
                }
            }
        }
    }

    useEffect(() => {
        if(!isNullOrUndefined(selectedChallenge)){
            fn.fetch(1);
        }
    }, [selectedChallenge]);

    return <div className="request-manage-view">
        <div className="request-manage-header">
            <TextHeader title="프로젝트 참여 신청 관리" desc="프로젝트 참여 신청 목록입니다. 참여 요청을 승인 혹은 반려 할 수 있습니다"/>
            <RequestManageHeader  selectedChallenge={ selectedChallenge } onChange={ setSelectedChallenge }/>
        </div>
        <div className="request-manage-container">
            <table className="request-manage-table">
                <thead>
                    <tr>
                        <th>신청자 명</th>
                        <th>프로젝트 명</th>
                        <th>신청 일자</th>
                        <th>승인 여부</th>
                        <th>처리</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        requestItems.map((item,idx)=>{
                            return <tr key={ idx }>
                                <td><p>{ item.user[0].name }</p></td>
                                <td><p>{ item.challenge[0].title }</p></td>
                                <td><p>{ moment(item.created_at).format("YYYY-MM-DD HH:mm:ss") }</p></td>
                                <td><p>{ item.is_expired ? ( item.is_accepted ? "승인됨" : "반려됨" ) : "대기중" }</p></td>
                                <td>
                                    {
                                        item.is_expired ? <p>만료됨</p> : 
                                        <div className="btns">
                                            <CustomButton className="accept-btn" text="승인" onClick={ ()=>fn.accept(item.user[0].login) }/>
                                            <CustomButton className="reject-btn" text="반려" onClick={ ()=>fn.reject(item.user[0].login) }/>
                                        </div>
                                    }
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <div className="page-controls">
                <p>현재 페이지 : { page }</p>
                <CustomButton className={ `paging-btn ${prevBtnDisabled ? "disabled" : ""}` } text="이전" onClick={ ()=>{ 
                    if(!prevBtnDisabled){
                        if(page > 0) {fn.fetch(page - 1) }
                    }
                } }/>
                <CustomButton className={ `paging-btn ${ nextBtnDisabled ? "disabled" : "" }`  } text="다음" onClick={ ()=>{ 
                    if(!nextBtnDisabled){
                        fn.fetch(page + 1) ;
                    }
                } } />
            </div>
        </div>
    </div>
}

export default RequestManageView;   