import { createAsyncAction } from 'typesafe-actions';
import { IRepositoriesByUserResponse } from '../../api/repo';
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