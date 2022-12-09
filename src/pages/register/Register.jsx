import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {Alert, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import _ from 'lodash';

import {Link} from 'components/link/Link';
import {Panel} from 'components/layout/Panel';
import Endpoint from 'services/api/endpoint';

import {PAGES} from 'configs/routes';

import 'FormFields.scss';
import registerIll from 'static/ill_form.jpg';

function Register() {
    const [alertPayload, setAlertPayload] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const history = useHistory();

    const handleFormSubmit = (values, {setSubmitting}) => {
        Endpoint.api.register({...values, isAdmin: false})
            .then(response => {
                history.push(PAGES.login)
                setSubmitting(false);
            })
            .catch(errResponse => {
                setAlertPayload(_.get(errResponse, 'message', 'Unknown Error'));
                setShowAlert(true);
                setSubmitting(false);
            });
    }

    return (
        <Panel size={Panel.SIZE.AUTO}>
            <img className="panel-top-image" src={registerIll} alt='register' />
            {showAlert && (
                <Alert variant={'danger'}>
                    {alertPayload}
                </Alert>
            )}
            <Formik
                initialValues={{ email: '', password: '', lastName: '', firstName: '' }}
                validate={(values) => {
                    const errors = {};
                    const fields = Object.keys(values);

                    fields.forEach(fieldValue => {
                        if(!values[fieldValue]) {
                            errors[fieldValue] = 'Required';
                        }
                    });

                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }

                    return errors;
                }}
                onSubmit={handleFormSubmit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <div className="form-field">
                            <label>Email Address</label>
                            <Field type="email" name="email" />
                            <ErrorMessage name="email" component="div" />
                        </div>
                        <div className="form-field">
                            <label>First Name</label>
                            <Field type="text" name="firstName" />
                            <ErrorMessage name="firstName" component="div" />
                        </div>
                        <div className="form-field">
                            <label>Last Name</label>
                            <Field type="text" name="lastName" />
                            <ErrorMessage name="lastName" component="div" />
                        </div>
                        <div className="form-field">
                            <label>Password</label>
                            <Field type="password" name="password" />
                            <ErrorMessage name="password" component="div" />
                        </div>
                        <br />
                        <Link onClick={() => history.push(PAGES.login)}>
                            Already have an account? Click here to login
                        </Link>
                        <br />
                        <Button type="submit" disabled={isSubmitting} variant="primary">Submit</Button>
                    </Form>
                )}
            </Formik>
        </Panel>
    );
}

export {Register};
