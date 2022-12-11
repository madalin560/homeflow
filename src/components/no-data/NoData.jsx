import React from "react";
import {BoxSeam} from "react-bootstrap-icons";

function NoData({action}) {
  return (
    <div className="flex-row text-center">
      <BoxSeam className="mb-4" size={48} color="royalBlue" />
      <h5>You are not part of any family</h5>
      <br />
      {action}
    </div>
  );
}

export { NoData };
