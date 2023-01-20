import React from "react";
import Form from "rc-field-form";
import _ from "lodash";

import Request from "common/endpoint/fetch-service";
import { BaseModal } from "components/base-modal/BaseModal";
import { FormField } from "common/form/FormField";
import {
  TextInput,
  SubmitButton,
  SelectInput,
} from "common/form/field-types";
import { ModalService } from "common/services/modal-service/ModalService";
import { ToastService } from "common/services/toast-service/ToastService";

import { RULES } from "common/form/validations/common-validations";
import api from "services/api";

function TaskModal(props) {
  const isEditMode = !_.isEmpty(props.data.initialData);

  const handleTaskCreation = () => {
    ModalService.closeModal(props.data.id);
    ToastService.showSuccessToast();
  };

  const handleSubmit = async (values) => {
    await api.task.addTask(values.name, values.state, props.data.familyId, values.assigneeName).then(response => {
      if (response.ok) {
        handleTaskCreation();
      }
    });
  };

  return (
    <Form initialValues={props.data.initialData} onFinish={handleSubmit}>
      <BaseModal
        id={props.data.id}
        width={50}
        height={70}
        title={"Task"}
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
          <TextInput />
        </FormField>
        <FormField
          label={"State"}
          name="state"
          rules={[RULES.required]}
          required
        >
          <SelectInput options={[
            {value: 'PENDING', label: 'PENDING'},
            {value: 'IN_PROGRESS', label: 'IN PROGRESS'},
            {value: 'DONE', label: 'DONE'}
            ]} isMulti={false} isClearable={false}/>
        </FormField>
        <FormField
          label={"Assignee"}
          name="assigneeName"
        >
          <TextInput />
        </FormField>
      </BaseModal>
    </Form>
  );
}

export { TaskModal };
