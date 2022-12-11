import React from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

function AsyncSelectInput(props) {
  const handleChange = (selections) => {
    if (props.isMulti) {
      props.onChange(selections.map((selection) => selection.value));
    } else {
      props.onChange(selections.value);
    }
  };

  return (
    <AsyncSelect
      defaultValue={props.defaultValue}
      isMulti={props.isMulti}
      onChange={handleChange}
      components={animatedComponents}
      loadOptions={props.loadOptions}
    />
  );
}

AsyncSelectInput.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  isMulti: PropTypes.bool,
  loadOptions: PropTypes.func.isRequired,
  onChange: PropTypes.func,
};

AsyncSelectInput.defaultProps = {
  isMulti: false,
  defaultValue: true,
};

export { AsyncSelectInput };
