import React, {useMemo, useState} from 'react';
import { useEffect } from 'react';
import api from 'services/api';

import './Table.scss';

function Table(props) {

    const [tasks, setTasks] = useState([]);

    useEffect(async () => {
        await api.task.getTasksInFamily(props.familyId).then(async (response) => {
            if (response.ok) {
                const list = await response.json();
                console.log(list)
                setTasks(list);
            }
        })
    }, [])

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
            tasks.map((row, index) => (
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
        [tasks, props.columns]
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
