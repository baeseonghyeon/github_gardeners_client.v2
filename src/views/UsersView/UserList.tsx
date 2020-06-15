import React from 'react';
import { IUser } from '../../api/interfaces/User';
import { isNullOrUndefined } from 'util';
import { IUsersResponse } from '../../api/user';
import { isMobile, isTablet } from 'react-device-detect';

import { TextHeader, UserInfo } from '../../components';
import { useHistory } from 'react-router';

interface UserListItemProps{
    user: IUser,
}
const UserListItem = (props:UserListItemProps)=>{
    const history = useHistory();
    const _userInfoVertical = isMobile || isTablet;
    return <div className="users-list-item">
        <UserInfo isVertical={_userInfoVertical} id={props.user.id} avatar_url={props.user.avatar_url} user_name={props.user.name} login={props.user.login} />
        <button type="button" className="btn" onClick={ ()=>{
            history.push(
                `/users/${ props.user.login }`
            )
        } } >보기</button>
    </div>;
}

const EmptyUserListItem = ()=>{
    return <div className="not-searched-wrapper">
        <TextHeader  title="조회결과 없음 🧐" desc="조회된 정원사님이 없습니다. 검색어를 확인해주세요."/>
    </div>
}

interface UserListProps {
    isSearched : boolean,
    users : IUsersResponse | null,
    searched_users: IUsersResponse | null,
}
const UserList = (props:UserListProps)=>{
    return <div className="users-list-wrapper">
        {
            props.isSearched ? 
            (   
                !isNullOrUndefined(props.searched_users) && !isNullOrUndefined(props.searched_users.data) ? 
                (
                    props.searched_users.data.length > 0 ? 
                    props.searched_users.data.map(_user=>{
                        return <UserListItem user={ _user } key={_user.login}/>
                    }) :
                    (<EmptyUserListItem/>)    
                ) : 
                (<EmptyUserListItem/>)    
            ) : 
            (
                !isNullOrUndefined(props.users) && !isNullOrUndefined(props.users.data) ? 
                (
                    props.users.data.length > 0 ? 
                    props.users.data.map(_user=>{
                        return <UserListItem user={_user} key={_user.login} />
                    }) :
                    (<EmptyUserListItem/>)      
                ) : 
                (<EmptyUserListItem/>)    
            )
        }
    </div>;
}


export default UserList;