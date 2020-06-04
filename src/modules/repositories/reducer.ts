import {createReducer } from 'typesafe-actions';
import { RepositoryAction, RepositoryState } from './types';
import {
    GET_REPOSITORIES_BY_USER,
    GET_REPOSITORIES_BY_USER_CLEAR,
    GET_REPOSITORIES_BY_USER_ERROR,
    GET_REPOSITORIES_BY_USER_SUCCESS,
} from './actions';

const initialState: RepositoryState = {
    repos_by_user:{
        loading: false,
        error : null,
        data: null,
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
    })
});

export default repo;