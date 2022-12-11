import React, {useState, useEffect, useCallback} from 'react';
import {Button} from 'react-bootstrap';
import _ from 'lodash';

import {Table} from 'components/table/Table';
import {Panel} from 'components/layout/Panel';

import './Dashboard.scss';
import { NoData } from 'components/no-data/NoData';

const COLUMNS = [
    {
        header: 'Name',
        accessor: 'name'
    },
    {
        header: 'Status',
        accessor: 'status'
    },
    {
        header: 'Creation time',
        accessor: 'creationTime'
    },
    {
        header: 'Assigned To',
        accessor: 'assignedTo'
    }
];

const MOCK_DATA = [
    {
        name: 'Task 1',
        status: 'New',
        creationTime: '1 Dec 2022',
        assignedTo: 'Madalin'
    },
    {
        name: 'Task 1',
        status: 'New',
        creationTime: '1 Dec 2022',
        assignedTo: 'Madalin'
    },
    {
        name: 'Task 1',
        status: 'New',
        creationTime: '1 Dec 2022',
        assignedTo: 'Madalin'
    }
];

const AddTaskButton = (
    <Button size="lg" onClick={() => {}}>
        Add new task
    </Button>
);

const CreateFamilyButton = (
    <Button size="lg" onClick={() => {}}>
        Create a family
    </Button>
);

function Dashboard(props) {
    return (
        <React.Fragment>
            <Panel title={'My family'}>
                <NoData action={CreateFamilyButton} />
            </Panel>
            <Panel title={'Tasks in my family'} actionButtons={AddTaskButton}>
                <Table columns={COLUMNS} data={MOCK_DATA} />
            </Panel>
        </React.Fragment>
    );
}

export {Dashboard};
