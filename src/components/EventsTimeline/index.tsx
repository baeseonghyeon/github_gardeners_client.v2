/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { IEventsResponse } from '../../api/event';
import { IEvent } from '../../api/interfaces/Event';
import { isNullOrUndefined } from 'util';
import moment from 'moment';

import './EventsTimeline.scss';

import EventsTimelineItem from './EventTimelineItem';

interface IEventsTimelineProps{
    events: {
        loading: boolean,
        data : IEventsResponse | null,
        error: Error | null
    },
    onReload : (page:number)=>void,
    className?:string,
}

const EventsTimeline = (props:IEventsTimelineProps)=>{
    const [stackedEvents, setStackedEvents] = useState<IEvent[]>([]);
    const [page, setPage] = useState(1);
    let latestEventUpdatedDate:string;

    useEffect(()=>{
        props.onReload(page);
    }, []);

    useEffect(() => {
        if (!isNullOrUndefined(props.events.data) && !isNullOrUndefined(props.events.data.data)) {
            setStackedEvents([
                ...stackedEvents,
                ...props.events.data.data.events
            ] as IEvent[]);
        }
    }, [props,props.events]);

    const fn = {
        loadMore: () => {
            if (!props.events.loading && !isNullOrUndefined(props.events.data) && !isNullOrUndefined(props.events.data.data) && (page < props.events.data.data.count_all_items)) {
                props.onReload(page + 1);
                setPage(page + 1);
            }
        }
    }

    return <div className={ `users-activity-logs-wrapper ${props.className}` }>
        {
            stackedEvents.map((evt, idx) => {
                let isHeader = false;
                const _currentEventsDate = moment(evt.created_at).format("YYYY-MM-DD");
                if(latestEventUpdatedDate === undefined){ 
                    latestEventUpdatedDate = moment(evt.created_at).format("YYYY-MM-DD"); 
                    isHeader = true;
                }
                else{
                    isHeader = _currentEventsDate !== latestEventUpdatedDate;
                    latestEventUpdatedDate = _currentEventsDate;
                }

                if(isHeader){
                    return <EventsTimelineItem key={idx} event={evt} dateLabel={ _currentEventsDate }/>
                }
                else{
                    
                    return <EventsTimelineItem key={idx} event={evt} />
                }
            })
        }
        {
            !isNullOrUndefined(props.events.data) && !isNullOrUndefined(props.events.data.data) && (page < props.events.data.data.count_all_items) ?
                <div className="users-activity-log-loader" onClick={fn.loadMore}>
                    <button type="button">LOAD MORE</button>
                </div> :
                <></>
        }
    </div>
}

export default EventsTimeline;