import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { IAllChallengesResponse, IChallengesByUserResponse, ILatestChallengeResponse } from '../../api/challenge';

export type ChallengeAction = ActionType<typeof actions>;

export type ChallengeState = {
    all_challenges: {
        loading: boolean,
        error : Error | null,
        data : IAllChallengesResponse | null,
    },
    challenges_by_user:{
        loading: boolean,
        error: Error | null,
        data: IChallengesByUserResponse | null,
    },
    latest_challenge:  {
        loading: boolean,
        error: Error | null,
        data: ILatestChallengeResponse | null,
    },
    active_challenges : {
        loading: boolean,
        error : Error | null,
        data : IAllChallengesResponse | null,
    }
};
