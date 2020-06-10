import axios from 'axios';
import {IJSONResponse} from './interfaces/JSONReponse';
import { IRepositoryWithUser, IExtRepositoryWithoutUser, IRepositoryWithoutUser } from './interfaces/Repository';

const REACT_API_HOST = process.env.REACT_APP_API_HOST;

export async function getRepositoriesByUser(user_name:string, page:number = 1){
    const res = await axios.get<IRepositoriesByUserResponse>(
        `${REACT_API_HOST}/api/repos/users/${user_name}`, {
            params : {
                page : page
            }
        }
    );
    return res.data;
}

export async function getReposInProjectByUser(challenge_id:string, user_name:string){
    const res = await axios.get<IReposWithoutUserResponse>(
        `${REACT_API_HOST}/api/repos/users/${user_name}/challenges/${challenge_id}`
    );
    return res.data;
}

export async function getHottestRepoInProjectByUser(challenge_id:string, user_name:string){
    const res = await axios.get<IExtRepoResponse>(
        `${REACT_API_HOST}/api/repos/users/${user_name}/challenges/${challenge_id}/hottest`
    );
    return res.data;
}

export async function getHottestRepo(challenge_id:string){
    const res = await axios.get<IExtRepoResponse>(
        `${REACT_API_HOST}/api/repos/challenges/${challenge_id}/hottest`
    );
    return res.data;
}

export async function getPopularRepo(challenge_id:string){
    const res = await axios.get<IExtRepoResponse>(
        `${REACT_API_HOST}/api/repos//challenges/${challenge_id}/popular`
    );
    return res.data;
}

export interface IRepositoriesByUserResponse extends IJSONResponse{
    data : [ IRepositoryWithUser ]
}

export interface IExtRepoResponse extends IJSONResponse{
    data : IExtRepositoryWithoutUser
}

export interface IReposWithoutUserResponse extends IJSONResponse{
    data : [ IRepositoryWithoutUser ]
}