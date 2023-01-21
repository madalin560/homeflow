import React, {useMemo, useState} from 'react';
import { useEffect } from 'react';
import {Button} from 'react-bootstrap';
import { ModalService } from "common/services/modal-service/ModalService";
import { MODAL_TYPES } from "../../configs/modal-config"
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

    const editTask = (row) => {
        ModalService.openModal({
            type: MODAL_TYPES.TASK_MODAL,
            data: {
                familyId: props.familyId,
                taskId: row.id,
                initialData: {
                    name: row.name,
                    state: row.state,
                    assigneeName: row.assigneeName
                }
            }
        });
    }

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
                                column.accessor !== 'edit' ?
                                <td data-column={`${column.header}`}>{row[column.accessor]}</td>
                                :
                                <td><Button onClick={() => {editTask(row)}}>{column.header}</Button></td>
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
