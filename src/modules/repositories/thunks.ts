import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { RepositoryAction } from './types'
import { getRepositoriesByUser } from '../../api/repo';
import { getRepositoriesByUserAsync } from './actions';

export function getRepositoriesByUserThunk(user_name:string): ThunkAction<void, RootState, null,RepositoryAction>{
    return async dispatch=>{
        const { request, success, failure } = getRepositoriesByUserAsync;
        dispatch(request());
        try{
            const response = await getRepositoriesByUser(user_name);
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