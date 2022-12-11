import React from "react";
import PropTypes from "prop-types";
import { Field } from "rc-field-form";
import _ from "lodash";

import { FieldDecorator } from "./decorators/FieldDecorator";

import "./Form.scss";

function FormField(props) {
  const {
    onChange = () => {},
    valuePropName = "value",
    trigger = "onChange",
    children,
    className,
    label,
    required,
    validateTrigger = "onChange",
    rules = [],
    name,
    externalValue,
  } = props;

  return (
    <Field
      {...props}
      valuePropName={valuePropName}
      validateTrigger={validateTrigger}
      trigger={trigger}
      name={name}
      rules={rules}
    >
      {(control, meta, form) => {
        const { errors, touched } = meta;
        const hasErrors = !!errors.length;
        const changeEvent = (value) => {
          onChange(control[valuePropName], value, form);
          control[trigger](value);
        };

        const newControl = {
          [trigger]: changeEvent,
          [valuePropName]: _.isNil(control[valuePropName])
            ? externalValue
            : control[valuePropName],
        };

        return (
          <FieldDecorator
            className={className}
            label={label}
            required={required}
            hasErrors={hasErrors}
            errors={errors}
          >
            {React.cloneElement(children, {
              ...newControl,
              errors,
              hasErrors,
              touched,
            })}
          </FieldDecorator>
        );
      }}
    </Field>
  );
}

FormField.propTypes = {
  rules: PropTypes.array,
  name: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
};

export { FormField };
