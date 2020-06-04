import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { RepositoryAction } from './types'
import { getEvents, getEventsByUser } from '../../api/event';
import { getEventsAsync, getEventsByUserAsync } from './actions';

export function getEventsThunk(page?:number): ThunkAction<void, RootState, null,RepositoryAction>{
    return async dispatch=>{
        const { request, success, failure } = getEventsAsync;
        dispatch(request());
        try{
            const response = await getEvents(page);
            dispatch(success(response));
        }
        catch(e){
            dispatch(failure(e));
        }
    }
}

export function clearEventsThunk():ThunkAction<void, RootState, null, RepositoryAction>{
    return dispatch=>{
        const { cancel } = getEventsAsync;
        dispatch(cancel());
    }
}


export function getEventsByUserThunk(user_name:string,page:number): ThunkAction<void, RootState, null,RepositoryAction>{
    return async dispatch=>{
        const { request, success, failure } = getEventsByUserAsync;
        dispatch(request());
        try{
            const response = await getEventsByUser(user_name,page);
            dispatch(success(response));
        }
        catch(e){
            dispatch(failure(e));
        }
    }
}

export function clearEventsByUserThunk():ThunkAction<void, RootState, null, RepositoryAction>{
    return dispatch=>{
        const { cancel } = getEventsByUserAsync;
        dispatch(cancel());
    }
}