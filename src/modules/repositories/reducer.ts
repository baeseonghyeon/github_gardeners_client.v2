import {createReducer } from 'typesafe-actions';
import { RepositoryAction, RepositoryState } from './types';
import {
    GET_REPOSITORIES_BY_USER,
    GET_REPOSITORIES_BY_USER_CLEAR,
    GET_REPOSITORIES_BY_USER_ERROR,
    GET_REPOSITORIES_BY_USER_SUCCESS,
    GET_HOTTEST_REPO_BY_USER,
    GET_HOTTEST_REPO_BY_USER_SUCCESS,
    GET_HOTTEST_REPO_BY_USER_ERROR,
    CLEAR_HOTTEST_REPO_BY_USER,
    GET_HOTTEST_REPO,
    GET_HOTTEST_REPO_SUCCESS,
    GET_HOTTEST_REPO_ERROR,
    CLEAR_HOTTEST_REPO,
    GET_POPULAR_REPO,
    GET_POPULAR_REPO_SUCCESS,
    GET_POPULAR_REPO_ERROR,
    CLEAR_POPULAR_REPO,

} from './actions';

const initialState: RepositoryState = {
    repos_by_user:{
        loading: false,
        error : null,
        data: null,
    },
    hottest_in_project_by_user : {
        loading : false,
        error : null,
        data : null,
    },
    hottest : {
        loading : false,
        error : null,
        data : null,
    },
    popular : {
        loading : false,
        error : null,
        data : null,
    }
}

const repo = createReducer<RepositoryState, RepositoryAction>(initialState, {
    [GET_REPOSITORIES_BY_USER]: (state)=>({
        ...state,
        repos_by_user:{
            loading:true,
            error:null,
            data:null,
        }
    }),
    [GET_REPOSITORIES_BY_USER_SUCCESS]:(state,action)=>({
        ...state,
        repos_by_user:{
            loading:false,
            error:null,
            data:action.payload
        }
    }),
    [GET_REPOSITORIES_BY_USER_ERROR]: (state,action)=>({
        ...state,
        repos_by_user:{
            loading:false,
            error:action.payload,
            data:null,
        }
    }),
    [GET_REPOSITORIES_BY_USER_CLEAR]:(state)=>({
        ...state,
        repos_by_user:{ ...initialState.repos_by_user }
    }),
    [GET_HOTTEST_REPO_BY_USER]:(state)=>({
        ...state,
        hottest_in_project_by_user : {
            loading : true,
            error : null,
            data : null,
        }
    }),
    [GET_HOTTEST_REPO_BY_USER_SUCCESS]:(state,action)=>({
        ...state,
        hottest_in_project_by_user : {
            loading : false,
            error : null,
            data : action.payload,
        }
    }),
    [GET_HOTTEST_REPO_BY_USER_ERROR]:(state,action)=>({
        ...state,
        hottest_in_project_by_user : {
            loading : false,
            error : action.payload,
            data : null,
        }
    }),
    [CLEAR_HOTTEST_REPO_BY_USER]:(state)=>({
        ...state,
        hottest_in_project_by_user : {
            loading: false,
            error : null,
            data : null,
        }
    }),
    [GET_HOTTEST_REPO]:(state)=>({
        ...state,
        hottest : {
            loading : true,
            error : null,
            data : null,
        }
    }),
    [GET_HOTTEST_REPO_SUCCESS]:(state,action)=>({
        ...state,
        hottest : {
            loading : false,
            error : null,
            data : action.payload,
        }
    }),
    [GET_HOTTEST_REPO_ERROR]:(state,action)=>({
        ...state,
        hottest : {
            loading : false,
            error : action.payload,
            data : null,
        }
    }),
    [CLEAR_HOTTEST_REPO]:(state)=>({
        ...state,
        hottest : {
            loading: false,
            error : null,
            data : null,
        }
    }),
    [GET_POPULAR_REPO]:(state)=>({
        ...state,
        popular : {
            loading : true,
            error : null,
            data : null,
        }
    }),
    [GET_POPULAR_REPO_SUCCESS]:(state,action)=>({
        ...state,
        popular : {
            loading : false,
            error : null,
            data : action.payload,
        }
    }),
    [GET_POPULAR_REPO_ERROR]:(state,action)=>({
        ...state,
        popular : {
            loading : false,
            error : action.payload,
            data : null,
        }
    }),
    [CLEAR_POPULAR_REPO]:(state)=>({
        ...state,
        popular : {
            loading: false,
            error : null,
            data : null,
        }
    }),
});

export default repo;