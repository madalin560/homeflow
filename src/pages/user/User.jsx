import React, {useEffect, useState, useCallback} from 'react';
import {Button} from "react-bootstrap";

import {Panel} from 'components/layout/Panel';
import {Loader} from 'components/loader/Loader';
import {Link} from 'components/link/Link';
import {ResetPasswordModal} from './page-components/ResetPasswordModal';

import api from 'services/api';
import {useToggle} from 'utils/hook-utils';
import Cookie from 'services/cookies/Cookie';
import {ModalService} from 'common/services/modal-service/ModalService';
import {MODAL_TYPES} from 'configs/modal-config';

import 'FormFields.scss';

function User() {
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, toggleModal] = useToggle();

    const EditProfileButton = (
        <Button size="lg" onClick={() => {
            ModalService.openModal({
                type: MODAL_TYPES.PROFILE_MODAL,
                data: {
                    initialData: userData
                }
            });
        }}>
            Edit profile
        </Button>
    );

    useEffect(
        async () => {
            await api.user.getUser(Cookie.getCookieByName('NAME')).then(async result => {
                if (result.ok) {
                    const user = await result.json();
                    setUserData(user);
                    setIsLoading(false);
                }
            })
        },
        []
    );

    const userPanel = useCallback(
        (panelSize) => (
            <Panel size={panelSize} title={'My account'} actionButtons={EditProfileButton}>
                <div>Name: {userData.name}</div>
                <div>Email: {userData.email}</div>
                <br />
                <Link onClick={toggleModal}>Change my password</Link>
            </Panel>
        ),
        [toggleModal, userData]
    );

    if (isLoading) {
        return <Loader />;
    }

    return (
        <React.Fragment>
            {userPanel(Panel.SIZE.FLUID)}
            <ResetPasswordModal showModal={showModal} toggleModal={toggleModal} />
        </React.Fragment>
    );
}

export {User};
