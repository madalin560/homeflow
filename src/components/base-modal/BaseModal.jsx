import React from "react";
import PropTypes from "prop-types";
import { X } from "react-bootstrap-icons";

import { ModalService } from "common/services/modal-service/ModalService";

import "./BaseModal.scss";

function BaseModal(props) {
  const closeModal = () => {
    ModalService.closeModal(props.id);
  };

  return (
    <React.Fragment>
      <div className="overlay" />
      <div
        className="modal-container"
        style={{ width: `${props.width}%`, height: `${props.height}%` }}
      >
        <div className="modal-header">
          <h4>{props.title}</h4>
          <X onClick={closeModal} size={32} />
        </div>
        <div className="modal-content">{props.children}</div>
        <div className="modal-footer">{props.footer}</div>
      </div>
    </React.Fragment>
  );
}

BaseModal.propTypes = {
  children: PropTypes.node,
  footer: PropTypes.node,
  title: PropTypes.string,
};

export { BaseModal };
