import { createAsyncAction } from 'typesafe-actions';
import { IEventsResponse } from '../../api/event';
import { AxiosError } from 'axios';

export const GET_EVENTS = 'event/GET_EVENTS';
export const GET_EVENTS_SUCCESS = 'event/GET_EVENTS_SUCCESS';
export const GET_EVENTS_ERROR = 'event/GET_EVENTS_ERROR';
export const GET_EVENTS_CLEAR = 'event/GET_EVENTS_CLEAR';

export const GET_EVENTS_BY_USER = 'event/GET_EVENTS_BY_USER';
export const GET_EVENTS_BY_USER_SUCCESS = 'event/GET_EVENTS_BY_USER_SUCCESS';
export const GET_EVENTS_BY_USER_ERROR = 'event/GET_EVENTS_BY_USER_ERROR';
export const GET_EVENTS_BY_USER_CLEAR = 'event/GET_EVENTS_BY_USER_CLEAR';

export const getEventsAsync = createAsyncAction(
    GET_EVENTS,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_ERROR,
    GET_EVENTS_CLEAR
)<undefined, IEventsResponse, AxiosError, undefined>();

export const getEventsByUserAsync = createAsyncAction(
    GET_EVENTS_BY_USER,
    GET_EVENTS_BY_USER_SUCCESS,
    GET_EVENTS_BY_USER_ERROR,
    GET_EVENTS_BY_USER_CLEAR
)<undefined, IEventsResponse, AxiosError, undefined>();

