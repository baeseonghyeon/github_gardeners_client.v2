import axios from "axios";
import { IJSONResponse } from "./interfaces/JSONReponse";
import { IUser } from "./interfaces/User";
import { IExtRepositoryWithoutUser } from "./interfaces/Repository";
import ICommit from "./interfaces/Commit";
import { isNullOrUndefined } from "util";

const REACT_API_HOST = process.env.REACT_APP_API_HOST;

export async function getSummary(challenge_id : string) {
    const res = await axios.get<ISummaryResponse>(
        `${REACT_API_HOST}/api/analysis/summary/${challenge_id}`
    );
    return res.data;
}

export async function getAllAttendances() {
    const res = await axios.get<IAllAttendancesResponse>(
        `${REACT_API_HOST}/api/analysis/attendances`
    );
    return res.data;
}

export async function getAllAttendancesByDates(challenge_id : string) {
    const res = await axios.get<IAllAttendancesByDatesResponse>(
        `${REACT_API_HOST}/api/analysis/attendances/${ challenge_id }/date`
    );
    return res.data;
}

export async function getLatestChallengeAttendancesByUser(
    user_name: string
) {
    const res = await axios.get<ILatestChallengeAttendancesByUserResponse>(
        `${REACT_API_HOST}/api/analysis/attendances/latest/users/${user_name}`
    );
    return res.data;
}

export async function getAttendancesByUser(challenge_id: string, login: string){
    const res = await axios.get<IAttendancesInChallengeByUserResponse>(
        `${REACT_API_HOST}/api/analysis/attendances/${challenge_id}/users/${login}`
    );
    return res.data;
}

export async function getLanguagesPopularity() {
    const res = await axios.get<ILanguagesResponse>(
        `${REACT_API_HOST}/api/analysis/languages`
    );
    return res.data;
}

export interface IGetLangPopularityOptions {
    login? : string,
    challenge_id? : string,
};

export async function getLangPopularity(options : IGetLangPopularityOptions){
    let uri = "";
    
    if(!isNullOrUndefined(options.challenge_id) && !isNullOrUndefined(options.login)){ 
        uri = `${REACT_API_HOST}/api/analysis/languages/challenges/${options.challenge_id}/users/${options.login}`
    }
    else if(isNullOrUndefined(options.challenge_id) && !isNullOrUndefined(options.login)){
        uri = `${REACT_API_HOST}/api/analysis/languages/users/${options.login}`
    }
    else if(!isNullOrUndefined(options.challenge_id) && isNullOrUndefined(options.login)){
        uri = `${REACT_API_HOST}/api/analysis/languages/challenges/${options.challenge_id}`
    }
    const res = await axios.get<ILanguagesResponse>(
        uri
    );
    return res.data;
}

export async function getUserRank (challenge_id:string,user_name:string){
    const res = await axios.get<IUserRankResponse>(
        `${REACT_API_HOST}/api/analysis/attendances/${challenge_id}/users/${user_name}/rank`
    );
    return res.data;
}

export async function getUsersRankList (challenge_id : string){
    const res = await axios.get<IUsersRankListResponse>(
        `${REACT_API_HOST}/api/analysis/attendances/${challenge_id}/rank`
    );
    return res.data;
}

export async function getUserAttendanceToday (challenge_id:string,user_name:string){
    const res = await axios.get<ITodayAttendanceByUserResponse>(
        `${REACT_API_HOST}/api/analysis/attendances/${challenge_id}/users/${user_name}/today`
    );
    return res.data;
}
export interface IUsersRankListItem{
    info : IUser,
    rank : number,
    total : number,
    attendances_count : number,
}
interface IUsersRankListResponse extends IJSONResponse {
    data : [IUsersRankListItem]
}
interface SummaryInterface {
    // 현재 저장된 저장소 수
    repo_cnt: number;
    // 사용자 수
    user_cnt: number;
    // 모든 커밋의 갯수
    commit_cnt: number;
    // 종료까지 남은 일자
    days_from_now_to_finish: number;
    // 시작부터 지금까지 진행된 일자
    days_from_start_to_now : number;
}

interface IAllAttendances {
    // 사용자의 정보
    info: IUser;
    // 모든 참여 횟수
    attendances_count: Number;
    // 참여율
    attendances_rate: Number;
    // 일자별 참여 정보
    attendances: { [date: string]: Number };
}

interface ILanguagePopularity {
    _id: { language_name: string };
    rate: Number;
    rate_percentage: Number;
}

export interface IUserRankResponse extends IJSONResponse{
    data : {
        rank :number,
        total:number,
    }
}

export interface ISummaryResponse extends IJSONResponse {
    data: SummaryInterface;
}

export interface IAllAttendancesResponse extends IJSONResponse {
    data: [IAllAttendances];
}


export interface ILatestChallengeAttendancesByUserResponse extends IJSONResponse{
    data : [IAllAttendances];
}

export interface IAttendancesInChallengeByUserResponse extends IJSONResponse{
    data : [IAllAttendances];
}

export interface ITodayAttendanceByUserResponse extends IJSONResponse{
    data : [ICommit];
}

export interface IAllAttendancesByDatesResponse extends IJSONResponse {
    data: [
        {
            date: string;
            cnt: number;
            all: number;
            rate: number;
        }
    ];
}

export interface ILanguagesResponse extends IJSONResponse {
    data: [ILanguagePopularity];
}

export interface IHottestRepositoryResponse extends IJSONResponse {
    data: IExtRepositoryWithoutUser;
}

export interface IPopularRepositoryResponse extends IJSONResponse {
    data: IExtRepositoryWithoutUser;
}

