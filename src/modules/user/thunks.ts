import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { UserAction } from "./types";
import {
    getUserInfo,
    getUsersInfo,
    getUsersSearch,
    getUserAuth,
    getUsersInProject,
} from "../../api/user";
import {
    getUserInfoAsync,
    getUsersInfoAsync,
    getUsersSearchAsync,
    getUserAuthAsync,
    getUsersInProjectAsync,
} from "./actions";

export function getUserInfoThunk(
    user_name: string
): ThunkAction<void, RootState, null, UserAction> {
    return async (dispatch) => {
        const { request, success, failure } = getUserInfoAsync;
        dispatch(request());
        try {
            const userInfo = await getUserInfo(user_name);
            dispatch(success(userInfo));
        } catch (e) {
            dispatch(failure(e));
        }
    };
}

export function clearUserInfoThunk(): ThunkAction<
    void,
    RootState,
    null,
    UserAction
> {
    return (dispatch) => {
        const { cancel } = getUserInfoAsync;
        dispatch(cancel());
    };
}

export function getUsersInfoThunk(): ThunkAction<
    void,
    RootState,
    null,
    UserAction
> {
    return async (dispatch) => {
        const { request, success, failure } = getUsersInfoAsync;
        dispatch(request());
        try {
            const usersInfo = await getUsersInfo();
            dispatch(success(usersInfo));
        } catch (e) {
            dispatch(failure(e));
        }
    };
}

export function clearUsersInfoThunk(): ThunkAction<
    void,
    RootState,
    null,
    UserAction
> {
    return (dispatch) => {
        const { cancel } = getUsersInfoAsync;
        dispatch(cancel());
    };
}

export function getUsersSearchThunk(
    user_name: string
): ThunkAction<void, RootState, null, UserAction> {
    return async (dispatch) => {
        const { request, success, failure } = getUsersSearchAsync;
        dispatch(request());
        try {
            const response = await getUsersSearch(user_name);
            dispatch(success(response));
        } catch (e) {
            dispatch(failure(e));
        }
    };
}

export function clearUsersSearchThunk(): ThunkAction<
    void,
    RootState,
    null,
    UserAction
> {
    return (dispatch) => {
        const { cancel } = getUsersSearchAsync;
        dispatch(cancel());
    };
}

export function getUserAuthThunk(): ThunkAction<
    void,
    RootState,
    null,
    UserAction
> {
    return async (dispatch) => {
        const { request, success, failure } = getUserAuthAsync;
        dispatch(request());
        try {
            const response = await getUserAuth();
            dispatch(success(response));
        } catch (e) {
            dispatch(failure(e));
        }
    };
}
export function clearUserAuthThunk(): ThunkAction<
    void,
    RootState,
    null,
    UserAction
> {
    return async (dispatch) => {
        const { cancel } = getUserAuthAsync;
        dispatch(cancel());
    };
}

export function getUsersInProjectThunk(challenge_id : string) : ThunkAction<void, RootState, null, UserAction>{
    return async dispatch => {
        const { request, success, failure } = getUsersInProjectAsync;
        dispatch(request());
        try{
            const response = await getUsersInProject(challenge_id);
            dispatch(success(response));
        }
        catch(e){
            dispatch(failure(e));
        }
    }
}

export function clearUsersInProjectThunk() : ThunkAction<void, RootState, null, UserAction>{
    return dispatch => {
        const { cancel } = getUsersInProjectAsync;
        dispatch(cancel());
    }
}