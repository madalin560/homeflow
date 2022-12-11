import React from "react";
import PropTypes from "prop-types";
import Toast from "react-bootstrap/Toast";

import { ToastService } from "common/services/toast-service/ToastService";

import { TOAST_TYPES, TOASTS } from "configs/toast-config";

import "./BaseToast.scss";

function BaseToast(props) {
  // Configure the style and behavior of this toast, based on its type
  const { title, delay, className } = TOASTS[props.type];

  const handleClose = () => {
    ToastService.hideToast(props.id);
  };

  return (
    <Toast
      key={props.id}
      onClose={handleClose}
      autohide
      delay={delay}
      className={`mx-auto ${className}`}
    >
      <Toast.Header>
        <strong className="mr-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{props.children}</Toast.Body>
    </Toast>
  );
}

BaseToast.propTypes = {
  type: PropTypes.oneOf([TOAST_TYPES.SUCCESS, TOAST_TYPES.ERROR]),
};

export { BaseToast };
