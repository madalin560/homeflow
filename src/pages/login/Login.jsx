import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {Alert, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux'

import {Link} from 'components/link/Link';
import {Panel} from 'components/layout/Panel';
import Cookie from 'services/cookies/Cookie';
import api from '../../services/api';

import {ACTION_TYPES} from 'state/actions';
import {PAGES} from 'configs/routes';

import 'FormFields.scss';
import loginIll from 'static/ill_form.jpg';

function Login(props) {
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const handleFormSubmit = async (values, {setSubmitting}) => {
        await api.user.login(values.name, values.password).then(async (response) => {
            setSubmitting(false);

            if (response.ok) {
                const parsedUserData = await response.json();
                Cookie.setCookie('AUTH', Buffer.from(values.name + ":" + values.password).toString('base64'));
                Cookie.setCookie('NAME', values.name)
                Cookie.setCookie('ROLE', parsedUserData.role);

                dispatch({type: ACTION_TYPES.SET_USER, payload: parsedUserData})
                history.push(PAGES.dashboard);
            } else {
                setErrorMessage('Wrong credentials')
            }
        });
    }

    return (
        <Panel size={Panel.SIZE.AUTO}>
            <img className="panel-top-image" src={loginIll} alt='login' />
            {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
            <Formik
                initialValues={{ name: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = 'Name is required';
                    }
                    if (!values.password) {
                        errors.name = 'Password is required';
                    }
                    return errors;
                }}
                onSubmit={handleFormSubmit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <div className="form-field">
                            <label>Email</label>
                            <Field name="name" />
                            <ErrorMessage name="name" component="div" />
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
