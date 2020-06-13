import { createReducer } from "typesafe-actions";
import { UserState, UserAction } from "./types";
import {
    GET_USER_INFO,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_ERROR,
    GET_USERS_INFO,
    GET_USERS_INFO_SUCCESS,
    GET_USERS_INFO_ERROR,

    CLEAR_USER_INFO,
    CLEAR_USERS_INFO,
    
    GET_USERS_SEARCH,
    GET_USERS_SEARCH_SUCCESS,
    GET_USERS_SEARCH_ERROR,
    CLEAR_USERS_SEARCH,
    GET_USER_AUTH,
    GET_USER_AUTH_SUCCESS,
    GET_USER_AUTH_ERROR,
    CLEAR_USER_AUTH,
    GET_USERS_IN_PROJECT,
    GET_USERS_IN_PROJECT_SUCCESS,
    GET_USERS_IN_PROJECT_ERROR,
    CLEAR_USERS_IN_PROJECT,

} from "./actions";

const initialState: UserState = {
    user: {
        loading: false,
        error: null,
        data: null,
    },
    users: {
        loading: false,
        error: null,
        data: null,
    },
    searched_users:{
        loading: false,
        error: null,
        data: null,
    },
    user_auth:{
        loading: false,
        error : null,
        data : null,
    },
    users_in_project:{
        loading: false,
        error : null,
        data : null,
    },
    
};

const user = createReducer<UserState, UserAction>(initialState, {
    [GET_USER_INFO]: (state) => ({
        ...state,
        user: {
            loading: true,
            error: null,
            data: null,
        },
    }),
    [GET_USER_INFO_SUCCESS]: (state, action) => ({
        ...state,
        user: {
            loading: false,
            error: null,
            data: action.payload,
        },
    }),
    [GET_USER_INFO_ERROR]: (state, action) => ({
        ...state,
        user: {
            loading: false,
            error: action.payload,
            data: null,
        },
    }),
    [CLEAR_USER_INFO]: (state: any) => ({
        ...state,
        user: {...initialState.user},
    }),
    // 모든 사용자 정보
    [GET_USERS_INFO]: (state) => ({
        ...state,
        user: {
            loading: true,
            error: null,
            data: null,
        },
    }),
    [GET_USERS_INFO_SUCCESS]: (state, action) => ({
        ...state,
        users: {
            loading: false,
            error: null,
            data: action.payload,
        },
    }),
    [GET_USERS_INFO_ERROR]: (state, action) => ({
        ...state,
        users: {
            loading: false,
            error: action.payload,
            data: null,
        },
    }),
    [CLEAR_USERS_INFO]: (state:any)=>({
        ...state,
        users:{...initialState.users}
    }),
    // 사용자 검색하기
    [GET_USERS_SEARCH]: (state) => ({
        ...state,
        searched_users: {
            loading: true,
            error: null,
            data: null,
        },
    }),
    [GET_USERS_SEARCH_SUCCESS]: (state, action) => ({
        ...state,
        searched_users: {
            loading: false,
            error: null,
            data: action.payload,
        },
    }),
    [GET_USERS_SEARCH_ERROR]: (state, action) => ({
        ...state,
        searched_users: {
            loading: false,
            error: action.payload,
            data: null,
        },
    }),
    [CLEAR_USERS_SEARCH]: (state:any)=>({
        ...state,
        searched_users : {
            ...initialState.searched_users
        }
    }),
    // 사용자 로그인 상태 
    [GET_USER_AUTH]: (state) => ({
        ...state,
        user_auth: {
            loading: true,
            error: null,
            data: null,
        },
    }),
    [GET_USER_AUTH_SUCCESS]: (state, action) => ({
        ...state,
        user_auth: {
            loading: false,
            error: null,
            data: action.payload,
        },
    }),
    [GET_USER_AUTH_ERROR]: (state, action) => ({
        ...state,
        user_auth: {
            loading: false,
            error: action.payload,
            data: null,
        },
    }),
    [CLEAR_USER_AUTH]: (state:any)=>({
        ...state,
        user_auth : {
            ...initialState.user_auth
        }
    }),
    [GET_USERS_IN_PROJECT]: (state) => ({
        ...state,
        users_in_project: {
            loading: true,
            error: null,
            data: null,
        },
    }),
    [GET_USERS_IN_PROJECT_SUCCESS]: (state, action) => ({
        ...state,
        users_in_project: {
            loading: false,
            error: null,
            data: action.payload,
        },
    }),
    [GET_USERS_IN_PROJECT_ERROR]: (state, action) => ({
        ...state,
        users_in_project: {
            loading: false,
            error: action.payload,
            data: null,
        },
    }),
    [CLEAR_USERS_IN_PROJECT]: (state:any)=>({
        ...state,
        users_in_project : {
            ...initialState.users_in_project
        }
    }),
});

export default user;
