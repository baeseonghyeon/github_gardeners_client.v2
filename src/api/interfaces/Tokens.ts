import { IUser } from './User';

export interface IToken {
    used_by : [IUser],
    created_at : Date,
    updated_at : Date,
    created_by : [IUser] | null,
    value : string,
    expired_at : Date,
}