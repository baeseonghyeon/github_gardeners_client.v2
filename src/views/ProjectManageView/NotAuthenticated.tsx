import React from 'react';

const NotAuthenticated = ()=>{
    return <div className="project-not-selected">
        <p className="title">
            관리 권한이 없습니다 🧐
        </p>
        <p className="desc">
            관리 권한이 있는 정원사분들이 수정할 수 있습니다. 로그인 혹은 권한을 확인해주세요
        </p>
    </div>;
}

export default NotAuthenticated;