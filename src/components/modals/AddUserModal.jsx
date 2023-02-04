import React from "react";
import Form from "rc-field-form";
import _ from "lodash";
import { BaseModal } from "components/base-modal/BaseModal";
import { FormField } from "common/form/FormField";
import {
  TextInput,
  SubmitButton,
} from "common/form/field-types";
import { ModalService } from "common/services/modal-service/ModalService";
import { ToastService } from "common/services/toast-service/ToastService";

import { RULES } from "common/form/validations/common-validations";
import api from "services/api";

function AddUserModal(props) {
    const handleUserAdded = () => {
        ModalService.closeModal(props.data.id);
        ToastService.showSuccessToast();
    };

    const handleSubmit = async (values) => {
        await api.family.addToFamily(props.data.familyId, values.username).then((result) => {
          if (result.ok) {
            handleUserAdded();
          } else {
            ToastService.showErrorToast();
          }
        })
    };

    return (
        <Form onFinish={handleSubmit}>
            <BaseModal
                id={props.data.id}
                width={50}
                height={30}
                title={"Add user to family"}
                footer={
                    <SubmitButton>{"Ok"}</SubmitButton>
                }
            >
                <FormField
                    label={"Username"}
                    name="username"
                    rules={[RULES.required]}
                    required
                >
                <TextInput />
                </FormField>
            </BaseModal>
        </Form>
    );
}

export { AddUserModal };