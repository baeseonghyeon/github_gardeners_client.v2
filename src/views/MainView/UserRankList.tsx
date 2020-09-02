/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import './scss/UserRankList.scss';

import { Card, UserInfo } from '../../components';

import { getUsersRankList, IUsersRankListItem } from '../../api/analytics';
import IChallenge from '../../api/interfaces/Challenge';
import { isNullOrUndefined } from 'util';

import { FaMedal } from 'react-icons/fa';

interface UserRankListProps {
    selectedChallenge: IChallenge | null,
}

const UserRankList = (props: UserRankListProps) => {
    const [ranks, setRanks] = useState<IUsersRankListItem[]>([]);
    const fn = {
        fetch: async () => {
            if (!isNullOrUndefined(props.selectedChallenge)) {
                const result = await getUsersRankList(props.selectedChallenge.id);
                if (result.code > 0) {
                    setRanks(result.data);
                }
            }
        }
    }
    useEffect(() => {
        if (!isNullOrUndefined(props.selectedChallenge)) {
            fn.fetch();
        }
    }, [props, props.selectedChallenge])
    return <Card
        header={{
            title: "출석 순위",
            desc: "정원사분들의 출석 순위입니다. 10등까지 노출됩니다."
        }}
        className="user-rank-list-container"
        wrapperClassName="user-rank-list-wrapper">
        {
            ranks.map((item, idx) => {
                return <div className="user-rank-item" key={idx} >
                    <p className={`user-rank-text ${item.rank < 4 ? "rank-" + item.rank : ""}`}>
                        <b>{item.rank}</b>
                            등
                        </p>
                    <UserInfo
                        className={`user-rank-item-info ${item.rank < 4 ? "rank-" + item.rank : ""}`}
                        Badge={item.rank < 4 ? <FaMedal /> : <></>}
                        {...item.info}
                    />
                </div>
            })
        }
    </Card>;
}

export default UserRankList;