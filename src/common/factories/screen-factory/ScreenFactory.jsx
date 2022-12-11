import React from "react";
import PropTypes from "prop-types";

import { SCREENS } from "configs/screens-config";

function ScreenFactory(props) {
  if (props.screens.length === 0) {
    return null;
  }
  return props.screens.map((screen, index) => {
    const Screen = SCREENS[screen.type];

    return <Screen key={index} data={screen} />;
  });
}

ScreenFactory.propTypes = {
  screens: PropTypes.array,
};

export { ScreenFactory };
