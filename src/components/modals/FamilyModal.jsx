import React from "react";
import Form from "rc-field-form";
import _ from "lodash";

import Request from "common/endpoint/fetch-service";
import { BaseModal } from "components/base-modal/BaseModal";
import { FormField } from "common/form/FormField";
import {
  TextInput,
  SubmitButton,
} from "common/form/field-types";
import { ModalService } from "common/services/modal-service/ModalService";
import { ToastService } from "common/services/toast-service/ToastService";

import { RULES } from "common/form/validations/common-validations";

function FamilyModal(props) {
  const isEditMode = !_.isEmpty(props.data.initialData);

  const handleCollegeCreation = () => {
    ModalService.closeModal(props.data.id);
    ToastService.showSuccessToast();
  };

  const handleSubmit = (values) => {
    const payload = {
      ...values,
      collegeId: props.data.initialData.collegeId,
    };

    const Endpoint = isEditMode
      ? Request.apiHandler.editCollege
      : Request.apiHandler.addCollege;

    Endpoint(payload)
      .then(handleCollegeCreation)
      .catch((reason) => ToastService.showErrorToast(reason));
  };

  return (
    <Form initialValues={props.data.initialData} onFinish={handleSubmit}>
      <BaseModal
        id={props.data.id}
        width={50}
        height={90}
        title={"Task"}
        footer={
          <SubmitButton>{"Save"}</SubmitButton>
        }
      >
        <FormField
          label={"Name"}
          name="collegeName"
          rules={[RULES.required]}
          required
        >
          <TextInput />
        </FormField>
        <FormField
          label={"Slug"}
          name="slug"
          rules={[RULES.required]}
          required
        >
          <TextInput />
        </FormField>
      </BaseModal>
    </Form>
  );
}

export { FamilyModal };
