import axios from 'axios';
import { IJSONResponse } from './interfaces/JSONReponse';
import { IChallengeUpdateOptions, IChallenge } from './interfaces/Challenge';

const REACT_API_HOST = process.env.REACT_APP_API_HOST;

// 여태 개설된 모든 도전 종류
export async function getAllChallenges(){
    const res = await axios.get<IAllChallengesResponse>(
        // getUrl('api/challenges/')
        `${REACT_API_HOST}/api/challenges`
    );
    return res.data;
}

export async function getAllActiveChallenges(){
    const res = await axios.get<IAllChallengesResponse>(
        `${REACT_API_HOST}/api/challenges/active`
    );
    return res.data;
}

// 특정 사용자의 도전 결과를 가져옴 
export async function getChallengesByUser(user_name:string){
    const res = await axios.get<IChallengesByUserResponse>(
        `${REACT_API_HOST}/api/challenges/users/${user_name}`
    );
    return res.data;
}

// 가장 최근 도전을 가져옴
export async function getLatestChallenge(){
    const res = await axios.get<ILatestChallengeResponse>(
        `${REACT_API_HOST}/api/challenges/latest`
    );
    return res.data;
}

// 특정 사용자를 해당 도전에 추가함
export async function postUserToChallenge(user_name:string, challenge_id:string){
    const res = await axios.post<IJSONResponse>(
        `${REACT_API_HOST}/api/challenges/${challenge_id}/users/${user_name}`
    );
    return res.data;
}

export async function putChallenge(challenge_id: string, options:IChallengeUpdateOptions){
    const res = await axios.put<IJSONResponse>(
        `${REACT_API_HOST}/api/challenges/${challenge_id}`,
        options
    );
    return res.data;
}

export async function putChallengeFeatured(challenge_id: string, is_featured:Boolean){
    const res = await axios.put<IJSONResponse>(
        `${REACT_API_HOST}/api/challenges/${challenge_id}/featured`,
        { is_featured : is_featured }
    );
    return res.data;
}


export async function deleteChallenge(challenge_id: string){
    const res = await axios.delete<IJSONResponse>(
        `${REACT_API_HOST}/api/challenges/${challenge_id}`
    );
    return res.data;
}

export async function postChallenge(options:IChallengeUpdateOptions){
    const res = await axios.post<IJSONResponse>(
        `${REACT_API_HOST}/api/challenges/`,
        options
    );
    return res.data;
}

export async function deleteUserFromChallenge(challenge_id:string, user_name:string){
    const res = await axios.delete<IJSONResponse>(
        `${REACT_API_HOST}/api/challenges/${challenge_id}/users/${user_name}`
    );
    return res.data;
}

export interface IAllChallengesResponse extends IJSONResponse{
    data : [IChallenge]
}

export interface IChallengesByUserResponse extends IJSONResponse{
    data : [IChallenge]
}

export interface ILatestChallengeResponse extends IJSONResponse{
    data : IChallenge,
}