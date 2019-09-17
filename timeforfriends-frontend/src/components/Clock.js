import React, { useState, useEffect } from "react";
import moment from "moment-timezone";

const Clock = timeZone => {
  const [time, setTime] = useState(
    moment()
      .tz(timeZone.timeZone)
      .format("HH:mm:ss")
  );

  useEffect(() => {
   const timeout = setTimeout(() => {
      setTime(
        moment()
          .tz(timeZone.timeZone)
          .format("HH:mm:ss")
      );
    }, 1000);
    return() => clearTimeout(timeout)
  });

  return <div>{time}</div>;
};

export default Clock;
