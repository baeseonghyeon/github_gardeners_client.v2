import * as actions from "./actions";
import { ActionType } from "typesafe-actions";
import {
    ISummaryResponse,
    IAllAttendancesResponse,
    ILanguagesResponse,
    IPopularRepositoryResponse,
    IHottestRepositoryResponse,
    IAllAttendancesByDatesResponse,
    ILatestChallengeAttendancesByUserResponse,
} from "../../api/analytics";

export type AnalyticsAction = ActionType<typeof actions>;

export type AnalyticsState = {
    summary: {
        loading: boolean;
        error: Error | null;
        data: ISummaryResponse | null;
    };
    all_attendances: {
        loading: boolean;
        error: Error | null;
        data: IAllAttendancesResponse | null;
    };
    all_attendances_by_dates: {
        loading: boolean;
        error: Error | null;
        data: IAllAttendancesByDatesResponse | null;
    };
    languages: {
        loading: boolean;
        error: Error | null;
        data: ILanguagesResponse | null;
    };
    popular_repo: {
        loading: boolean;
        error: Error | null;
        data: IPopularRepositoryResponse | null;
    };
    hottest_repo: {
        loading: boolean;
        error: Error | null;
        data: IHottestRepositoryResponse | null;
    };
    latest_challenge_attendances_by_user: {
        loading: boolean;
        error: Error | null;
        data: ILatestChallengeAttendancesByUserResponse | null;
    };
};
