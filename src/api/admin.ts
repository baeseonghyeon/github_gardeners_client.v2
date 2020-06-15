import axios from "axios";
import { IJSONResponse } from "./interfaces/JSONReponse";
import { IExtJoinRequest } from "./interfaces/JoinRequest";
import { IToken } from './interfaces/Tokens';

const REACT_API_HOST = process.env.REACT_APP_API_HOST;

export async function getJoinRequests(challenge_id : string, page : number = 1){
    const res = await axios.get<IJoinRequestsResponse>(
        `${REACT_API_HOST}/api/admin/challenge/${challenge_id}/request`, {
            params : {
                page : page
            }
        }
    );
    return res.data;
}

export async function acceptJoinRequest(challenge_id: string, login:string){
    const res = await axios.put<IJSONResponse>(
        `${REACT_API_HOST}/api/admin/challenge/${challenge_id}/user/${login}/request`
    );
    return res.data;
}

export async function rejectJoinRequest(challenge_id: string, login:string){
    const res = await axios.delete<IJSONResponse>(
        `${REACT_API_HOST}/api/admin/challenge/${challenge_id}/user/${login}/request`
    );
    return res.data;
}

export async function getAdminTokens(page:number){
    const res = await axios.get<IGetAdminTokensResponse>(
        `${REACT_API_HOST}/api/admin/token`,
        {
            params : {
                page : page
            }
        }
    );
    return res.data;
}

export async function setAdminToken(token : string){
    const res = await axios.put<IJSONResponse>(
        `${REACT_API_HOST}/api/admin/token/${token}`
    );
    return res.data;
}

export async function generateAdminToken(){
    const res = await axios.post<IJSONResponse>(
        `${REACT_API_HOST}/api/admin/token`
    );
    return res.data;
}

export async function disableAdminToken(token : string){
    const res = await axios.delete<IJSONResponse>(
        `${REACT_API_HOST}/api/admin/token/${ token }`,
    );
    return res.data;
}

interface IJoinRequestsResponse extends IJSONResponse{
    data : [ IExtJoinRequest ]
}

interface IGetAdminTokensResponse extends IJSONResponse{
    data : [ IToken ]
}