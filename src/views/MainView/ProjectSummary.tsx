/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect } from 'react';

import { Card } from '../../components';

import { RootState } from '../../modules';
import { getSummaryThunk } from '../../modules/analytics/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { isNullOrUndefined } from 'util';

import Carousel from 'nuka-carousel';


const ProjectSummary = () => {
    const dispatch = useDispatch();
    const { selectedChallenge } = useSelector((state: RootState) => state.main_view);
    const { data, loading } = useSelector((state: RootState) => state.analytics.summary);

    useEffect(() => {
        if (!isNullOrUndefined(selectedChallenge)) {
            dispatch(getSummaryThunk(selectedChallenge.id));
        }
    }, [dispatch, selectedChallenge]);

    if (!isNullOrUndefined(data) && !isNullOrUndefined(data.data)) {
        return <div className="main-content-item-wrapper summary">
            <Carousel
                className="summary-items-wrapper"
                withoutControls={true}
                cellAlign={'left'}
                slideWidth={'240px'}
                height={"95px"}
                cellSpacing={15}>
                {
                    data.data.days_from_start_to_now < 0 ?
                    <Card className="summary-item d-day" wrapperClassName="summary-item-wrapper" >
                        <p className="summary-title">시작까지 앞으로 🔥</p>
                        <p className="summary-desc"><b>D{data.data.days_from_start_to_now}</b> 일</p>
                    </Card> :
                    <Card className="summary-item remain-days" wrapperClassName="summary-item-wrapper" >
                        <p className="summary-title">종료까지 앞으로 🔥</p>
                        <p className="summary-desc"><b>{data.data.days_from_now_to_finish}</b> 일</p>
                    </Card>
                }
                <Card className="summary-item users" wrapperClassName="summary-item-wrapper">
                    <p className="summary-title">지금까지 참여 중인 정원사 수 🌱</p>
                    <p className="summary-desc"><b>{data.data.user_cnt}</b> 명</p>
                </Card>
                <Card className="summary-item commits" wrapperClassName="summary-item-wrapper">
                    <p className="summary-title">지금까지 게시된 커밋 수 😎</p>
                    <p className="summary-desc"><b>{data.data.commit_cnt}</b> 건</p>
                </Card>
                <Card className="summary-item repos" wrapperClassName="summary-item-wrapper">
                    <p className="summary-title">등록된 저장소 수 🧑‍💻</p>
                    <p className="summary-desc"><b>{data.data.repo_cnt}</b> 개</p>
                </Card>
            </Carousel>
        </div>
    }
    else {
        return <></>
    }
}

export default ProjectSummary;
