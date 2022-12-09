import React, {useCallback, useState} from 'react';
import {Button, Modal, Alert} from 'react-bootstrap';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import _ from 'lodash';

import Endpoint from 'services/api/endpoint';
import Cookie from 'services/cookies/Cookie';

import {ACTION_TYPES} from 'state/actions';
import {PAGES} from 'configs/routes';

function ResetPasswordModal({showModal, toggleModal}) {
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const signOut = useCallback(
        () => {
            Cookie.deleteCookie('AUTH');
            dispatch({type: ACTION_TYPES.SET_USER, payload: ''})

            history.push(PAGES.login);
        },
        [dispatch, history]
    );

    const handleFormSubmit = (values) => {
        Endpoint.api.changePassword(values)
            .then(signOut)
            .catch(errResponse => {
                setErrorMessage(_.get(errResponse, 'message', 'Unknown Error'));
            });
    }

    return (
        <Modal
            show={showModal}
            onHide={toggleModal}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Change your password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                <Formik
                    initialValues={{ oldPassword: '', newPassword: '' }}
                    validate={values => {
                        const errors = {};

                        if(!values.oldPassword) {
                            errors.oldPassword = 'Required';
                        } else if(!values.newPassword) {
                            errors.newPassword = 'Required';
                        }

                        return errors;
                    }}
                    onSubmit={handleFormSubmit}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <div className="form-field">
                                <label>Old Password</label>
                                <Field type="password" name="oldPassword" />
                                <ErrorMessage name="oldPassword" component="div" />
                            </div>
                            <div className="form-field">
                                <label>New Password</label>
                                <Field type="password" name="newPassword" />
                                <ErrorMessage name="newPassword" component="div" />
                            </div>
                            <br />
                            <Button type="submit" disabled={isSubmitting} variant="primary">Reset Password</Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export {ResetPasswordModal};
