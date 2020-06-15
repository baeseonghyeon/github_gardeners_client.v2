/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import './scss/UserAdminAuthView.scss';

import { setAdminToken } from '../../api/admin';
import { RootState } from '../../modules';
import { useDispatch, useSelector } from 'react-redux';
import { isNullOrUndefined } from 'util';
import { useHistory } from 'react-router';
import { getUserAuthThunk } from '../../modules/user';
import { TextHeader, AnimatedTextInput, CustomButton } from '../../components';


const UserAdminAuthView = () => {
    const { data } = useSelector((state: RootState) => state.user.user_auth);
    const history = useHistory();
    const [inputToken, setInputToken] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        if (isNullOrUndefined(data) || isNullOrUndefined(data.data)) {
            dispatch(getUserAuthThunk());
        }

        if (!isNullOrUndefined(data)
            && !isNullOrUndefined(data.data)
            && !data.data.is_authenticated) {
            alert("로그인이 필요합니다");
            history.push("/");
        }
    }, [data]);

    const fn = {
        request: async () => {
            if (inputToken.length === 0) {
                alert("토큰을 입력해주세요");
            }
            else {
                const result = await setAdminToken(inputToken);
                if (result.code > 0) {
                    alert("정상처리 되었습니다");
                    history.push("/");
                }
                else {
                    alert(result.error.message);

                }
            }
        }
    }

    return <div className="admin-request-form">
        <TextHeader className="admin-request-header" title="관리자 권한 요청" desc="기존의 관리자가 발급한 토큰을 이용해 관리자 권한을 얻습니다" />
        <div className="admin-request-wrapper">
            <AnimatedTextInput title="토큰" value={inputToken} onChange={setInputToken} />
        </div>
        <CustomButton text="요청" onClick={() => fn.request() } />
    </div>
}

export default UserAdminAuthView;
