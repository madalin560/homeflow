import React from "react";
import PropTypes from "prop-types";
import Form from "rc-field-form";
import _ from "lodash";

import { FormField } from "./FormField";

import { CACHED_FIELDS, FORM_ID } from "configs/form-config";

function CachedForm({
  formId,
  children,
  onFinish = () => {},
  initialValues = {},
  ...rest
}) {
  const handleFormSubmit = (values) => {
    const sessionStorageCache = sessionStorage.getItem("formsCache");
    const parsedCache = JSON.parse(sessionStorageCache);

    if (formId) {
      const newCachedFormValues = _.pick(values, CACHED_FIELDS[formId]);

      sessionStorage.setItem(
        "formsCache",
        JSON.stringify({
          ...parsedCache,
          [formId]: newCachedFormValues,
        })
      );
    }

    onFinish(values);
  };

  const sessionStorageCache = sessionStorage.getItem("formsCache");
  const parsedCache = JSON.parse(sessionStorageCache);
  const cacheInitialValues = _.get(parsedCache, formId, {});

  return (
    <Form
      onFinish={handleFormSubmit}
      initialValues={{
        ...cacheInitialValues,
        ...initialValues,
      }}
      {...rest}
    >
      {children}
    </Form>
  );
}

FormField.propTypes = {
  formId: PropTypes.oneOf(Object.values(FORM_ID)),
  onFinish: PropTypes.func,
};

export { CachedForm };
