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

function ProfileModal(props) {

  const handleProfileUpdate = () => {
    ModalService.closeModal(props.data.id);
    ToastService.showSuccessToast();
  };

  const handleSubmit = async (values) => {
    await api.user.updateUser(values.name, values.firstName, values.lastName, values.email, values.phone, values.familyId).then(response => {
        if (response.ok) {
            handleProfileUpdate();
        } else {
          ToastService.showErrorToast();
        }
    })
  };

  return (
    <Form initialValues={props.data.initialData} onFinish={handleSubmit}>
      <BaseModal
        id={props.data.id}
        width={50}
        height={90}
        title={"Profile"}
        footer={
          <SubmitButton>{"Save"}</SubmitButton>
        }
      >
        <FormField
          label={"Name"}
          name="name"
          rules={[RULES.required]}
          required
        >
          <TextInput disabled={true}/>
        </FormField>

        <FormField
          label={"First Name"}
          name="firstName"
          rules={[RULES.required]}
          required
        >
          <TextInput />
        </FormField>

        <FormField
          label={"Last Name"}
          name="lastName"
          rules={[RULES.required]}
          required
        >
          <TextInput />
        </FormField>

        <FormField
          label={"Email"}
          name="email"
          type="email"
        >
          <TextInput />
        </FormField>

        <FormField
          label={"Phone"}
          name="phone"
        >
          <TextInput />
        </FormField>

      </BaseModal>
    </Form>
  );
}

export { ProfileModal };
