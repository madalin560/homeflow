import React from "react";

function CheckboxInput(props) {
  let inputClasses = ["checkbox-input-field"];

  if (props.hasErrors) {
    inputClasses.push("input--invalid");
  }

  return (
    <div className="checkox-input">
      <input
        type="checkbox"
        className={inputClasses.join(" ")}
        disabled={props.disabled}
        onChange={(e) => props.onChange(e.target.checked)}
        checked={props.value}
      />
      {props.text}
    </div>
  );
}

export { CheckboxInput };
