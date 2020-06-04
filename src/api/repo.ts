import axios from 'axios';
import {IJSONResponse} from './interfaces/JSONReponse';
import { IRepositoryWithUser } from './interfaces/Repository';

const REACT_API_HOST = process.env.REACT_APP_API_HOST;

export async function getRepositoriesByUser(user_name:string){
    const res = await axios.get<IRepositoriesByUserResponse>(
        `${REACT_API_HOST}/api/repos/users/${user_name}`
    );
    return res.data;
}

export interface IRepositoriesByUserResponse extends IJSONResponse{
    data : [ IRepositoryWithUser ]
}