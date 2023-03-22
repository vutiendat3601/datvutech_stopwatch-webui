import classNamesBinding from 'classnames/bind';

import styles from './main-layout.module.scss';
import Header from '../components/header/header.component';
import Scoreboard from '../../components/scoreboard/scoreboard.component';
import { useEffect, useState } from 'react';
import Standings from '../../components/standings/standings.component';

const css = classNamesBinding.bind(styles);
const MainLayout = () => {
    const [teams, setTeams] = useState([
        { teamId: 1, name: 'Team 1' },
        { teamId: 2, name: 'Team 2' },
        { teamId: 3, name: 'Team 3' },
    ]);

    const [games, setGames] = useState([
        {
            gameId: 1,
            name: 'Game 1',
            playing: false,
            intervalId: -1,
        },
        {
            gameId: 2,
            name: 'Game 2',
            playing: false,
            intervalId: -1,
        },
        {
            gameId: 3,
            name: 'Game 3',
            playing: false,
            intervalId: -1,
        },
    ]);

    const [gameTimers, setGameTimers] = useState([
        { gameId: 1, time: { min: 0, sec: 0, ms: 0 } },
        { gameId: 2, time: { min: 0, sec: 0, ms: 0 } },
        { gameId: 3, time: { min: 0, sec: 0, ms: 0 } },
    ]);

    const [times, setTimes] = useState([
        {
            teamId: 1,
            gameId: 1,
            stopped: false,
            value: { min: 0, sec: 0, ms: 0 },
        },
        {
            teamId: 1,
            gameId: 2,
            stopped: false,
            value: { min: 0, sec: 0, ms: 0 },
        },
        {
            teamId: 1,
            gameId: 3,
            stopped: false,
            value: { min: 0, sec: 0, ms: 0 },
        },
        {
            teamId: 2,
            gameId: 1,
            stopped: false,
            value: { min: 0, sec: 0, ms: 0 },
        },
        {
            teamId: 2,
            gameId: 2,
            stopped: false,
            value: { min: 0, sec: 0, ms: 0 },
        },
        {
            teamId: 2,
            gameId: 3,
            stopped: false,
            value: { min: 0, sec: 0, ms: 0 },
        },
        {
            teamId: 3,
            gameId: 1,
            stopped: false,
            value: { min: 0, sec: 0, ms: 0 },
        },
        {
            teamId: 3,
            gameId: 2,
            stopped: false,
            value: { min: 0, sec: 0, ms: 0 },
        },
        {
            teamId: 3,
            gameId: 3,
            stopped: false,
            value: { min: 0, sec: 0, ms: 0 },
        },
    ]);

    const handleStartGame = (gameId) => {
        setGames((prev) => {
            let newGames = [...prev];
            newGames = newGames.map((game) =>
                game.gameId === gameId ? { ...game, playing: true } : game
            );
            return newGames;
        });
    };

    const handleStopTeamTime = (teamId, gameId) => {
        setTimes((prev) => {
            const newTimes = [...prev];
            const time = newTimes.find(
                (time) => time.teamId === teamId && time.gameId === gameId
            );
            time.stopped = true;
            return newTimes;
        });
    };

    const handleOnInitModels = (numOfTeam, numOfGame) => {
        console.log('numOfGame:', numOfGame, 'numOfGame:', numOfGame);

        // initTeams
        const newTeams = [];
        for (let i = 0; i < numOfTeam; i++) {
            newTeams.push({ teamId: i + 1, name: `Team ${i + 1}` });
        }

        const newGames = [];
        for (let i = 0; i < numOfGame; i++) {
            newGames.push({
                gameId: i + 1,
                name: `Game ${i + 1}`,
                playing: false,
                intervalId: -1,
            });
        }

        // initGameTimers
        const newGameTimers = [];
        for (let i = 0; i < numOfGame; i++) {
            newGameTimers.push({
                gameId: i + 1,
                time: { min: 0, sec: 0, ms: 0 },
            });
        }
        // initTimes
        const newTimes = [];
        for (let i = 0; i < numOfTeam; i++) {
            for (let j = 0; j < numOfGame; j++) {
                newTimes.push({
                    teamId: i + 1,
                    gameId: j + 1,
                    stopped: false,
                    value: { min: 0, sec: 0, ms: 0 },
                });
            }
        }
        // console.log('Teams:', teams);
        // console.log('Games:', games);
        // console.log('GameTimers:', gameTimers);
        // console.log('Times:', times);
        setTeams(newTeams);
        setGameTimers(newGameTimers);
        setTimes(newTimes);
        setGames(newGames);
    };

    useEffect(() => {
        games.forEach((game) => {
            if (game.playing && game.intervalId < 0) {
                const intervalId = setInterval(() => {
                    const newGameTimers = [...gameTimers];
                    const gameTimer = newGameTimers.find(
                        (gameTimer) => gameTimer.gameId === game.gameId
                    );
                    const { time } = gameTimer;
                    time.ms++;
                    if (time.ms >= 100) {
                        time.sec++;
                        time.ms = 0;
                    }
                    if (time.sec >= 60) {
                        time.min++;
                        time.sec = 0;
                    }
                    setGameTimers(newGameTimers);
                }, 10);
                game.intervalId = intervalId;
            }
        });
    }, [games]);

    useEffect(() => {
        const newTimes = [...times];
        newTimes.forEach((time) => {
            if (!time.stopped) {
                const gameTimer = gameTimers.find(
                    (gameTimer) => gameTimer.gameId === time.gameId
                );
                time.value = { ...gameTimer.time };
            }
        });
    }, [gameTimers]);

    return (
        <div>
            <Header onInitModels={handleOnInitModels} />
            <div className={css('content')}>
                <div>
                    <Scoreboard
                        teams={teams}
                        games={games}
                        times={times}
                        onStartGame={handleStartGame}
                        onStopTeamTime={handleStopTeamTime}
                    />
                </div>
                <div>
                    <Standings teams={teams} games={games} times={times} />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
