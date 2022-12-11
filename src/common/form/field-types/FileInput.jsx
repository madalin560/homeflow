import React from "react";
import { Upload } from "react-bootstrap-icons";
import _ from "lodash";

import { TEXT } from "constants/dictionary";

function FileInput(props) {
  let inputClasses = ["file-input-field"];

  if (props.hasErrors) {
    inputClasses.push("input--invalid");
  }

  return (
    <div className={inputClasses.join(" ")}>
      <label className="file-upload-wrapper" htmlFor="upload-file">
        <Upload size={24} color="royalBlue" />
        <div>{_.get(props.value, "name", TEXT.selectAFile)}</div>
        <div>{TEXT.acceptedFormats}.csv</div>
      </label>
      <input
        id="upload-file"
        accept="text/csv"
        type="file"
        disabled={props.disabled}
        onChange={(e) => props.onChange(e.target.files[0])}
      />
    </div>
  );
}

export { FileInput };
