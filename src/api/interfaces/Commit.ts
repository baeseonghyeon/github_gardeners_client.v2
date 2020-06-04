import { IUser } from './User';
import { IRepositoryWithoutUser } from'./Repository';
export interface ICommit {
    sha : string,
    author : {
        email : string,
        name : string,
    },
    message :string,
    commit_date : Date,
    commit_date_string : string,
    committer: string,
    repo : string,
}

export interface ICommitDetail {
    sha : string,
    author : {
        email : string,
        name : string,
    },
    message :string,
    commit_date : Date,
    commit_date_string : string,
    committer: IUser,
    repo : IRepositoryWithoutUser,
}

export default ICommit;