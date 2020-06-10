import { createAsyncAction } from "typesafe-actions";
import {
    ISummaryResponse,
    IAllAttendancesResponse,
    ILanguagesResponse,
    IAllAttendancesByDatesResponse,
    ILatestChallengeAttendancesByUserResponse,
    IAttendancesInChallengeByUserResponse
} from "../../api/analytics";
import { AxiosError } from "axios";

export const GET_SUMMARY = "analytics/GET_SUMMARY";
export const GET_SUMMARY_SUCCESS = "analytics/GET_SUMMARY_SUCCESS";
export const GET_SUMMARY_ERROR = "analytics/GET_SUMMARY_ERROR";

export const GET_ALL_ATTENDANCES = "analytics/GET_ALL_ATTENDANCES";
export const GET_ALL_ATTENDANCES_SUCCESS =
    "analytics/GET_ALL_ATTENDANCES_SUCCESS";
export const GET_ALL_ATTENDANCES_ERROR = "analytics/GET_ALL_ATTENDANCES_ERROR";

export const GET_ALL_ATTENDANCES_BY_DATES =
    "analytics/GET_ALL_ATTENDANCES_BY_DATES";
export const GET_ALL_ATTENDANCES_BY_DATES_SUCCESS =
    "analytics/GET_ALL_ATTENDANCES_BY_DATES_SUCCESS";
export const GET_ALL_ATTENDANCES_BY_DATES_ERROR =
    "analytics/GET_ALL_ATTENDANCES_BY_DATES_ERROR";

export const GET_LANGUAGES_POPULARITY = "analytics/GET_LANGUAGES_POPULARITY";
export const GET_LANGUAGES_POPULARITY_SUCCESS =
    "analytics/GET_LANGUAGES_POPULARITY_SUCCESS";
export const GET_LANGUAGES_POPULARITY_ERROR =
    "analytics/GET_LANGUAGES_POPULARITY_ERROR";

export const GET_LATEST_CHALLENGE_ATTENDANCES_BY_USER =
    "analytics/GET_LATEST_CHALLENGE_ATTENDANCES_BY_USER";
export const GET_LATEST_CHALLENGE_ATTENDANCES_BY_USER_SUCCESS =
    "analytics/GET_LATEST_CHALLENGE_ATTENDANCES_BY_USER_SUCCESS";
export const GET_LATEST_CHALLENGE_ATTENDANCES_BY_USER_ERROR =
    "analytics/GET_LATEST_CHALLENGE_ATTENDANCES_BY_USER_ERROR";
export const CLEAR_LATEST_CHALLENGE_ATTENDANCES_BY_USER =
    "analytics/CLEAR_LATEST_CHALLENGE_ATTENDANCES_BY_USER";


export const GET_LANG_POPULARITY_BY_USER = "analytics/GET_LANG_POPULARITY_BY_USER";
export const GET_LANG_POPULARITY_BY_USER_SUCCESS = "analytics/GET_LANG_POPULARITY_BY_USER_SUCCESS";
export const GET_LANG_POPULARITY_BY_USER_ERROR = "analytics/GET_LANG_POPULARITY_BY_USER_ERROR";
export const CLEAR_LANG_POPULARITY_BY_USER = "analytics/CLEAR_LANG_POPULARITY_BY_USER";

export const GET_ATTENDANCES_BY_USER = "analytics/GET_ATTENDANCES_BY_USER";
export const GET_ATTENDANCES_BY_USER_SUCCESS = "analytics/GET_ATTENDANCES_BY_USER_SUCCESS";
export const GET_ATTENDANCES_BY_USER_ERROR= "analytics/GET_ATTENDANCES_BY_USER_ERROR";
export const CLEAR_ATTENDANCES_BY_USER = 'analytics/CLEAR_ATTENDANCES_BY_USER';

export const getSummaryAsync = createAsyncAction(
    GET_SUMMARY,
    GET_SUMMARY_SUCCESS,
    GET_SUMMARY_ERROR
)<undefined, ISummaryResponse, AxiosError>();

export const getAllAttendancesAsync = createAsyncAction(
    GET_ALL_ATTENDANCES,
    GET_ALL_ATTENDANCES_SUCCESS,
    GET_ALL_ATTENDANCES_ERROR
)<undefined, IAllAttendancesResponse, AxiosError>();

export const getAllAttendancesByDatesAsync = createAsyncAction(
    GET_ALL_ATTENDANCES_BY_DATES,
    GET_ALL_ATTENDANCES_BY_DATES_SUCCESS,
    GET_ALL_ATTENDANCES_BY_DATES_ERROR
)<undefined, IAllAttendancesByDatesResponse, AxiosError>();

export const getLanguagesPopularityAsync = createAsyncAction(
    GET_LANGUAGES_POPULARITY,
    GET_LANGUAGES_POPULARITY_SUCCESS,
    GET_LANGUAGES_POPULARITY_ERROR
)<undefined, ILanguagesResponse, AxiosError>();

export const getLatestChallengeAttendancesByUserAsync = createAsyncAction(
    GET_LATEST_CHALLENGE_ATTENDANCES_BY_USER,
    GET_LATEST_CHALLENGE_ATTENDANCES_BY_USER_SUCCESS,
    GET_LATEST_CHALLENGE_ATTENDANCES_BY_USER_ERROR,
    CLEAR_LATEST_CHALLENGE_ATTENDANCES_BY_USER
)<undefined, ILatestChallengeAttendancesByUserResponse, AxiosError, undefined>();

export const getLangPopularityByUserAsync = createAsyncAction(
    GET_LANG_POPULARITY_BY_USER,
    GET_LANG_POPULARITY_BY_USER_SUCCESS,
    GET_LANG_POPULARITY_BY_USER_ERROR,
    CLEAR_LANG_POPULARITY_BY_USER,
)<undefined, ILanguagesResponse, AxiosError, undefined>();

export const getAttendancesByUserAsync = createAsyncAction(
    GET_ATTENDANCES_BY_USER,
    GET_ATTENDANCES_BY_USER_SUCCESS,
    GET_ATTENDANCES_BY_USER_ERROR,
    CLEAR_ATTENDANCES_BY_USER,
)<undefined, IAttendancesInChallengeByUserResponse, AxiosError, undefined>();