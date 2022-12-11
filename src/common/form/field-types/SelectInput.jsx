import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import _ from "lodash";

const animatedComponents = makeAnimated();

function SelectInput(props) {
  const handleChange = (selections) => {
    if (props.isMulti) {
      props.onChange(selections.map((selection) => selection.value));
    } else {
      const value = _.get(selections, "value", null);
      props.onChange(value);
    }
  };

  const selectValue = !props.isMulti
    ? _.find(props.options, ["value", props.value]) || null
    : _.filter(props.options, (option) =>
        _.get(props, "value", []).some((value) =>
          _.isEqual(value, option.value)
        )
      );

  return (
    <Select
      menuPosition="fixed"
      className="select-field"
      value={selectValue}
      isClearable={props.isClearable}
      isDisabled={props.isDisabled}
      onChange={handleChange}
      closeMenuOnSelect={!props.isMulti}
      components={animatedComponents}
      isMulti={props.isMulti}
      options={props.options}
    />
  );
}

SelectInput.propTypes = {
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool,
  options: PropTypes.array,
  onChange: PropTypes.func,
};

SelectInput.defaultProps = {
  isClearable: true,
  isMulti: false,
  options: [],
};

export { SelectInput };
