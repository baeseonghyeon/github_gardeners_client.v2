import { createAsyncAction } from 'typesafe-actions';
import {
    IAllChallengesResponse, IChallengesByUserResponse, ILatestChallengeResponse
} from '../../api/challenge';
import { AxiosError } from 'axios';

export const GET_ALL_CHALLENGES = "challenge/GET_ALL_CHALLENGES";
export const GET_ALL_CHALLENGES_SUCCESS = "challenge/GET_ALL_CHALLENGES_SUCCESS";
export const GET_ALL_CHALLENGES_ERROR = "challenge/GET_ALL_CHALLENGES_ERROR";
export const CLEAR_ALL_CHALLENGES = "challenge/CLEAR_ALL_CHALLENGES";

export const GET_CHALLENGES_BY_USER = "challenge/GET_CHALLENGES_BY_USER";
export const GET_CHALLENGES_BY_USER_SUCCESS = "challenge/GET_CHALLENGES_BY_USER_SUCCESS";
export const GET_CHALLENGES_BY_USER_ERROR = "challenge/GET_CHALLENGES_BY_USER_ERROR";
export const CLEAR_CHALLENGES_BY_USER = "challenge/CLEAR_CHALLENGES_BY_USER";

export const GET_LATEST_CHALLENGE = "challenge/GET_LATEST_CHALLEGE";
export const GET_LATEST_CHALLENGE_SUCCESS = "challenge/GET_LATEST_CHALLEGE_SUCCESS";
export const GET_LATEST_CHALLENGE_ERROR = "challenge/GET_LATEST_CHALLENGE_ERROR";
export const CLEAR_LATEST_CHALLENGE = "challenge/CLEAR_LATEST_CHALLENGE";

export const getAllChallengesAsync = createAsyncAction(
    GET_ALL_CHALLENGES,
    GET_ALL_CHALLENGES_SUCCESS,
    GET_ALL_CHALLENGES_ERROR,
    CLEAR_ALL_CHALLENGES
)<undefined, IAllChallengesResponse, AxiosError, undefined>();

export const getChallengesByUserAsync = createAsyncAction(
    GET_CHALLENGES_BY_USER,
    GET_CHALLENGES_BY_USER_SUCCESS,
    GET_CHALLENGES_BY_USER_ERROR,
    CLEAR_CHALLENGES_BY_USER
)<undefined, IChallengesByUserResponse, AxiosError, undefined>();

export const getLatestChallengeAsync = createAsyncAction(
    GET_LATEST_CHALLENGE,
    GET_LATEST_CHALLENGE_SUCCESS,
    GET_LATEST_CHALLENGE_ERROR,
    CLEAR_LATEST_CHALLENGE
)<undefined, ILatestChallengeResponse, AxiosError, undefined>();