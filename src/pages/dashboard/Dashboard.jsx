import React, {useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';

import {Panel} from 'components/layout/Panel';
import {NoData} from 'components/no-data/NoData';
import {TasksTable} from './page-components/TasksTable';
import {FamilyTable} from './page-components/FamilyTable';

import api from 'services/api';
import Cookie from 'services/cookies/Cookie';
import {ModalService} from 'common/services/modal-service/ModalService';
import {MODAL_TYPES} from 'configs/modal-config';

import './Dashboard.scss';
import {ToastService} from "../../common/services/toast-service/ToastService";

function Dashboard(props) {
    const [familyId, setFamilyId] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [user, setUser] = useState({});

    useEffect(async () => {
        await api.user.getUser(Cookie.getCookieByName('NAME')).then(async result => {
            if (result.ok) {
                const user = await result.json();
                setFamilyId(user.familyId);
                setUser(user);
                await getFamilyNameAndSetIt(user.familyId);
            }
        }).catch(err => {
            ToastService.showErrorToast("Request failed");
        });
    }, []);

    async function getFamilyNameAndSetIt(familyId) {
        await api.family.getFamilyById(familyId).then(async result => {
            const family = await result.json();
            setFamilyName(family.name);
        }).catch(err => {
            console.log(err);
        });
    }

    const AddTaskButton = (
        <Button
            size="lg"
            onClick={() => {
                ModalService.openModal({
                    type: MODAL_TYPES.TASK_MODAL,
                    data: {
                        familyId: familyId
                    }
                });
            }}
            disabled={!familyId}
        >
            Add task
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

    const FamilyActions = (
        <div style={{display: 'flex', gap: '8px'}}>
            <Button size='lg' onClick={() => {
                ModalService.openModal({
                    type: MODAL_TYPES.REMOVE_USER_MODAL,
                    data: {
                        familyId: familyId
                    }
                })
            }}>
                Remove user from family
            </Button>
            <Button size='lg' onClick={() => {
                ModalService.openModal({
                    type: MODAL_TYPES.ADD_USER_MODAL,
                    data: {
                        familyId: familyId
                    }
                })
            }}>
                Add user to family
            </Button>
        </div>
    )

    return (
        <React.Fragment>
            <Panel title={'My family'} actionButtons={FamilyActions}>
                {!familyId
                    ? <NoData action={CreateFamilyButton} />
                    : <FamilyTable familyId={familyId}/>}
            </Panel>
            <Panel title={'Tasks in ' + familyName} actionButtons={AddTaskButton}>
                {!familyId
                    ? <NoData action={CreateFamilyButton} />
                    : <TasksTable familyId={familyId}/>}
            </Panel>
        </React.Fragment>
    );
}

export {Dashboard};
