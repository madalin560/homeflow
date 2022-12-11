import React from "react";
import Datetime from "react-datetime";
import moment from "moment";

const DATE_DISPLAY_FORMAT = "DD-MM-YYYY";

function DateTimeInput(props) {
  return (
    <Datetime
      {...props}
      onChange={(value) => {
        // Format date before setting form value to a format that .NET can bind to DateTime
        const formattedValue = moment(value).format("YYYY-MM-DD");
        props.onChange(formattedValue);
      }}
      value={moment(props.value).format(DATE_DISPLAY_FORMAT)}
      dateFormat={DATE_DISPLAY_FORMAT}
      timeFormat={false}
    />
  );
}

export { DateTimeInput };
