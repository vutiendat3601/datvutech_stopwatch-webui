import classNamesBinding from 'classnames/bind';

import Button from '../button/button.component';
import { getLeadingZeroNumber } from '../../utils/TextUtils';
import styles from './scoreboard.module.scss';

const css = classNamesBinding.bind(styles);

const Scoreboard = () => {
    return (
        <div className={css('wrapper')}>
            <div className={css('inner')}>
                <h1 className={css('heading')}>Game 1</h1>
                <div className={css('chooser')}>
                    <h1>Choose game</h1>
                    <select className={css('options')}>
                        <option>Game 1</option>
                        <option>Game 2</option>
                        <option>Game 3</option>
                        <option>Summary</option>
                    </select>
                </div>
                <div className={css('records')}>
                    <div className={css('col-1')}>
                        <div className={css('cell')}>
                            <h1 className={css('col-label')}>Rank</h1>
                        </div>
                        <div className={css('cell')}>
                            <h3>1</h3>
                        </div>
                        <div className={css('cell')}>
                            <h3>2</h3>
                        </div>
                    </div>
                    <div className={css('col-2')}>
                        <div className={css('cell')}>
                            <h1 className={css('col-label')}>Team</h1>
                        </div>
                        <div className={css('cell')}>
                            <h3>Team 1asdfasdfasdfasd</h3>
                        </div>
                        <div className={css('cell')}>
                            <h3>Team 2asdfasdfasdfasd</h3>
                        </div>
                    </div>
                    <div className={css('col-3')}>
                        <div className={css('cell')}>
                            <h1 className={css('col-label')}>Time</h1>
                        </div>
                        <div className={css('cell')}>
                            <h3>01:01:78</h3>
                        </div>
                        <div className={css('cell')}>
                            <h3>01:04:71</h3>
                        </div>
                    </div>
                    <div className={css('col-3')}>
                        <div className={css('cell')}>
                            <h1 className={css('col-label')}>Point</h1>
                        </div>
                        <div className={css('cell')}>
                            <h3>100</h3>
                        </div>
                        <div className={css('cell')}>
                            <h3>80</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scoreboard;
