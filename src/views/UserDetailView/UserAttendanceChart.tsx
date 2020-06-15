/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { HighChartTheme } from '../../components';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { RootState } from '../../modules';
import { useDispatch, useSelector } from 'react-redux';
import { getAttendancesByUserThunk } from '../../modules/analytics/thunks';
import { isNullOrUndefined } from 'util';
import { TextHeader } from '../../components';

interface UserAttendanceChartProps {
    challengeId: string,
    login: string,
};

const UserAttendanceChart = (props: UserAttendanceChartProps) => {
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state: RootState) => state.analytics.attendances_by_user);
    const [chartOptions, setChartOptions] = useState();
    const initialOptions: any = {
        ...HighChartTheme.Dark,
        chart: {
            ...HighChartTheme.Dark.chart,
            type: "line",

        },
        yAxis: {
            ...HighChartTheme.Dark.yAxis,
            labels: {
                ...HighChartTheme.Dark.yAxis.labels,
                format: "{value} 건",
            },
        },
        xAxis: {
            ...HighChartTheme.Dark.xAxis,
            type: "category",
        },
        series: [{
            name: "커밋 수",
            data: [],
        }]
    };

    useEffect(() => {
        dispatch(getAttendancesByUserThunk(props.challengeId, props.login));
    }, [props]);

    useEffect(() => {
        if (!loading && !isNullOrUndefined(data) && !isNullOrUndefined(data.data) && data.data.length > 0) {
            let _series = [];
            for (let [date, commits] of Object.entries(data.data[0].attendances)) {
                _series.push({
                    name: moment(date).format("MM/DD"),
                    y: commits
                });
            }

            let _options = { ...initialOptions };
            _options.series[0].title = "일별 출석률";
            _options.series[0].tooltip = { pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y} 건</b><br/>' };
            _options.series[0].data = _series;
            setChartOptions(_options);
        }
        else {
            setChartOptions(initialOptions);
        }
    }, [data]);

    return (
        <>
            {
                !isNullOrUndefined(data) && !isNullOrUndefined(data.data) && data.data.length > 0 ?
                <div className="attendance-chart-container">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions}
                    />
                </div> : 
                <div className="attendance-chart-container empty">
                    <TextHeader className="empty-desc" title="아직 준비 중🧑‍💻" desc="아직 수집된 데이터가 없습니다"/>
                </div>
            }
        </>);
}

export default UserAttendanceChart;