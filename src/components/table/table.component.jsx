import classNamesBinding from 'classnames/bind';
import TableCell from './table-cell/table-cell.component';
import TableRow from './table-row/table-row.component';

import styles from './table.module.scss';

const css = classNamesBinding.bind(styles);

const Table = ({ rows }) => {
    return (
        <div>
            {rows.map((row, index) => (
                <TableRow
                    className={css('row')}
                    key={index}
                    row={row}
                ></TableRow>
            ))}
        </div>
    );
};

export default Table;
