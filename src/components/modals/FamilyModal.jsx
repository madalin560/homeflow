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
import api from "services/api";
import Cookie from 'services/cookies/Cookie';

function FamilyModal(props) {
  const isEditMode = !_.isEmpty(props.data.initialData);

  const handleFamilyCreation = () => {
    ModalService.closeModal(props.data.id);
    ToastService.showSuccessToast();
  };

  const handleSubmit = async (values) => {
    await api.family.createFamily(values.familyName, Cookie.getCookieByName('NAME')).then((result) => {
      if(result.ok) {
        handleFamilyCreation();
      }
    })
  };

  return (
    <Form initialValues={props.data.initialData} onFinish={handleSubmit}>
      <BaseModal
        id={props.data.id}
        width={50}
        height={40}
        title={"Family"}
        footer={
          <SubmitButton>{"Save"}</SubmitButton>
        }
      >
        <FormField
          label={"Name"}
          name="familyName"
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
