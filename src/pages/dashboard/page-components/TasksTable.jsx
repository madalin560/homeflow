import React, {useEffect, useState} from 'react';

import { Task } from 'components/task/Task';
import {ToastService} from "common/services/toast-service/ToastService";
import api from 'services/api';
import {ModalService} from 'common/services/modal-service/ModalService';
import {MODAL_TYPES} from 'configs/modal-config';
import { Button } from "react-bootstrap";


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


    async function deleteTask(id) {
        await api.task.deleteTask(id).then(response => {
          if (response.ok) {
            setTasks(tasks.filter(t => t.id !== id))
          } else {
            ToastService.showErrorToast();
          }
        })
    }

    function filterTasks(state) {
        return tasks.filter(t => t.state === state).map(task => (
            <Task name={task.name} assigneeName={task.assigneeName} editAction={() => {editTask(task)}} deleteAction={() => deleteTask(task.id)} key={task.id}/>
        ))
    }

    return (
        <>
        <Button
            size="lg"
            onClick={() => {
                ModalService.openModal({
                    type: MODAL_TYPES.TASK_MODAL,
                    data: {
                        familyId: familyId,
                        saveCallback: fetchData
                    }
                });
            }}
            disabled={!familyId}
        >
            Add new task
        </Button>
        <div className="taskCols">
            <div className='columnContainer'>
                <p className="columnTitle">Pending</p>
                <div className="column">
                    {filterTasks("PENDING")}
                </div>
            </div>
            <div className='columnContainer'>
                <p className="columnTitle">In Progress</p>
                <div className="column">
                    {filterTasks("IN_PROGRESS")}
                </div>
            </div>
            <div className='columnContainer'>
                <p className="columnTitle">Completed</p>
                <div className="column">
                    {filterTasks("DONE")}
                </div>
            </div>
        </div>
        </>
    );
}

export {TasksTable};
