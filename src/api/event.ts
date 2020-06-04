import axios from "axios";
import { IEvent } from "./interfaces/Event";
import { IJSONResponse } from "./interfaces/JSONReponse";

const REACT_API_HOST = process.env.REACT_APP_API_HOST;

export async function getEvents(page: number = 1) {
    const res = await axios.get<IEventsResponse>(
        `${REACT_API_HOST}/api/events/`,
        {
            params: {
                page : page
            }
        }
    );
    return res.data;
}

export async function getEventsByUser(user_name:string, page: number = 1){
    const res = await axios.get<IEventsResponse>(
        `${REACT_API_HOST}/api/events/${user_name}`,
        {
            params: {
                page : page
            }
        }
    );
    return res.data;
}

export interface IEventsResponse extends IJSONResponse {
    data: {
        count_all_items: number,
        events: [IEvent]
    }
}
