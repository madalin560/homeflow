import React, {useEffect, useState} from 'react';

import {Table} from 'components/table/Table';

import api from 'services/api';
import {ModalService} from 'common/services/modal-service/ModalService';
import {MODAL_TYPES} from 'configs/modal-config';

const TASK_COLUMNS = [
    {
        header: 'Name',
        accessor: 'name'
    },
    {
        header: 'Status',
        accessor: 'state'
    },
    {
        header: 'Assigned To',
        accessor: 'assigneeName'
    },
    {
        header: 'Edit',
        accessor: 'edit'
    }
];

function TasksTable({familyId}) {
    const [tasks, setTasks] = useState([]);

    const fetchData = async () => {
        await api.task.getTasksInFamily(familyId).then(async (response) => {
            if (response.ok) {
                const list = await response.json();
                setTasks(list);
            }
        })
    };

    const editTask = (row) => {
        ModalService.openModal({
            type: MODAL_TYPES.TASK_MODAL,
            data: {
                familyId: familyId,
                taskId: row.id,
                initialData: {...row},
                saveCallback: fetchData
            }
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Table
            data={tasks}
            columns={TASK_COLUMNS}
            editAction={editTask}
        />
    );
}

export {TasksTable};
