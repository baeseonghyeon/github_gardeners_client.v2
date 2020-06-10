import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { RepositoryAction } from './types'
import { getRepositoriesByUser,getHottestRepo,getHottestRepoInProjectByUser,getPopularRepo} from '../../api/repo';
import { getRepositoriesByUserAsync, getHottestRepoInProjectByUserAsync, getPopularRepoAsync, getHottestRepoAsync } from './actions';

export function getRepositoriesByUserThunk(user_name:string, page: number = 1): ThunkAction<void, RootState, null,RepositoryAction>{
    return async dispatch=>{
        const { request, success, failure } = getRepositoriesByUserAsync;
        dispatch(request());
        try{
            const response = await getRepositoriesByUser(user_name, page);
            dispatch(success(response));
        }
        catch(e){
            dispatch(failure(e));
        }
    }
}

export function clearRepositoriesByUserThunk():ThunkAction<void, RootState, null, RepositoryAction>{
    return dispatch=>{
        const { cancel } = getRepositoriesByUserAsync;
        dispatch(cancel());
    }
}

export function getHottestRepoInProjectByUserThunk(challenge_id:string,user_name:string): ThunkAction<void, RootState, null,RepositoryAction>{
    return async dispatch=>{
        const { request, success, failure } = getHottestRepoInProjectByUserAsync;
        dispatch(request());
        try{
            const response = await getHottestRepoInProjectByUser(challenge_id,user_name);
            dispatch(success(response));
        }
        catch(e){
            dispatch(failure(e));
        }
    }
}

export function clearHottestRepoInProjectByUserThunk():ThunkAction<void, RootState, null, RepositoryAction>{
    return dispatch=>{
        const { cancel } = getHottestRepoInProjectByUserAsync;
        dispatch(cancel());
    }
}


export function getHottestRepoThunk(challenge_id:string): ThunkAction<void, RootState, null,RepositoryAction>{
    return async dispatch=>{
        const { request, success, failure } = getHottestRepoAsync;
        dispatch(request());
        try{
            const response = await getHottestRepo(challenge_id);
            dispatch(success(response));
        }
        catch(e){
            dispatch(failure(e));
        }
    }
}

export function clearHottestRepoThunk():ThunkAction<void, RootState, null, RepositoryAction>{
    return dispatch=>{
        const { cancel } = getHottestRepoAsync;
        dispatch(cancel());
    }
}

export function getPopularRepoThunk(challenge_id:string): ThunkAction<void, RootState, null,RepositoryAction>{
    return async dispatch=>{
        const { request, success, failure } = getPopularRepoAsync;
        dispatch(request());
        try{
            const response = await getPopularRepo(challenge_id);
            dispatch(success(response));
        }
        catch(e){
            dispatch(failure(e));
        }
    }
}
