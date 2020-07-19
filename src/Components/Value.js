import React from "react";

export default function Value(props) {
  {
    if (props.inSquarePoints != 0) {
      return (
        <h2>
          Current Value of Pi:{" "}
          {(4 * (props.inCirclePoints / props.inSquarePoints)).toPrecision(7)}
        </h2>
      );
    } else {
      return <h2>Current Value of Pi: Press Start to Calculate!</h2>;
    }
  }
}
