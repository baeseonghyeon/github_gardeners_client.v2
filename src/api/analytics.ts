import axios from "axios";
import { IJSONResponse } from "./interfaces/JSONReponse";
import { IUser } from "./interfaces/User";
import { IExtRepositoryWithoutUser } from "./interfaces/Repository";

const REACT_API_HOST = process.env.REACT_APP_API_HOST;

export async function getSummary() {
    const res = await axios.get<ISummaryResponse>(
        `${REACT_API_HOST}/api/analysis/summary`
    );
    return res.data;
}

export async function getAllAttendances() {
    const res = await axios.get<IAllAttendancesResponse>(
        `${REACT_API_HOST}/api/analysis/attendances`
    );
    return res.data;
}

export async function getAllAttendancesByDates() {
    const res = await axios.get<IAllAttendancesByDatesResponse>(
        `${REACT_API_HOST}/api/analysis/attendances/date`
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

export async function getLanguagesPopularity() {
    const res = await axios.get<ILanguagesResponse>(
        `${REACT_API_HOST}/api/analysis/languages`
    );
    return res.data;
}

export async function getPopularRepository() {
    const res = await axios.get<IPopularRepositoryResponse>(
        `${REACT_API_HOST}/api/analysis/repo/popular`
    );
    return res.data;
}

export async function getHottestRepository(){
    const res = await axios.get<IHottestRepositoryResponse>(
        `${REACT_API_HOST}/api/analysis/repo/hottest`
    );
    return res.data;
}

interface SummaryInterface {
    // 현재 저장된 저장소 수
    repo_cnt: Number;
    // 사용자 수
    user_cnt: Number;
    // 모든 커밋의 갯수
    commit_cnt: Number;
    // 현재까지 진행된 일자
    challenge_duration: number;
    // 현재 도전의 남은 도전일자
    current_challenge: {
        title: string;
        left_days: number;
    };
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

export interface ISummaryResponse extends IJSONResponse {
    data: SummaryInterface;
}

export interface IAllAttendancesResponse extends IJSONResponse {
    data: [IAllAttendances];
}

export interface ILatestChallengeAttendancesByUserResponse extends IJSONResponse{
    data : [IAllAttendances];
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

