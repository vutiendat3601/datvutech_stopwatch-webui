import classNamesBinding from 'classnames/bind';
import { useState } from 'react';
import GameControl from '../game-control/game-control.component';
import GameInitializer from '../game-initializer/game-initializer.component';
import Scoreboard from '../scoreboard/scoreboard.component';
import styles from './game.module.scss';
import {
    initTeams,
    initGames,
    initTimes,
} from '../../handlers/models/initmodels';

const css = classNamesBinding.bind(styles);
const Game = () => {
    const [teams, setTeams] = useState([]);
    const [games, setGames] = useState([]);
    const [times, setTimes] = useState([]);

    console.log('teams: ', teams);
    console.log('games: ', games);
    console.log('times: ', times);

    const hanldeInitModels = (numOfTeams, numOfGames) => {
        const newTeams = initTeams(numOfTeams);
        const newGames = initGames(numOfGames);
        const newTimes = initTimes(numOfTeams, numOfGames);
        setTeams(newTeams);
        setGames(newGames);
        setTimes(newTimes);
    };

    return (
        <div className={css('wrapper')}>
            <div className={css('sidebar')}>
                <GameInitializer onInitModels={hanldeInitModels} />
                <Scoreboard />
            </div>
            <div className={css('content')}>
                <div className={css('content-wrapper')}>
                    <h1 className={css('heading')}>Game Status</h1>
                    <div className={css('content-inner')}>
                        <GameControl />
                        <GameControl />
                        <GameControl />
                        <GameControl />
                        <GameControl />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game;
