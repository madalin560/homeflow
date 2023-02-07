import React from "react";

function TextInput(props) {
  let inputClasses = ["text-input-field"];

  if (props.hasErrors) {
    inputClasses.push("input--invalid");
  }

  return (
    <input
      type={props.type}
      className={inputClasses.join(" ")}
      disabled={props.disabled}
      onChange={props.onChange}
      value={props.value}
    />
  );
}

export { TextInput };
