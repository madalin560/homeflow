import React, {useMemo} from 'react';

import './Table.scss';

function Table(props) {
    const headers = useMemo(
        () => (
            props.columns.map(column => (
                <th>{column.header}</th>
            ))
        ),
        [props.columns]
    );

    const rows = useMemo(
        () => (
            props.data.map((row, index) => (
                <tr>
                    {
                        props.columns.map(column => column.accessor !== 'index' ?
                            (
                                <td data-column={`${column.header}`}>{row[column.accessor]}</td>
                            ) :
                            (
                                <td data-column={`${column.header}`}>{index + 1}</td>
                            )
                        )
                    }
                </tr>
            ))
        ),
        [props.data, props.columns]
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
