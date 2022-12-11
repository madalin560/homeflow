import React from "react";
import PropTypes from "prop-types";

import { MODALS } from "configs/modal-config";

function ModalFactory(props) {
  if (props.modalStack.length === 0) {
    return null;
  }

  return props.modalStack.map((modal, index) => {
    const Modal = MODALS[modal.type];
    return <Modal key={index} data={modal.data} />;
  });
}

ModalFactory.propTypes = {
  modalStack: PropTypes.array,
};

export { ModalFactory };
