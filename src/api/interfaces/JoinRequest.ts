import { IUser } from './User';
import { IChallenge } from './Challenge';

export interface IJoinRequest {
    is_accepted : boolean,
    is_expired : boolean,
    user : string,
    challenge: string,
    updated_by : string,
    created_at : string,
}

export interface IExtJoinRequest{
    is_accepted : boolean,
    is_expired : boolean,
    user : [IUser],
    challenge : [IChallenge],
    updated_by : IUser,
    created_at : string,
}