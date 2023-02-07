import React, {useMemo} from 'react';
import {Button} from 'react-bootstrap';

import './Table.scss';

function Table({data = [], columns = [], editAction = () => {}}) {
    const headers = useMemo(
        () => (
            columns.map(column => (
                <th>{column.header}</th>
            ))
        ),
        [columns]
    );

    const rows = useMemo(
        () => (
            data.map((row, index) => (
                <tr>
                    {
                        columns.map(column => column.accessor !== 'index' ?
                            (
                                column.accessor !== 'edit' ?
                                <td data-column={`${column.header}`}>{row[column.accessor]}</td>
                                :
                                <td><Button onClick={() => {editAction(row)}}>{column.header}</Button></td>
                            ) :
                            (
                                <td data-column={`${column.header}`}>{index + 1}</td>
                            )
                        )
                    }
                </tr>
            ))
        ),
        [data, columns]
    );

    return (
        <table>
            <thead>
                <tr>
                    {headers}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

export {Table};
