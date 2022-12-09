import React, {useState, useEffect, useCallback} from 'react';
import _ from 'lodash';

import {Table} from 'components/table/Table';
import {Panel} from 'components/layout/Panel';

import './Dashboard.scss';

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

function Dashboard(props) {
    return (
        <React.Fragment>
            <Panel title={'My family'}>
                
            </Panel>
            <Panel title={'My Tasks'}>
                <Table columns={COLUMNS} data={MOCK_DATA} />
            </Panel>
        </React.Fragment>
    );
}

export {Dashboard};
