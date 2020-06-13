import React, {useEffect, useState} from 'react';
import { Card } from '../../components';

import './scss/CurrentAttendantChart.scss';

import { HighChartTheme } from '../../components';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import moment from 'moment';
import { RootState } from '../../modules';
import { useDispatch, useSelector }  from 'react-redux';
import { getAllAttendancesByDatesThunk } from '../../modules/analytics/thunks';
import { isNullOrUndefined } from 'util';

const CurrentAttendantChart = ()=>{
    const dispatch = useDispatch();
    const { selectedChallenge } = useSelector((state:RootState)=>state.main_view);
    const { data, loading } = useSelector((state:RootState)=>state.analytics.all_attendances_by_dates);
    const initialOptions: any = {
        ...HighChartTheme.Dark,
        chart: {
            ...HighChartTheme.Dark.chart,
            type: "line",
            width : null,
        },
        yAxis: {
            ...HighChartTheme.Dark.yAxis,
            max:100,
            labels: {
                ...HighChartTheme.Dark.yAxis.labels,
                format: "{value} %",
            },
        },
        xAxis: {
            ...HighChartTheme.Dark.xAxis,
            type: "category",
        },
        series: [{
            name: "일별 출석률",
            data: [],
        }]
    };

    const [ chartOptions, setChartOptions ] = useState(initialOptions);
    
    useEffect(()=>{
        if(!isNullOrUndefined(selectedChallenge)){
            dispatch(getAllAttendancesByDatesThunk(selectedChallenge?.id));
        }
    },[selectedChallenge]);

    useEffect(()=>{
        if(!loading && !isNullOrUndefined(data) && !isNullOrUndefined(data.data)) {
            let _series = [];
            for (const item of data.data) {
                _series.push({
                    name: moment(item.date).format("MM/DD"),
                    y: item.rate
                });
            }

            let _options = { ...initialOptions };
            _options.series[0].title = "일별 출석률";
            _options.series[0].tooltip = { pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y} %</b><br/>' };
            _options.series[0].data = _series;
            setChartOptions(_options);
        }
        else{
            setChartOptions(initialOptions);
        }
    },[loading, data]);

    useEffect(()=>{
        window.dispatchEvent(new Event('resize'));
    },[chartOptions]);

    return <Card 
        className="current-attendant-chart-container"
        wrapperClassName="current-attendant-chart-wrapper"
        header={{
            title : "일별 출석률",
            desc : "정원사 님들의 일별 출석 현황입니다",
        }}>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
    </Card>
}

export default CurrentAttendantChart;