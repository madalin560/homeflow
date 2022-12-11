import React from "react";
import PropTypes from "prop-types";

import { BaseToast } from "components/base-toast/BaseToast";

import "./ToastFactory.scss";

const MAX_TOASTS_DISPLAYED = 2;

function ToastFactory(props) {
  if (props.toasts.length === 0) {
    return null;
  }

  return (
    <div className="toast-container">
      {props.toasts.slice(0, MAX_TOASTS_DISPLAYED).map((toast) => (
        <BaseToast id={toast.id} type={toast.type}>
          {toast.message}
        </BaseToast>
      ))}
    </div>
  );
}

ToastFactory.propTypes = {
  toasts: PropTypes.array,
};

export { ToastFactory };
