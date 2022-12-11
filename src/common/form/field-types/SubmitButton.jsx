import React from "react";
import PropTypes from "prop-types";
import { Field } from "rc-field-form";

import { Button } from "components/button/Button";

function SubmitButton(props) {
  return (
    <Field shouldUpdate={true}>
      {(control, meta, form) => (
        <Button
          className={props.className}
          action={form.submit}
          type={Button.TYPES.SECONDARY}
          disabled={
            props.disabled ||
            form.getFieldsError().some((field) => !!field.errors.length)
          }
        >
          {props.children}
        </Button>
      )}
    </Field>
  );
}

SubmitButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export { SubmitButton };
