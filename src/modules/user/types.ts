import * as actions from "./actions";
import { ActionType } from "typesafe-actions";
import { IUserResponse, IUsersResponse, IUserAuthReponse } from "../../api/user";

export type UserAction = ActionType<typeof actions>;

export type UserState = {
    user : {
        loading : boolean,
        error : Error | null,
        data : IUserResponse | null,
    },
    users: {
        loading: boolean,
        error: Error | null,
        data: IUsersResponse | null,
    },
    searched_users :{
        loading: boolean,
        error : Error | null,
        data : IUsersResponse | null,
    },
    user_auth : {
        loading : boolean,
        error : Error | null,
        data : IUserAuthReponse | null,
    }
};
