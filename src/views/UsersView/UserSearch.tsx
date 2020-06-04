import React, {useState, useEffect} from 'react';
import { AnimatedTextInput } from '../../components';
import { getUsersSearchThunk, clearUsersSearchThunk } from '../../modules/user/';
import { useDispatch } from 'react-redux';

interface UserSearchProps{
    isSearched: boolean,
    onSearch : Function,
}

const UserSearch = (props:UserSearchProps)=>{
    const _dispatch = useDispatch();
    const [ keyword, setKeyword ] = useState("");
    
    const fn={
        search : function(){
            if(keyword.trim() === ""){
                alert("검색어를 입력해주세요");
                return;
            }
            _dispatch(getUsersSearchThunk(keyword));
            props.onSearch(true);
        },
        cancel : function(){
            _dispatch(clearUsersSearchThunk());
            setKeyword("");
            props.onSearch(false);
        }
    }

    return <div className="users-view-list-search-container">
        <AnimatedTextInput title="검색어" isDisabled={ props.isSearched } value={keyword} onChange={ setKeyword }/>
        {
            !props.isSearched ? 
            <button type="button" className="btn search" onClick={ fn.search } >검색</button> :
            <button type="button" className="btn cancel" onClick={ fn.cancel } >취소</button>
        }
    </div>
}

export default UserSearch;
