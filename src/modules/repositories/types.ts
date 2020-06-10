import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { IRepositoriesByUserResponse, IExtRepoResponse } from '../../api/repo';

export type RepositoryAction = ActionType<typeof actions>;

export type RepositoryState = {
    repos_by_user: {
        loading: boolean,
        error : Error | null,
        data : IRepositoriesByUserResponse | null,
    },
    hottest_in_project_by_user : {
        loading: boolean,
        error : Error | null,
        data : IExtRepoResponse | null,
    },
    hottest : {
        loading: boolean,
        error : Error | null,
        data : IExtRepoResponse | null,
    },
    popular : {
        loading : boolean,
        error : Error | null,
        data : IExtRepoResponse | null,
    }
};


