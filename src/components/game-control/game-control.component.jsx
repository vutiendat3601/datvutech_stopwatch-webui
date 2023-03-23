import classNamesBinding from 'classnames/bind';

import Button from '../button/button.component';
import styles from './game-control.module.scss';

const css = classNamesBinding.bind(styles);

const GameControl = ({ teams, game, times }) => {
    return (
        <div className={css('wrapper')}>
            <div className={css('inner')}>
                <h1 className={css('heading')}>Game 1</h1>
                <h1 className={css('time')}>
                    00:00:00
                    <Button className={css('btn-in-cell')} primary>
                        Start
                    </Button>
                </h1>
                <div className={css('records')}>
                    <div className={css('col-2')}>
                        <div className={css('cell')}>
                            <h1 className={css('col-label')}>Team</h1>
                        </div>
                        <div className={css('cell')}>
                            <h3>Team 1asdfasdfasdf</h3>
                        </div>
                        <div className={css('cell')}>
                            <h3>Team 2</h3>
                        </div>
                    </div>
                    <div className={css('col-3')}>
                        <div className={css('cell')}>
                            <h1 className={css('col-label')}>Time</h1>
                        </div>
                        <div className={css('cell')}>
                            <h3>01:01:78</h3>
                            <Button primary>Stop</Button>
                        </div>
                        <div className={css('cell')}>
                            <h3>01:04:71</h3>
                            <Button primary>Stop</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameControl;
