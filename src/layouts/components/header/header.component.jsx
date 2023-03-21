import classNamesBinding from 'classnames/bind';

import Form from '../../../components/form/form.component';
import styles from './header.module.scss';

const css = classNamesBinding.bind(styles);

const Header = () => {
    return (
        <div className={css('wrapper')}>
            <Form
                title={'Create Stopwatch'}
                action={'Create'}
                fields={[
                    {
                        fieldName: 'startTime',
                        label: 'Start time',
                        type: 'time',
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
    );
};

export default Header;
