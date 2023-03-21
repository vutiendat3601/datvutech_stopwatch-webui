import classNamesBinding from 'classnames/bind';

import styles from './main-layout.module.scss';
import Header from '../components/header/header.component';
import Scoreboard from '../../components/scoreboard/scoreboard.component';
import { useEffect, useState } from 'react';
import { Stopwatch } from '../../utils/Stopwatch';
import { StopwatchPublisher } from '../../utils/StopwatchPublisher';

const css = classNamesBinding.bind(styles);
const MainLayout = () => {
    const testTeams = [
        {
            id: 1,
            name: 'Đội 1',
            timers: [
                { gameId: 1, time: { min: 0, sec: 0, ms: 0 } },
                { gameId: 2, time: { min: 0, sec: 0, ms: 0 } },
            ],
        },
        {
            id: 2,
            name: 'Đội 2',
            timers: [
                { gameId: 1, time: { min: 0, sec: 0, ms: 0 } },
                { gameId: 2, time: { min: 0, sec: 0, ms: 0 } },
            ],
        },
    ];

    const [teams, setTeams] = useState(testTeams);

    const games = [
        {
            id: 1,
            title: 'Game 1',
            playing: false,
        },
        {
            id: 2,
            title: 'Game 2',
            playing: true,
        },
    ];

    const stopwatchs = games.map(
        (game) =>
            new StopwatchPublisher(
                game,
                [...teams],
                (publisher, subcribers, min, sec, ms) => {
                    const gameId = publisher.id;
                    const newTimer = { gameId, time: { min, sec, ms } };
                    let newTeams = [...teams];
                    newTeams.map((team) => {
                        let timers = team.timers;
                        if (subcribers.find((sub) => sub.id === team.id)) {
                            timers = team.timers.map((timer) => {
                                return timer.gameId === gameId
                                    ? newTimer
                                    : timer;
                            });
                        }
                        team.timers = timers;
                        return team;
                    });
                    setTeams(newTeams);
                }
            )
    );
    stopwatchs[0].start();
    return (
        <div>
            <Header />
            <div className={css('content')}>
                <Scoreboard
                    teams={teams}
                    games={games}
                    stopwatchs={stopwatchs}
                />
            </div>
        </div>
    );
};

export default MainLayout;
