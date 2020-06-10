import { createAsyncAction } from 'typesafe-actions';
import { IRepositoriesByUserResponse, IExtRepoResponse } from '../../api/repo';
import { AxiosError } from 'axios';

export const GET_REPOSITORIES_BY_USER = 'repo/GET_REPOSITORIES_BY_USER';
export const GET_REPOSITORIES_BY_USER_SUCCESS = 'repo/GET_REPOSITORIES_BY_USER_SUCCESS';
export const GET_REPOSITORIES_BY_USER_ERROR = 'repo/GET_REPOSITORIES_BY_USER_ERROR';
export const GET_REPOSITORIES_BY_USER_CLEAR = 'repo/GET_REPOSITORIES_BY_USER_CLEAR';

export const getRepositoriesByUserAsync = createAsyncAction(
    GET_REPOSITORIES_BY_USER,
    GET_REPOSITORIES_BY_USER_SUCCESS,
    GET_REPOSITORIES_BY_USER_ERROR,
    GET_REPOSITORIES_BY_USER_CLEAR
)<undefined, IRepositoriesByUserResponse, AxiosError, undefined>();

export const GET_HOTTEST_REPO_BY_USER = "repo/GET_HOTTEST_REPO_BY_USER";
export const GET_HOTTEST_REPO_BY_USER_SUCCESS = "repo/GET_HOTTEST_REPO_BY_USER_SUCCESS";
export const GET_HOTTEST_REPO_BY_USER_ERROR = "repo/GET_HOTTEST_REPO_BY_USER_ERROR";
export const CLEAR_HOTTEST_REPO_BY_USER = "repo/CLEAR_HOTTEST_REPO_BY_USER";

export const getHottestRepoInProjectByUserAsync = createAsyncAction(
    GET_HOTTEST_REPO_BY_USER,
    GET_HOTTEST_REPO_BY_USER_SUCCESS,
    GET_HOTTEST_REPO_BY_USER_ERROR,
    CLEAR_HOTTEST_REPO_BY_USER
)<undefined, IExtRepoResponse , AxiosError, undefined>();

export const GET_HOTTEST_REPO = "repo/GET_HOTTEST_REPO";
export const GET_HOTTEST_REPO_SUCCESS = "repo/GET_HOTTEST_REPO_SUCCESS";
export const GET_HOTTEST_REPO_ERROR = "repo/GET_HOTTEST_REPO_ERROR";
export const CLEAR_HOTTEST_REPO = "repo/CLEAR_HOTTEST_REPO";

export const getHottestRepoAsync = createAsyncAction(
    GET_HOTTEST_REPO,
    GET_HOTTEST_REPO_SUCCESS,
    GET_HOTTEST_REPO_ERROR,
    CLEAR_HOTTEST_REPO
)<undefined, IExtRepoResponse , AxiosError, undefined>();

export const GET_POPULAR_REPO = "repo/GET_POPULAR_REPO";
export const GET_POPULAR_REPO_SUCCESS = "repo/GET_POPULAR_REPO_SUCCESS";
export const GET_POPULAR_REPO_ERROR = "repo/GET_POPULAR_REPO_ERROR";
export const CLEAR_POPULAR_REPO = "repo/CLEAR_POPULAR_REPO";

export const getPopularRepoAsync = createAsyncAction(
    GET_POPULAR_REPO,
    GET_POPULAR_REPO_SUCCESS,
    GET_POPULAR_REPO_ERROR,
    CLEAR_POPULAR_REPO
)<undefined, IExtRepoResponse , AxiosError, undefined>();