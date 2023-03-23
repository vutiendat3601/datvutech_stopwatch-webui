import classNamesBinding from 'classnames/bind';

import FormGroup from '../form-group/form-group.component';
import Button from '../button/button.component';
import styles from './game-initializer.module.scss';
import { useState } from 'react';

const css = classNamesBinding.bind(styles);
const GameInitializer = ({ onInitModels }) => {
    const [numOfTeams, setNumOfTeams] = useState(1);
    const [numOfGames, setNumOfGames] = useState(1);

    const handleCreate = () => {
        onInitModels(numOfTeams, numOfGames);
    };

    return (
        <div className={css('wrapper')}>
            <h3 className={css('title')}>Khởi tạo game</h3>
            <p className={css('description')}>
                Nhập số lượng đội, số lượng trò chơi, sau đó click vào nút Tạo
            </p>
            <div className={css('spacer')}></div>
            <FormGroup
                title="Số lượng đội"
                type={'number'}
                value={numOfTeams}
                onChange={(e) => setNumOfTeams(e.target.value)}
            ></FormGroup>
            <FormGroup
                title="Số lượng trò chơi"
                type={'number'}
                value={numOfGames}
                onChange={(e) => setNumOfGames(e.target.value)}
            ></FormGroup>
            <Button
                primary
                className={css('btn-create')}
                onClick={handleCreate}
            >
                Tạo
            </Button>
        </div>
    );
};

export default GameInitializer;
