import React from 'react';
import ChallengeInterface from '../../api/interfaces/Challenge';
import { Card } from '../../components';
import * as Lib from '../../lib';
interface ProjectListItemProps {
    challenge: ChallengeInterface,
    onSelect: Function,
    selectedId: string,
    index? :number,
}

const ProjectListItem = (props: ProjectListItemProps) => {
    const ui = {
        state : (start_dt:string, finish_dt:string)=>{
            const _fromNow = Lib.Date.fromNow(start_dt, finish_dt);
            if(_fromNow < 0){
                return (<p>
                    진행 예정
                </p>);
            }
            else if(_fromNow === 0){
                return (<p>
                    진행 중
                </p>);
            }
            else{
                return (<p>
                    종료됨
                </p>);
            }
        }
    }
    return (
        <div className={"project-item "} onClick={ ()=>props.onSelect(props.challenge.id, props.index) }>
            <Card className={(props.selectedId === props.challenge.id ? "selected" : "")}>
                <p className="title">{props.challenge.title}</p>
                <p className="period">
                    {Lib.Date.getPeriodString(props.challenge.start_dt, props.challenge.finish_dt)}
                </p>
                <div className="footer">
                    <p>
                        현재 참가자 수 : {props.challenge.participants.length}
                    </p>
                    {
                        ui.state(props.challenge.start_dt, props.challenge.finish_dt)
                    }
                </div>
            </Card>
        </div>
    );
}

export default ProjectListItem;