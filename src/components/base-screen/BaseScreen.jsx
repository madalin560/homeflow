import React from "react";
import PropTypes from "prop-types";
import { X } from "react-bootstrap-icons";
import _ from "lodash";

import { ScreenService } from "common/services/screen-service/ScreenService";

import "./BaseScreen.scss";

function BaseScreen(props) {
  const closeScreen = () => {
    props.onClose();
    ScreenService.closeScreen(props.id);
  };

  return (
    <React.Fragment>
      <div className="overlay" />
      <div className="screen">
        <div className="screen-header">
          <h4>{props.title}</h4>
          <X onClick={closeScreen} size={48} />
        </div>
        <div className="screen-content">{props.children}</div>
        <div className="screen-footer">{props.footer}</div>
      </div>
    </React.Fragment>
  );
}

BaseScreen.propTypes = {
  children: PropTypes.node,
  footer: PropTypes.node,
  title: PropTypes.string,
};

BaseScreen.defaultProps = {
  onClose: _.noop,
};

export { BaseScreen };
