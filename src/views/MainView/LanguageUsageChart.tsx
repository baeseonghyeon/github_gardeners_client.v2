/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import './scss/LanguageUsageChart.scss';

import IChallenge from '../../api/interfaces/Challenge';

import { HighChartTheme, Card, TextHeader } from '../../components';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { RootState } from '../../modules';
import { getLanguagesPopularityThunk } from '../../modules/analytics';
import { useDispatch, useSelector } from 'react-redux';
import { isNullOrUndefined } from 'util';

interface LanguageUsageChartProps{
    selectedChallenge : IChallenge | null
}

const LanguageUsageChart = (props:LanguageUsageChartProps)=>{
    const dispatch = useDispatch();
    const { data } = useSelector((state:RootState)=>state.analytics.languages);
    const [chartOptions, setChartOptions] = useState();
    const initialOptions: any = {
        ...HighChartTheme.Dark,
        title: {
            text: "",
        },
        chart: {
            ...HighChartTheme.Dark.chart,
            type: "pie",
        },
        tooltip: {
            ...HighChartTheme.Dark.tooltip,
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            ...HighChartTheme.Dark.plotOptions,
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    // enabled: false,
                    enabled: true,
                    format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                    distance: -50,
                    filter: {
                        property: 'percentage',
                        operator: '>',
                        value: 1
                    }
                },
                showInLegend: true,
            }
        },
        series: [
            {
                name: "점유율",
                colorByPoint: true,
                data: []
            }
        ]
    };

    useEffect(() => {
        if(!isNullOrUndefined(props.selectedChallenge)){
            dispatch(getLanguagesPopularityThunk(props.selectedChallenge.id));
        }
    }, [props, props.selectedChallenge]);


    useEffect(() => {
        // effect
        if (!isNullOrUndefined(data) && !isNullOrUndefined(data.data)) {
            let _data: any = [];
            data.data.forEach(language => {
                _data.push({
                    name: language._id.language_name,
                    y: language.rate_percentage,
                });
            });
            const options = { ...initialOptions };
            options.series[0].data = _data;
            setChartOptions(options);
        }
        else {
            setChartOptions(initialOptions);
        }
        return () => {
            setChartOptions(initialOptions);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);


    return <Card 
    header={{
        title : "언어 사용분포",
        desc:"현재 프로젝트에서 정원사님들의 언어 사용분포도 입니다"
    }}
    className="lang-usage-container"
    wrapperClassName="lang-usage-wrapper"
    >
        {
            !isNullOrUndefined(data) && !isNullOrUndefined(data.data) && data.data.length > 0 ?
                <div className="lang-usage-content">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions}
                    />
                </div> :
                <div className="lang-usage-content empty">
                    <TextHeader className="empty-desc" title="아직 준비 중🧑‍💻" desc="아직 수집된 데이터가 없습니다" />
                </div>
        }
    </Card>
}

export default LanguageUsageChart;