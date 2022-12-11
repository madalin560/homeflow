import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import "./Button.scss";

function Button({
  disabled = false,
  action = _.noop,
  className,
  type,
  style,
  children,
}) {
  const getButtonStyle = () => {
    const classNames = ["button"];
    classNames.push(`button--${type}`);

    if (className) {
      classNames.push(className);
    }

    if (disabled) {
      classNames.push("disabled");
    }

    return classNames.join(" ");
  };

  const handleClick = () => {
    if (!disabled) {
      action();
    }
  };

  return (
    <div style={style} className={getButtonStyle()} onClick={handleClick}>
      {children}
    </div>
  );
}

Button.TYPES = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  CONFIRM: "confirm",
  CANCEL: "cancel",
};

Button.propTypes = {
  type: PropTypes.oneOf(Object.values(Button.TYPES)),
  className: PropTypes.string,
  action: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

export { Button };
