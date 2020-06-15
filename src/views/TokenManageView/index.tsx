/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { TextHeader, CustomButton } from '../../components';

import './scss/TokenManageView.scss';

import { getAdminTokens, generateAdminToken, disableAdminToken } from '../../api/admin';
import { IToken } from '../../api/interfaces/Tokens';
import { isNullOrUndefined } from 'util';
import moment from 'moment'; 


import { RootState} from '../../modules';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthThunk } from '../../modules/user';
import { useHistory } from 'react-router';

const TokenManageView = ()=>{
    const [ page , setPage ]  = useState(1);
    const [ prevBtnDisabled , setPrevBtnDisabled ] = useState(false);
    const [ nextBtnDisabled , setNextBtnDisabled ] = useState(false);
    const [ tokens , setTokens ] = useState<IToken[]>([]);
    const dispatch = useDispatch();
    const history = useHistory();

    const { data,loading } = useSelector((state:RootState)=>state.user.user_auth);

    const fn = {
        fetch : async (_page : number)=>{
            const result = await getAdminTokens(_page);
            if(result.code > 0){
                setPage(_page);
                // 버튼 관련 처리
                if(_page === 1){ setPrevBtnDisabled(true); }
                else{ setPrevBtnDisabled(false); }
                if(result.data.length > 0 ){
                    if(result.data.length < 10){ setNextBtnDisabled(true); }
                    else{ setNextBtnDisabled(false); }
                    
                }
                else{
                    setNextBtnDisabled(true);
                }

                setTokens(result.data);
            }
            else{
                console.log(result);
                window.alert(result.message);
                history.push("/");
            }
        },
        setDisable : async (token:string)=>{
            if(window.confirm("이 토큰을 비활성화할까요?")){
                const result = await disableAdminToken(token);
                if(result.code > 0){
                    await fn.fetch(1);   
                }
            }
        },
        isExpired : (expired_at : Date)=>{
            const mNow = moment();
            const mExpiredAt = moment(expired_at);
            
            if(mNow.diff(mExpiredAt) > 0){
                return true;
            }
            else{
                return false;
            }
        },
        generate :async ()=>{
            if(window.confirm("새로운 토큰을 생성할까요?")){
                const result = await generateAdminToken();
                if(result.code > 0){
                    await fn.fetch(1);
                }
            }
        }
    }

    useEffect(() => {
        if(!loading){
            if(!isNullOrUndefined(data) 
            && !isNullOrUndefined(data.data) 
            && !isNullOrUndefined(data.data.user)){
                if(data.data.user.is_admin === true){
                    fn.fetch(1);
                }
                else{
                    window.alert("관리자 권한이 필요합니다");
                    history.push("/");
                }
            }
            else if(!isNullOrUndefined(data)){
                if(data.code === 0){
                    window.alert("로그인이 필요합니다");
                    history.push("/");
                }
            }
        }

    }, [data, loading])

    useEffect(() => {
        if(isNullOrUndefined(data) || isNullOrUndefined(data.data)){
            dispatch(getUserAuthThunk());
        }
        return ()=>{
            setTokens([]);
        }
    }, []);

    return <div className="token-manage-view">
        <div className="token-manage-header">
            <TextHeader title="관리자 인증 토큰 관리" desc="관리자 권한 인가를 위한 인증 토큰을 관리합니다. 생성된 토큰을 확인하거나 비활성화 시킬 수 있습니다. 새로운 토큰을 생성할 수도 있습니다. 이 때 토큰은 1시간의 유효기간을 갖습니다."/>
            <CustomButton className="generate-btn" text="토큰 생성" onClick={ ()=>fn.generate() }/>
        </div>
        <div className="token-manage-container">
            <table className="token-manage-table">
                <thead>
                    <tr>
                        <th>토큰</th>
                        <th>만료 일자</th>
                        <th>생성 일자</th>
                        <th>수정 일자</th>
                        <th>사용자</th>
                        <th>생성자</th>
                        <th>처리</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tokens.map((token, idx)=>{
                            return <tr key={ idx }>
                                <td><p className={ fn.isExpired(token.expired_at) ? "expired-token" : "available-token" } >{ token.value }</p></td>
                                <td><p>{ moment(token.expired_at).format("YYYY-MM-DD HH:mm:ss") }</p></td>
                                <td><p>{ moment(token.created_at).format("YYYY-MM-DD HH:mm:ss") }</p></td>
                                <td><p>{ moment(token.updated_at).format("YYYY-MM-DD HH:mm:ss") }</p></td>
                                <td>
                                    { !isNullOrUndefined(token.used_by) && !isNullOrUndefined(token.used_by[0]) ? 
                                    <p>{ token.used_by[0].login }</p> : <p>-</p> }
                                </td>
                                <td>
                                    { !isNullOrUndefined(token.created_by) && !isNullOrUndefined(token.created_by[0]) ? 
                                    <p>{ token.created_by[0].login }</p> : <p>-</p> }
                                </td>
                                <td>
                                    {
                                        fn.isExpired(token.expired_at) ? 
                                        <p style={ { color: "#f44336" } }>만료됨</p> : 
                                        <div className="btns">
                                            <CustomButton className="disable-btn" text="비활성화" onClick={ ()=>fn.setDisable(token.value) }/>
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

export default TokenManageView;   