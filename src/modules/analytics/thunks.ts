import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { AnalyticsAction } from "./types";
import {
    getSummary,
    getAllAttendances,
    getLanguagesPopularity,
    getAllAttendancesByDates,
    getLatestChallengeAttendancesByUser,
    getLangPopularity,
    getAttendancesByUser
} from "../../api/analytics";
import {
    getSummaryAsync,
    getAllAttendancesAsync,
    getLanguagesPopularityAsync,
    getAllAttendancesByDatesAsync,
    getLatestChallengeAttendancesByUserAsync,
    getLangPopularityByUserAsync,
    getAttendancesByUserAsync,
} from "./actions";

export function getSummaryThunk(challenge_id : string): ThunkAction<
    void,
    RootState,
    null,
    AnalyticsAction
> {
    return async (dispatch) => {
        const { request, success, failure } = getSummaryAsync;
        dispatch(request());
        try {
            const summary = await getSummary(challenge_id);
            dispatch(success(summary));
        } catch (e) {
            dispatch(failure(e));
        }
    };
}

export function getAllAttendancesThunk(): ThunkAction<
    void,
    RootState,
    null,
    AnalyticsAction
> {
    return async (dispatch) => {
        const { request, success, failure } = getAllAttendancesAsync;
        dispatch(request());
        try {
            const all_attendances = await getAllAttendances();
            dispatch(success(all_attendances));
        } catch (e) {
            dispatch(failure(e));
        }
    };
}

export function getAllAttendancesByDatesThunk(): ThunkAction<
    void,
    RootState,
    null,
    AnalyticsAction
> {
    return async dispatch=>{
        const { request, success, failure } = getAllAttendancesByDatesAsync;
        dispatch(request());
        try{
            const response = await getAllAttendancesByDates();
            dispatch(success(response));
        }
        catch (e){
            dispatch(failure(e));
        }
    }
}
export function getLanguagesPopularityThunk(challenge_id:string): ThunkAction<
    void,
    RootState,
    null,
    AnalyticsAction
> {
    return async (dispatch) => {
        const { request, success, failure } = getLanguagesPopularityAsync;
        dispatch(request);
        try {
            const response = await getLangPopularity({ challenge_id : challenge_id });
            dispatch(success(response));
        } catch (e) {
            dispatch(failure(e));
        }
    };
}

export function getLatestChallengeAttendancesByUserThunk(user_name:string): ThunkAction<
void, RootState, null, AnalyticsAction>{
    return async dispatch=>{
        const { request, success, failure } = getLatestChallengeAttendancesByUserAsync;
        dispatch(request());
        try{
            const res = await getLatestChallengeAttendancesByUser(user_name);
            dispatch(success(res));
        }
        catch(e){
            dispatch(failure(e));
        }
    }
}

export function clearLatestChallengeAttendancesByUserThunk():ThunkAction<void, RootState, null, AnalyticsAction>{
    return dispatch=>{
        const { cancel } = getLatestChallengeAttendancesByUserAsync;
        dispatch(cancel());
    }
}

export function getLangPopularityByUserThunk(challenge_id:string, user_name:string): ThunkAction<
void, RootState, null, AnalyticsAction>{
    return async dispatch=>{
        const { request, success, failure } = getLangPopularityByUserAsync;
        dispatch(request());
        try{
            const res = await getLangPopularity({ login: user_name, challenge_id: challenge_id });
            dispatch(success(res));
        }
        catch(e){
            dispatch(failure(e));
        }
    }
}

export function clearLangPopularityByUserThunk(): ThunkAction<
void, RootState, null, AnalyticsAction>{
    return dispatch=>{
        const { cancel } = getLangPopularityByUserAsync;
        dispatch(cancel());
    }
}

export function getAttendancesByUserThunk(challenge_id:string, user_name:string): ThunkAction<
void, RootState, null, AnalyticsAction>{
    return async dispatch=>{
        const { request, success, failure } = getAttendancesByUserAsync;
        dispatch(request());
        try{
            const res = await getAttendancesByUser(challenge_id, user_name);
            dispatch(success(res));
        }
        catch(e){
            dispatch(failure(e));
        }
    }
}

export function clearAttendancesByUserThunk(): ThunkAction<
void, RootState, null, AnalyticsAction>{
    return dispatch=>{
        const { cancel } = getAttendancesByUserAsync;
        dispatch(cancel());
    }
}

