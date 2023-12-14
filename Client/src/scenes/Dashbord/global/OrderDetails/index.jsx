import React, { memo, useMemo } from "react";
import StringFormatDetail from "./StringFormatDetail";
import ArrayFormatDetail from "./ArrayFormatDetail";
import ObjectFormatDetail from "./ObjectFormatDetail";

function OrderDetails({ details }) {
  const keys = Object.keys(details);
  return keys.map((elm) => {
    let value = details[elm];
    console.log(value);
    if (typeof value === "string") {
      return <StringFormatDetail elm={elm} value={value} />;
    } else if (Array.isArray(value)) {
      return <ArrayFormatDetail value={value} />;
    } else if (
      typeof value === "object" &&
      value !== null &&
      value.constructor === Object
    ) {
      return <ObjectFormatDetail value={value} />;
    }
    return "";
  });
}

export default memo(OrderDetails);
