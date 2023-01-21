import React, {useState} from 'react';
import Form from "rc-field-form";
import {Alert} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import _ from 'lodash';

import {Panel} from 'components/layout/Panel';
import { FormField } from 'common/form/FormField';
import {SubmitButton, TextInput} from 'common/form/field-types';
import {Link} from 'components/link/Link';

import { RULES } from "common/form/validations/common-validations";
import {PAGES} from 'configs/routes';

import 'FormFields.scss';
import registerIll from 'static/ill_form.jpg';
import api from 'services/api';

function Register() {
    const [alertPayload, setAlertPayload] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const history = useHistory();

    const handleFormSubmit = async (values) => {
       await api.user.addUser(values.name, values.password).then((response => {
            if (response.ok) {
                history.push(PAGES.login);
            }
       })).catch(errResponse => {
                setAlertPayload(_.get(errResponse, 'message', 'Unknown Error'));
                setShowAlert(true);
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
            <Form onFinish={handleFormSubmit}>
                <FormField
                    label="Name"
                    name="name"
                    rules={[RULES.required]}
                    required
                >
                    <TextInput />
                </FormField>
                <FormField
                    label="Password"
                    name="password"
                    rules={[RULES.required]}
                    required
                >
                    <TextInput />
                </FormField>
                <Link onClick={() => history.push(PAGES.login)}>
                    Already have an account? Click here to login
                </Link>
                <br />
                <SubmitButton>Register</SubmitButton>
            </Form>
        </Panel>
    );
}

export {Register};
