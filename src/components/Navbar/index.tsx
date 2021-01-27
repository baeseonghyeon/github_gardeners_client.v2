/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './navbar.scss';

import { Logo } from '../';
import { MdAssessment, MdEventNote, MdInfo, MdFace, MdQueue, MdMenu, MdClose, MdVpnKey } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';
import { FiLogOut, FiLogIn } from 'react-icons/fi';
import { NavLink, Link } from 'react-router-dom';

import NavUserInfo from './NavUserInfo';

import { useHistory } from 'react-router';

import { getUserAuthThunk } from '../../modules/user/thunks';
import { RootState } from '../../modules';
import { useDispatch, useSelector } from 'react-redux';
import { isNullOrUndefined } from 'util';

// 로그인 정보 가져오기 
// 모바일 대응 
// 로그인 상태에 따라 다른 아이콘 처리
const Navbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const { user_auth } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    // 필요하면 추후 풀 것
    const history = useHistory();
    history.listen(() => {
        if (!isCollapsed) {
            setIsCollapsed(true);
        }
    });

    useEffect(() => {
        dispatch(getUserAuthThunk());
    }, []);

    return (
        <nav className={"navbar " + (isCollapsed ? "collapsed" : "")}>
            <div className="navbar-wrapper">
                <div className="navbar-header">
                    <button className="nav-open-btn" onClick={e => setIsCollapsed(false)}>
                        <MdMenu />
                    </button>
                    <div className="logo">
                        <a href="/">
                            <Logo width={40} height={40} />
                        </a>
                    </div>
                </div>
                <div className={"navbar-content-wrapper " + (isCollapsed ? "collapsed" : "")}>
                    <button type="button" className="nav-close-btn" onClick={e => setIsCollapsed(true)}>
                        <MdClose />
                    </button>
                    {
                        user_auth.data !== null && user_auth.data !== undefined && user_auth.data.data.is_authenticated ? <div className="navbar-content-header">
                            <NavUserInfo user={user_auth.data} />
                        </div> : <div className="navbar-content-header not-logined"></div >
                    }
                    <div className="navbar-content">
                        <ul className="menu-list">
                            <li className="menu-item ">
                                <NavLink className="menu-item-link" exact={true} activeClassName="active" to="/">
                                    <MdAssessment />
                                    <p className="menu-item-label">대시보드</p>
                                </NavLink>
                            </li>
                            <li className="menu-item">
                                <NavLink className="menu-item-link" activeClassName="active" to="/users">
                                    <MdFace />
                                    <p className="menu-item-label">정원사들</p>
                                </NavLink>
                            </li>
                            {
                                !isNullOrUndefined(user_auth.data) &&
                                    !isNullOrUndefined(user_auth.data.data) &&
                                    !isNullOrUndefined(user_auth.data.data.user) &&
                                    user_auth.data.data.user.is_admin === true ?
                                    <>
                                        <li className="menu-item">
                                            <NavLink className="menu-item-link" activeClassName="active" to="/projects">
                                                <MdEventNote />
                                                <p className="menu-item-label">프로젝트</p>
                                            </NavLink>
                                        </li>
                                        <li className="menu-item">
                                            <NavLink className="menu-item-link" activeClassName="active" to="/requests">
                                                <MdQueue />
                                                <p className="menu-item-label">등록 신청</p>
                                            </NavLink>
                                        </li>
                                        <li className="menu-item">
                                            <NavLink className="menu-item-link" activeClassName="active" to="/tokens">
                                                <MdVpnKey />
                                                <p className="menu-item-label">관리자 토큰 관리</p>
                                            </NavLink>
                                        </li>
                                    </>
                                    : <></>
                            }
                        </ul>
                    </div>
                    <div className="navbar-footer">
                        <ul className="info-list">
                            <li className="info-item">
                                <Link to="/info" className="info-item-link">
                                    <MdInfo />
                                </Link>
                            </li>
                            <li className="info-item">
                                <a href="http://github.com/YOOGOMJA/github_garden_mern" className="info-item-link" target="_blank" rel="noopener noreferrer">
                                    <FaGithub />
                                </a>
                            </li>
                            <li className="info-item">
                                {
                                    (!isNullOrUndefined(user_auth.data) && !isNullOrUndefined(user_auth.data.data) && user_auth.data.data.is_authenticated) ?
                                        <a href="/auth/logout" className="info-item-link logout">
                                            <FiLogOut />
                                        </a> :
                                        <a href="/auth" className="info-item-link login">
                                            <FiLogIn />
                                        </a>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;