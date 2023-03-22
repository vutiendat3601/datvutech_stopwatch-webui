import classNamesBinding from 'classnames/bind';

import Form from '../../../components/form/form.component';
import styles from './header.module.scss';

const css = classNamesBinding.bind(styles);

const Header = ({ onInitModels }) => {
    const handleOnSubmit = (fieldDatas) => {
        const numOfTeam = fieldDatas.get('numOfTeam');
        const numOfGame = fieldDatas.get('numOfGame');
        onInitModels(numOfTeam, numOfGame);
    };

    return (
        <div className={css('wrapper')}>
            <div className={css('inner')}>
                <Form
                    title={'Create Stopwatch'}
                    action={'Create'}
                    onSubmit={handleOnSubmit}
                    fields={[
                        {
                            fieldName: 'numOfGame',
                            label: 'Number of game',
                            type: 'number',
                            message: '',
                        },
                        {
                            fieldName: 'numOfTeam',
                            label: 'Number of teams',
                            type: 'number',
                            message: '',
                        },
                    ]}
                ></Form>
            </div>
        </div>
    );
};

export default Header;
