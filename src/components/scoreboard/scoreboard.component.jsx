import classNamesBinding from 'classnames/bind';

import { useEffect, useState } from 'react';
import { MAX_MS_OF_ONE_HOUR } from '../../app/constants';
import {
    compareTime,
    convertToMinuteSecondMs,
    convertToMinuteSecondMsText,
    convertToMs,
} from '../../utils/TimeUtils';
import styles from './scoreboard.module.scss';

const css = classNamesBinding.bind(styles);

const Scoreboard = ({ games, teams, times }) => {
    const [gameIdChoosen, setGameIdChoosen] = useState(1);
    const [rankedTimes, setRankedTimes] = useState([...times]);

    const handleChooserChanged = (e) => {
        let newGameIdChoosen = Number.parseInt(e.target.value);
        setGameIdChoosen(newGameIdChoosen);
    };

    const rankTimes = () => {
        let rankedTimes = [];
        if (gameIdChoosen > -1) {
            rankedTimes = [...times]
                .filter((time) => time.gameId === gameIdChoosen)
                .sort((time1, time2) => compareTime(time1.value, time2.value))
                .map((time) => ({
                    ...time,
                    point: Number.parseInt(
                        1000 -
                            (convertToMs(time.value) / MAX_MS_OF_ONE_HOUR) *
                                1000
                    ),
                }));
        } else {
            rankedTimes = [...teams]
                .map((team) => {
                    const teamTimes = times.filter(
                        (time) => time.teamId == team.teamId
                    );
                    const totalTime = teamTimes.reduce(
                        (res, cur) => {
                            const { min, sec, ms } = cur.value;
                            res.value.min += min;
                            res.value.sec += sec;
                            res.value.ms += ms;
                            res.point += Number.parseInt(
                                1000 -
                                    (convertToMs(res.value) /
                                        MAX_MS_OF_ONE_HOUR) *
                                        1000
                            );
                            return res;
                        },
                        {
                            point: 0,
                            value: {
                                min: 0,
                                sec: 0,
                                ms: 0,
                            },
                        }
                    );
                    return {
                        teamId: team.teamId,
                        value: convertToMinuteSecondMs(totalTime.value),
                        point: totalTime.point,
                    };
                })
                .sort((time1, time2) => compareTime(time1.value, time2.value));
        }

        // add teamName
        rankedTimes = rankedTimes.map((time) => {
            const team = teams.find((team) => time.teamId === team.teamId);
            return {
                teamId: time.teamId,
                teamName: team.name,
                value: { ...time.value },
                point: time.point,
            };
        });
        return rankedTimes;
    };

    useEffect(() => {
        const newRankedTimes = rankTimes();
        setRankedTimes(newRankedTimes);
    }, [times]);

    useEffect(() => {
        const newRankedTimes = rankTimes();
        setRankedTimes(newRankedTimes);
    }, [gameIdChoosen]);

    return (
        <div className={css('wrapper')}>
            <div className={css('inner')}>
                {/*    <h1 className={css('heading')}>
                    {console.log(
                        games.find((game) => game.id === gameIdChoosen)
                    )}
                </h1> */}
                <div className={css('chooser')}>
                    <h1>Choose game</h1>
                    <select
                        className={css('options')}
                        onChange={handleChooserChanged}
                        value={gameIdChoosen}
                    >
                        {games.map((game) => (
                            <option key={game.gameId} value={game.gameId}>
                                {game.name}
                            </option>
                        ))}
                        <option value="-1">Summary</option>
                    </select>
                </div>
                <div className={css('scoreboard-header')}>
                    <div className={css('col-1')}>
                        <div className={css('cell')}>
                            <h1 className={css('col-label')}>Rank</h1>
                        </div>
                    </div>
                    <div className={css('col-2')}>
                        <div className={css('cell')}>
                            <h1 className={css('col-label')}>Team</h1>
                        </div>
                    </div>
                    <div className={css('col-3')}>
                        <div className={css('cell')}>
                            <h1 className={css('col-label')}>Time</h1>
                        </div>
                    </div>
                    <div className={css('col-3')}>
                        <div className={css('cell')}>
                            <h1 className={css('col-label')}>Point</h1>
                        </div>
                    </div>
                </div>
                <div className={css('records')}>
                    <div className={css('col-1')}>
                        {Array.from(Array(teams.length).keys()).map((rank) => (
                            <div className={css('cell')} key={rank + 1}>
                                <h3>{rank + 1}</h3>
                            </div>
                        ))}
                    </div>
                    <div className={css('col-2')}>
                        {rankedTimes.map((time) => {
                            return (
                                <div className={css('cell')} key={time.teamId}>
                                    <h3>{time.teamName}</h3>
                                </div>
                            );
                        })}
                    </div>
                    <div className={css('col-3')}>
                        {rankedTimes.map((time) => (
                            <div className={css('cell')} key={time.teamId}>
                                <h3>
                                    {convertToMinuteSecondMsText(time.value)}
                                </h3>
                            </div>
                        ))}
                    </div>
                    <div className={css('col-3')}>
                        {rankedTimes.map((time, index) => (
                            <div className={css('cell')} key={index + 1}>
                                <h3>{time.point}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scoreboard;
