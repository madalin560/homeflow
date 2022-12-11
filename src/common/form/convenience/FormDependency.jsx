import React from "react";
import { Field } from "rc-field-form";

function FormDependency(props) {
  const { dependencies, children } = props;

  return (
    <Field dependencies={dependencies} shouldUpdate={true}>
      {(control, meta, form) => {
        const fields = form.getFieldsValue(dependencies);
        return children(fields, form);
      }}
    </Field>
  );
}

export { FormDependency };
