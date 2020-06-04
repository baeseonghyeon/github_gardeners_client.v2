import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { AnalyticsAction } from "./types";
import {
    getSummary,
    getAllAttendances,
    getLanguagesPopularity,
    getHottestRepository,
    getPopularRepository,
    getAllAttendancesByDates,
    getLatestChallengeAttendancesByUser
} from "../../api/analytics";
import {
    getSummaryAsync,
    getAllAttendancesAsync,
    getLanguagesPopularityAsync,
    getHottestRepositoryAsync,
    getPopularRepositoryAsync,
    getAllAttendancesByDatesAsync,
    getLatestChallengeAttendancesByUserAsync,
} from "./actions";

export function getSummaryThunk(): ThunkAction<
    void,
    RootState,
    null,
    AnalyticsAction
> {
    return async (dispatch) => {
        const { request, success, failure } = getSummaryAsync;
        dispatch(request());
        try {
            const summary = await getSummary();
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
export function getLanguagesPopularityThunk(): ThunkAction<
    void,
    RootState,
    null,
    AnalyticsAction
> {
    return async (dispatch) => {
        const { request, success, failure } = getLanguagesPopularityAsync;
        dispatch(request);
        try {
            const response = await getLanguagesPopularity();
            dispatch(success(response));
        } catch (e) {
            dispatch(failure(e));
        }
    };
}

export function getPopularRepositoryThunk(): ThunkAction<
    void,
    RootState,
    null,
    AnalyticsAction
> {
    return async (dispatch) => {
        const { request, success, failure } = getPopularRepositoryAsync;
        dispatch(request());
        try {
            const response = await getPopularRepository();
            dispatch(success(response));
        } catch (e) {
            dispatch(failure(e));
        }
    };
}

export function getHottestRepositoryThunk(): ThunkAction<
    void,
    RootState,
    null,
    AnalyticsAction
> {
    return async (dispatch) => {
        const { request, success, failure } = getHottestRepositoryAsync;
        dispatch(request());
        try {
            const response = await getHottestRepository();
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