import {createReducer } from 'typesafe-actions';
import { RepositoryAction, RepositoryState } from './types';
import {
    GET_EVENTS,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_ERROR,
    GET_EVENTS_CLEAR,
    GET_EVENTS_BY_USER,
    GET_EVENTS_BY_USER_SUCCESS,
    GET_EVENTS_BY_USER_ERROR,
    GET_EVENTS_BY_USER_CLEAR,
} from './actions';

const initialState: RepositoryState = {
    events:{
        loading: false,
        error : null,
        data: null,
    },
    events_by_user:{
        loading: false,
        error : null,
        data: null,
    }
}

const repo = createReducer<RepositoryState, RepositoryAction>(initialState, {
    [GET_EVENTS]: (state)=>({
        ...state,
        events:{
            loading:true,
            error:null,
            data:null,
        }
    }),
    [GET_EVENTS_SUCCESS]:(state,action)=>({
        ...state,
        events:{
            loading:false,
            error:null,
            data:action.payload
        }
    }),
    [GET_EVENTS_ERROR]: (state,action)=>({
        ...state,
        events:{
            loading:false,
            error:action.payload,
            data:null,
        }
    }),
    [GET_EVENTS_CLEAR]:(state)=>({
        ...state,
        events:{ ...initialState.events }
    }),
    [GET_EVENTS_BY_USER]: (state)=>({
        ...state,
        events_by_user:{
            loading:true,
            error:null,
            data:null,
        }
    }),
    [GET_EVENTS_BY_USER_SUCCESS]:(state,action)=>({
        ...state,
        events_by_user:{
            loading:false,
            error:null,
            data:action.payload
        }
    }),
    [GET_EVENTS_BY_USER_ERROR]: (state,action)=>({
        ...state,
        events_by_user:{
            loading:false,
            error:action.payload,
            data:null,
        }
    }),
    [GET_EVENTS_BY_USER_CLEAR]:(state)=>({
        ...state,
        events_by_user:{ ...initialState.events_by_user }
    }),
});

export default repo;