import React from "react";
import { mount } from "enzyme";
import Form from "rc-field-form";

import { FormField } from "./FormField";
import { TextInput } from "./field-types/TextInput";
import { SubmitButton } from "./field-types/SubmitButton";

import { RULES } from "./validations/common-validations";
import { TEXT } from "../../constants/dictionary";

describe("Form field tests", () => {
  let form;
  mount(
    <div>
      <Form
        ref={(instance) => {
          form = instance;
        }}
      >
        <FormField
          label="lectureHours"
          name="lectureHours"
          rules={[RULES.required, RULES.integer]}
          required
        >
          <TextInput />
        </FormField>
        <SubmitButton />
      </Form>
    </div>
  );

  it("Should trigger validation", async () => {
    try {
      await form.validateFields();
    } catch (errorList) {
      expect(errorList.errorFields[0]).toEqual({
        name: ["lectureHours"],
        errors: [TEXT.fieldIsRequired, TEXT.fieldMustBeANumericValue],
        warnings: [],
      });
    }
  });
});
