import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { ChallengeAction } from './types';
import { getAllChallenges, getChallengesByUser, getLatestChallenge, getAllActiveChallenges } from '../../api/challenge';
import { getAllChallengesAsync, getChallengesByUserAsync, getLatestChallengeAsync, getActiveChallengesAsync } from './actions';

export function getAllChallengesThunk():ThunkAction<void, RootState, null, ChallengeAction>{
    return async dispatch=>{
        const {request, success, failure} = getAllChallengesAsync;
        dispatch(request());
        try{
            const response = await getAllChallenges();
            dispatch(success(response));
        }
        catch(e){
            dispatch(failure(e));
        }
    }
}

export function clearAllChallengesThunk():ThunkAction<void, RootState, null, ChallengeAction>{
    return async dispatch=>{
        const { cancel } = getAllChallengesAsync;
        dispatch(cancel());
    }
}

export function getChallengesByUserThunk(user_name:string):ThunkAction<void, RootState, null, ChallengeAction>{
    return async dispatch=>{
        const { request, success, failure } = getChallengesByUserAsync;
        dispatch(request());
        try{
            const response = await getChallengesByUser(user_name);
            dispatch(success(response));
        }
        catch(e){
            dispatch(failure(e));
        }
    }
}

export function clearChallengesByUserThunk():ThunkAction<void, RootState, null, ChallengeAction>{
    return dispatch=>{
        const {cancel}= getChallengesByUserAsync;
        dispatch(cancel());
    }
}

export function getLatestChallengeThunk():ThunkAction<void, RootState, null, ChallengeAction>{
    return async dispatch =>{
        const { request, success, failure } = getLatestChallengeAsync;
        dispatch(request());
        try{
            const response = await getLatestChallenge();
            dispatch(success(response))
        }
        catch(e){
            dispatch(failure(e));
        }
    }
}



export function getActiveChallengesThunk():ThunkAction<void, RootState, null, ChallengeAction>{
    return async dispatch=>{
        const {request, success, failure} = getActiveChallengesAsync;
        dispatch(request());
        try{
            const response = await getAllActiveChallenges();
            dispatch(success(response));
        }
        catch(e){
            dispatch(failure(e));
        }
    }
}

export function clearActiveChallengesThunk():ThunkAction<void, RootState, null, ChallengeAction>{
    return async dispatch=>{
        const { cancel } = getActiveChallengesAsync;
        dispatch(cancel());
    }
}