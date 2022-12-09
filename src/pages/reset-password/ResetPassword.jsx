import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {Button, Alert} from 'react-bootstrap';

import {Panel} from 'components/layout/Panel';
import Endpoint from 'services/api/endpoint';

import 'FormFields.scss';
import loginIll from 'static/ill_form.jpg';

function ResetPassword(props) {
    const [alertPayload, setAlertPayload] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    const handlePasswordReset = (values, {setSubmitting}) => {
        Endpoint.api.resetPassword({email: values.email})
            .then(response => {
                setAlertPayload({
                    type: 'success',
                    message: response.message
                });
                setShowAlert(true);
            })
            .catch(err => {
                setAlertPayload({
                    type: 'danger',
                    message: err.message
                });
                setShowAlert(true);
            })
            .finally(setSubmitting(false));
    };

    return (
        <Panel size={Panel.SIZE.AUTO}>
            <img className="panel-top-image" src={loginIll} alt='login' />
            {showAlert && (
                <Alert variant={alertPayload.type}>
                    {alertPayload.message}
                </Alert>
            )}
            <Formik
                initialValues={{ email: ''}}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={handlePasswordReset}
            >
                {({isSubmitting}) => (
                    <Form>
                        <div className="form-field">
                            <label>Email</label>
                            <Field type="email" name="email" />
                            <ErrorMessage name="email" component="div" />
                        </div>
                        <Button type="submit" disabled={isSubmitting} variant="primary">Reset password</Button>
                    </Form>
                )}
            </Formik>
        </Panel>
    );
}

export {ResetPassword};
