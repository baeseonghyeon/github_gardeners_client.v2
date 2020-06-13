import { createAsyncAction } from "typesafe-actions";
import GitFarmResponse from "../../api/interfaces/JSONReponse";
import {
    IUserResponse,
    IUsersResponse,
    IUserAuthReponse,
    IUsersInProjectReponse,
} from "../../api/user";
import { AxiosError } from "axios";

export const GET_USER_INFO = "user/GET_USER_INFO";
export const GET_USER_INFO_SUCCESS = "user/GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_ERROR = "user/GET_USER_INFO_ERROR";
export const CLEAR_USER_INFO = "user/CLEAR_USER_INFO";

export const GET_USERS_INFO = "user/GET_USERS_INFO";
export const GET_USERS_INFO_SUCCESS = "user/GET_USERS_INFO_SUCCESS";
export const GET_USERS_INFO_ERROR = "user/GET_USERS_INFO_ERROR";
export const CLEAR_USERS_INFO = "user/CLEAR_USERS_INFO";

export const GET_USERS_SEARCH = "user/GET_USERS_SEARCH";
export const GET_USERS_SEARCH_SUCCESS = "user/GET_USERS_SEARCH_SUCCESS";
export const GET_USERS_SEARCH_ERROR = "user/GET_USERS_SEARCH_ERROR";
export const CLEAR_USERS_SEARCH = "user/CLEAR_USERS_SEARCH";

export const GET_USER_AUTH = "user/GET_USER_AUTH";
export const GET_USER_AUTH_SUCCESS = "user/GET_USER_AUTH_SUCCESS";
export const GET_USER_AUTH_ERROR = "user/GET_USER_AUTH_ERROR";
export const CLEAR_USER_AUTH = "user/GET_USER_AUTH";

export const GET_USERS_IN_PROJECT= "user/GET_USERS_IN_PROJECT";
export const GET_USERS_IN_PROJECT_SUCCESS = "user/GET_USERS_IN_PROJECT_SUCCESS";
export const GET_USERS_IN_PROJECT_ERROR = "user/GET_USERS_IN_PROJECT_ERROR";
export const CLEAR_USERS_IN_PROJECT = "user/CLEAR_USERS_IN_PROJECT";

// 비동기 액션 생성
export const getUserInfoAsync = createAsyncAction(
    GET_USER_INFO,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_ERROR,
    CLEAR_USER_INFO
)<undefined, IUserResponse, AxiosError, undefined>();

export const getUsersInfoAsync = createAsyncAction(
    GET_USERS_INFO,
    GET_USERS_INFO_SUCCESS,
    GET_USERS_INFO_ERROR,
    CLEAR_USERS_INFO
)<undefined, IUsersResponse, AxiosError, undefined>();

export const getUsersSearchAsync = createAsyncAction(
    GET_USERS_SEARCH,
    GET_USERS_SEARCH_SUCCESS,
    GET_USERS_SEARCH_ERROR,
    CLEAR_USERS_SEARCH
)<undefined, IUsersResponse, AxiosError, undefined>();

export const getUserAuthAsync = createAsyncAction(
    GET_USER_AUTH,
    GET_USER_AUTH_SUCCESS,
    GET_USER_AUTH_ERROR,
    CLEAR_USER_AUTH
)<undefined, IUserAuthReponse, AxiosError, undefined>();


export const getUsersInProjectAsync = createAsyncAction(
    GET_USERS_IN_PROJECT,
    GET_USERS_IN_PROJECT_SUCCESS,
    GET_USERS_IN_PROJECT_ERROR,
    CLEAR_USERS_IN_PROJECT
)<undefined, IUsersInProjectReponse, AxiosError, undefined>();
