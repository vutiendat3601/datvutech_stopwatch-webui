import classNamesBinding from 'classnames/bind';

import styles from './table-cell.module.scss';

const css = classNamesBinding.bind(styles);

const TableCell = ({ children }) => {
    return <div className={css('wrapper')}>{children}</div>;
};

export default TableCell;
