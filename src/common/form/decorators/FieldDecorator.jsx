import React from "react";
import PropTypes from "prop-types";
import { ExclamationOctagonFill } from "react-bootstrap-icons";

import "./FieldDecorator.scss";

const MANDATORY_SIGN = "*";

function FieldDecorator(props) {
  const { label, className, required, children, errors } = props;

  const getErrors = (errorArray) =>
    errorArray[0] && (
      <div className="error-message">
        <ExclamationOctagonFill color="red" />
        <span>{errorArray[0]}</span>
      </div>
    );

  return (
    <div className={`${className || ""} form-field field-decorator`}>
      {label && (
        <label>
          {label}
          {required && <span className="mandatory">{MANDATORY_SIGN}</span>}
        </label>
      )}
      {children}
      {errors.length > 0 && getErrors(errors)}
    </div>
  );
}

FieldDecorator.propTypes = {
  children: PropTypes.node,
  required: PropTypes.bool,
  errors: PropTypes.array,
  className: PropTypes.string,
  label: PropTypes.string,
};

export { FieldDecorator };
