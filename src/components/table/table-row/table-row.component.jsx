import classNamesBinding from 'classnames/bind';

import TableCell from '../table-cell/table-cell.component';
import styles from './table-row.module.scss';

const css = classNamesBinding.bind(styles);

const TableRow = ({ row }) => {
    console.log(row);
    return (
        <div className={css('wrapper')}>
            {row.map((cell, index) => (
                <TableCell key={index}>{cell}</TableCell>
            ))}
        </div>
    );
};

export default TableRow;
