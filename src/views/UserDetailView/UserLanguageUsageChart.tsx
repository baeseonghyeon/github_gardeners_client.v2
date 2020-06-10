import React, { useEffect, useState } from 'react';

import { HighChartTheme } from '../../components';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { RootState } from '../../modules';
import { useDispatch, useSelector } from 'react-redux';
import { getLangPopularityByUserThunk } from '../../modules/analytics/thunks';
import { isNullOrUndefined } from 'util';
import { TextHeader } from '../../components';

interface UserLanguageUsageChartProps {
    challengeId: string,
    login: string,
}
const UserLanguageUsageChart = (props: UserLanguageUsageChartProps) => {
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state: RootState) => state.analytics.languages_by_user);
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
        dispatch(getLangPopularityByUserThunk(props.challengeId, props.login));
    }, [props]);

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

    return <>
        {
            !isNullOrUndefined(data) && !isNullOrUndefined(data.data) && data.data.length > 0 ?
                <div className="user-language-usage-container">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions}
                    />
                </div> :
                <div className="user-language-usage-container empty">
                    <TextHeader className="empty-desc" title="아직 준비 중🧑‍💻" desc="아직 수집된 데이터가 없습니다" />
                </div>
        }</>
}

export default UserLanguageUsageChart;