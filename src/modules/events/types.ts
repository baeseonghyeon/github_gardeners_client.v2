import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { IEventsResponse } from '../../api/event';

export type RepositoryAction = ActionType<typeof actions>;

export type RepositoryState = {
    events: {
        loading: boolean,
        error : Error | null,
        data : IEventsResponse | null,
    },
    events_by_user:{
        loading: boolean,
        error : Error | null,
        data : IEventsResponse | null,
    }
};


