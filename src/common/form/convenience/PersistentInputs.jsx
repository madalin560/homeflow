import React from "react";
import { Field } from "rc-field-form";

function PersistentInputs({ fields = [], ...props }) {
  return fields.map((fieldName, index) => (
    <Field {...props} key={index} name={fieldName} />
  ));
}

export { PersistentInputs };
