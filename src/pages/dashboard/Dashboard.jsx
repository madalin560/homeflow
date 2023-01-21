import React, {useState, useEffect, useCallback} from 'react';
import {Button} from 'react-bootstrap';
import _, { result } from 'lodash';

import {Table} from 'components/table/Table';
import {Panel} from 'components/layout/Panel';

import './Dashboard.scss';
import { NoData } from 'components/no-data/NoData';
import api from 'services/api';
import Cookie from 'services/cookies/Cookie';
import { ModalService } from "common/services/modal-service/ModalService";
import { MODAL_TYPES } from "../../configs/modal-config"

const COLUMNS = [
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

function Dashboard(props) {

    const [familyId, setFamilyId] = useState('');
    const [user, setUser] = useState({});

    useEffect(async () => {
        await api.user.getUser(Cookie.getCookieByName('NAME')).then(async result => {
            if (result.ok) {
                const user = await result.json();
                setFamilyId(user.familyId);
                setUser(user);
            }
        }).catch(err => {
            console.error(err);
        }); 
    }, []);

    const AddTaskButton = (
        <Button size="lg" onClick={() => {
            ModalService.openModal({
                type: MODAL_TYPES.TASK_MODAL,
                data: {
                    familyId: familyId
                }
            });
        }}>
            Add new task
        </Button>
    );
    
    const CreateFamilyButton = (
        <Button size="lg" onClick={() => {
            ModalService.openModal({
                type: MODAL_TYPES.FAMILY_MODAL,
            });
        }}>
            Create a family
        </Button>
    );

    const EditProfileButton = (
        <Button size="lg" onClick={() => {
            ModalService.openModal({
                type: MODAL_TYPES.PROFILE_MODAL,
                data: {
                    initialData: user
                }
            });
        }}>
            Edit profile
        </Button>
    );

    return (
        <React.Fragment>
            {
            !familyId?
            <Panel title={'My family'}>
                <NoData action={CreateFamilyButton} />
            </Panel>
            :
            <Panel title={'Tasks in my family'} actionButtons={[AddTaskButton, EditProfileButton]}>
                <Table columns={COLUMNS} familyId={familyId}/>
            </Panel>
            }
        </React.Fragment>
    );
}

export {Dashboard};
