import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {Alert, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import _ from 'lodash';

import {Link} from 'components/link/Link';
import {Panel} from 'components/layout/Panel';
import Endpoint from 'services/api/endpoint';
import Cookie from 'services/cookies/Cookie';

import {ACTION_TYPES} from 'state/actions';
import {PAGES} from 'configs/routes';

import 'FormFields.scss';
import loginIll from 'static/ill_form.jpg';

function Login(props) {
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const handleFormSubmit = (values, {setSubmitting}) => {
        Endpoint.api.login({...values})
            .then(response => {
                setSubmitting(false);

                Cookie.setCookie('AUTH', `Bearer ${response.token}`)
                dispatch({type: ACTION_TYPES.SET_USER, payload: response})

                history.push(PAGES.dashboard);
            })
            .catch(errResponse => {
                setSubmitting(false);
                setErrorMessage(_.get(errResponse, 'message', 'Unknown Error'));
            });
    }

    return (
        <Panel size={Panel.SIZE.AUTO}>
            <img className="panel-top-image" src={loginIll} alt='login' />
            {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
            <Formik
                initialValues={{ email: '', password: '' }}
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
                onSubmit={handleFormSubmit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <div className="form-field">
                            <label>Email</label>
                            <Field type="email" name="email" />
                            <ErrorMessage name="email" component="div" />
                        </div>
                        <div className="form-field">
                            <label>Password</label>
                            <Field type="password" name="password" />
                            <ErrorMessage name="password" component="div" />
                        </div>
                        <br />
                        <Link onClick={() => history.push(PAGES.register)}>
                            Don't have an account? Click here to sign up
                        </Link>
                        <Link onClick={() => history.push(PAGES.resetPassword)}>
                            Forgot your password? Click here to recover your account
                        </Link>
                        <br />
                        <Button type="submit" disabled={isSubmitting} variant="primary">Sign In</Button>
                    </Form>
                )}
            </Formik>
        </Panel>
    );
}

export {Login};
