import classNamesBinding from 'classnames/bind';
import { useEffect, useState } from 'react';
import GameControl from '../game-control/game-control.component';
import GameInitializer from '../game-initializer/game-initializer.component';
import Scoreboard from '../scoreboard/scoreboard.component';
import styles from './game.module.scss';
import {
    initTeams,
    initGames,
    initTimes,
} from '../../handlers/models/initmodels';
import { increaseByMs } from '../../utils/TimeUtils';

const css = classNamesBinding.bind(styles);
const Game = () => {
    const [teams, setTeams] = useState([]);
    const [games, setGames] = useState([]);
    const [times, setTimes] = useState([]);

    const hanldeInitModels = (numOfTeams, numOfGames) => {
        // delete old games
        games.forEach((game) => clearInterval(game.interval));
        const newTeams = initTeams(numOfTeams);
        const newGames = initGames(numOfGames);
        const newTimes = initTimes(numOfTeams, numOfGames);
        setTeams(newTeams);
        setGames(newGames);
        setTimes(newTimes);
    };

    const handleStartGame = (gameId) => {
        const newGames = games.map((game) => {
            if (game.gameId == gameId) {
                game.status = 'playing';
                game.interval = setInterval(() => {
                    const newGames = [...games];
                    const game = newGames.find(
                        (game) => game.gameId === gameId
                    );
                    game.time = increaseByMs(game.time);
                    setGames(newGames);
                }, 140);
            }
            return game;
        });
        setGames(newGames);
    };

    const handleStopTeamGame = (teamId, gameId) => {
        const newTimes = times.map((time) => {
            if (time.gameId === gameId && time.teamId === teamId) {
                time.finished = true;
            }
            return time;
        });
        setTimes(newTimes);
        const last = newTimes.find(
            (time) => time.gameId === gameId && !time.finished
        );
        if (!last) {
            const newGames = games.map((game) => {
                if (game.gameId === gameId) {
                    game.status = 'finished';
                    clearInterval(game.interval);
                }
                return game;
            });
            setGames(newGames);
        }
    };

    useEffect(() => {
        const newTimes = times.map((time) => {
            const game = games.find((game) => game.gameId === time.gameId);
            if (!time.finished && game.status == 'playing') {
                time.value = { ...game.time };
            }
            return time;
        });
        setTimes(newTimes);
    }, [games]);

    return (
        <div className={css('wrapper')}>
            <div className={css('sidebar')}>
                <GameInitializer teams={teams} games={games} onInitModels={hanldeInitModels} />
                <Scoreboard teams={teams} games={games} times={times} />
            </div>
            <div className={css('content')}>
                <div className={css('content-wrapper')}>
                    <h1 className={css('heading')}>Game Status</h1>
                    <div className={css('spacer')}></div>
                    <div className={css('content-inner')}>
                        {games.map((game) => (
                            <GameControl
                                key={game.gameId}
                                teams={teams}
                                game={game}
                                times={times}
                                onStartGame={handleStartGame}
                                onStopTeamGame={handleStopTeamGame}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game;
