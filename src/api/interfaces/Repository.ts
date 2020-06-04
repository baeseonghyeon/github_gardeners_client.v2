import { IUser } from './User';

export interface IRepositoryWithoutUser{
    contributor: [string],
    id : string,
    name: string,
    languages: [IRepositoryLanguage],
    created_at: string,
    description : string,
    forks_count : number,
    hompage : string | null,
    license : Object | null,
    stargazers_count : number,
    watchers_count: number,
}

export interface IRepositoryLanguage {
    name : string,
    rate : number,
}

export interface IRepositoryWithUser{ 
    contributor: [ IUser ],
    id: string,
    name : string,
    languages: [IRepositoryLanguage],
    created_at: string,
    description : string,
    forks_count : number,
    hompage : string | null,
    license : Object | null,
    stargazers_count : number,
    watchers_count: number,
}

export interface IExtRepositoryWithoutUser {
    commit_cnt : number,
    repo : IRepositoryWithoutUser
}

export interface IExtRepositoryWithUser{
    commit_cnt : number,
    repo : IRepositoryWithUser,
}