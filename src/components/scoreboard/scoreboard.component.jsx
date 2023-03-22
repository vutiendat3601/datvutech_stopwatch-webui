import classNamesBinding from 'classnames/bind';

import Button from '../button/button.component';
import { getLeadingZeroNumber } from '../../utils/TextUtils';
import styles from './scoreboard.module.scss';

const css = classNamesBinding.bind(styles);

const Scoreboard = ({ teams, games, times, onStartGame, onStopTeamTime }) => {
    return (
        <div className={css('scoreboard')}>
            <h1 className={css('scoreboard-heading')}>Scoreboard</h1>
            <table className={css('team-data')}>
                <thead>
                    <tr>
                        <th>Team</th>
                        {games.map((game) => (
                            <th key={game.gameId}>
                                <div className={css('cell-with-button')}>
                                    <h1>{game.name}</h1>
                                    <Button
                                        className={css('btn-stop')}
                                        primary
                                        onClick={(e) =>
                                            onStartGame(game.gameId)
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
                    {teams.map((team) => {
                        const teamTime = times.filter(
                            (time) => time.teamId === team.teamId
                        );
                        return (
                            <tr key={team.teamId}>
                                <td>
                                    <h1>{team.name}</h1>
                                </td>
                                {teamTime.map((time, index) => {
                                    const { value } = time;
                                    return (
                                        <td key={index}>
                                            <div
                                                className={css(
                                                    'cell-with-button'
                                                )}
                                            >
                                                <h1 className={css('time')}>
                                                    {`${getLeadingZeroNumber(
                                                        value.min,
                                                        2
                                                    )}:${getLeadingZeroNumber(
                                                        value.sec,
                                                        2
                                                    )}:${getLeadingZeroNumber(
                                                        value.ms,
                                                        2
                                                    )}`}
                                                </h1>
                                                <Button
                                                    className={css('btn-stop')}
                                                    primary
                                                    onClick={(e) => {
                                                        onStopTeamTime(
                                                            time.teamId,
                                                            time.gameId
                                                        );
                                                    }}
                                                >
                                                    Stop
                                                </Button>
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Scoreboard;
