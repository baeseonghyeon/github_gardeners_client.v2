// import UserInfoInterface from './UserInfo';
import ICommit from './Commit';
import { IRepositoryWithoutUser } from './Repository';

export interface IEvent {
    repo : {
        id: string,
        name: string,
    },
    payload : {
        push_id: number,
        size: number,
        ref: string,
        commits: [ICommit]
    },
    id: string,
    type: string,
    actor: string,
    actor_login:string,
    created_at : Date,
    repo_detail: IRepositoryWithoutUser | null
}