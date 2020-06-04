import { IUser } from './User'

export interface IChallenge{
    id : string,
    start_dt : string,
    finish_dt: string,
    title : string,
    created_at: string,
    is_featured: Boolean,
    participants: [IUser]
};

export interface IChallengeUpdateOptions {
    start_dt?: Date,
    finish_dt?: Date,
    title?: string,
}

export default IChallenge;