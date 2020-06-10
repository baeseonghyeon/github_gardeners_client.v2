import { createReducer } from "typesafe-actions";
import { ChallengeAction, ChallengeState } from "./types";
import {
    GET_ALL_CHALLENGES,
    GET_ALL_CHALLENGES_SUCCESS,
    GET_ALL_CHALLENGES_ERROR,
    CLEAR_ALL_CHALLENGES,
    GET_CHALLENGES_BY_USER,
    GET_CHALLENGES_BY_USER_SUCCESS,
    GET_CHALLENGES_BY_USER_ERROR,
    CLEAR_CHALLENGES_BY_USER,
    GET_LATEST_CHALLENGE,
    GET_LATEST_CHALLENGE_SUCCESS,
    GET_LATEST_CHALLENGE_ERROR,
    CLEAR_LATEST_CHALLENGE,
    GET_ACTIVE_CHALLENGES,
    GET_ACTIVE_CHALLENGES_SUCCESS,
    GET_ACTIVE_CHALLENGES_ERROR,
    CLEAR_ACTIVE_CHALLENGES
} from "./actions";

const initialState: ChallengeState = {
    all_challenges: {
        loading: false,
        error: null,
        data : null,
    },
    challenges_by_user:{
        loading: false,
        error: null,
        data: null,
    },
    latest_challenge:{
        loading: false,
        error:null,
        data:null,
    },
    active_challenges : {
        loading: false,
        error:null,
        data:null,
    }
}

const challenge = createReducer<ChallengeState, ChallengeAction>(initialState, {
    [GET_ALL_CHALLENGES]: (state)=>({
        ...state,
        all_challenges:{
            loading: true,
            error : null,
            data: null,
        }
    }),
    [GET_ALL_CHALLENGES_SUCCESS]: (state, action)=>({
        ...state,
        all_challenges:{
            loading: false,
            error: null,
            data: action.payload
        }
    }),
    [GET_ALL_CHALLENGES_ERROR]: (state, action)=>({
        ...state,
        all_challenges: {
            loading: false,
            error: action.payload,
            data: null,
        }
    }),
    [CLEAR_ALL_CHALLENGES]:(state)=>({
        ...state,
        all_challenges:{
            ...initialState.all_challenges
        }
    }),
    [GET_CHALLENGES_BY_USER]: (state, action)=>({
        ...state,
        challenges_by_user:{
            loading: true,
            error: null,
            data: null,
        }
    }),
    [GET_CHALLENGES_BY_USER_SUCCESS]:(state, action)=>({
        ...state,
        challenges_by_user:{
            loading:false,
            error:null,
            data: action.payload
        }
    }),
    [GET_CHALLENGES_BY_USER_ERROR]:(state, action)=>({
        ...state,
        challenges_by_user:{
            loading: false,
            error: action.payload,
            data: null,
        }
    }),
    [CLEAR_CHALLENGES_BY_USER]:(state, action)=>({
        ...state,
        challenges_by_user:{
            ...initialState.challenges_by_user
        }
    }),
    [GET_LATEST_CHALLENGE]:(state)=>({
        ...state,
        latest_challenge: {
            loading: true,
            error: null,
            data: null,
        }
    }),
    [GET_LATEST_CHALLENGE_SUCCESS]:(state,action)=>({
        ...state,
        latest_challenge:{
            loading: false,
            error: null,
            data: action.payload
        }
    }),
    [GET_LATEST_CHALLENGE_ERROR]:(state,action)=>({
        ...state,
        latest_challenge:{
            loading:false,
            error: action.payload,
            data:null,
        }
    }),
    [CLEAR_LATEST_CHALLENGE]:(state)=>({
        ...state,
        latest_challenge:{
            ...initialState.latest_challenge
        }
    }),
    [GET_ACTIVE_CHALLENGES] : (state)=>({
        ...state,
        active_challenges : {
            loading : true,
            data : null,
            error : null,
        }
    }),
    [GET_ACTIVE_CHALLENGES_SUCCESS] : (state, action)=>({
        ...state,
        active_challenges : {
            loading : false,
            data : action.payload,
            error : null
        }
    }),
    [GET_ACTIVE_CHALLENGES_ERROR] : (state, action)=>({
        ...state,
        active_challenges : {
            loading : false,
            data : null,
            error : action.payload
        }
    }),
    [CLEAR_ACTIVE_CHALLENGES] : (state)=>({
        ...state,
        active_challenges : {
            ...initialState.active_challenges
        }
    })
});

export default challenge;