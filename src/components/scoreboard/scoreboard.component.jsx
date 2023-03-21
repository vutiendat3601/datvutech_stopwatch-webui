import classNamesBinding from 'classnames/bind';
import Button from '../button/button.component';

import { getLeadingZeroNumber } from '../../utils/TextUtils';
import styles from './scoreboard.module.scss';

const css = classNamesBinding.bind(styles);

const Scoreboard = ({ teams, games, stopwatchs }) => {

    const handleStartGame = (gameId) => {
        const gameTimer = games.find((game) => game.id == gameId);
        const sw = stopwatchs.find((sw) => sw.gameId == gameId);
        sw.engine.start();
    };

    return (
        <div className={css('scoreboard')}>
            <h1 className={css('scoreboard-heading')}>Scoreboard</h1>
            <table className={css('team-data')}>
                <thead>
                    <tr>
                        <th>Team</th>
                        {games.map((game) => (
                            <th key={game.id}>
                                <div className={css('cell-with-button')}>
                                    <h1>{game.title}</h1>
                                    <Button
                                        className={css('btn-stop')}
                                        primary
                                        onClick={(e) =>
                                            handleStartGame(game.id)
                                        }
                                    >
                                        {game.playing ? 'Stop' : 'Start'}
                                    </Button>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team, index) => (
                        <tr>
                            <td>
                                <h1>{team.name}</h1>
                            </td>
                            {team.timers.map((timer) => {
                                return (
                                    <td>
                                        <div
                                            className={css('cell-with-button')}
                                        >
                                            <h1 className={css('time')}>
                                                {`${getLeadingZeroNumber(
                                                    timer.time.min,
                                                    2
                                                )}:${getLeadingZeroNumber(
                                                    timer.time.sec,
                                                    2
                                                )}:${getLeadingZeroNumber(
                                                    timer.time.ms,
                                                    2
                                                )}`}
                                            </h1>
                                            <Button
                                                className={css('btn-stop')}
                                                primary
                                            >
                                                Stop
                                            </Button>
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Scoreboard;
