import React, { useState, useEffect } from "react";
import moment from "moment-timezone";

const Clock = timeZone => {
  const [time, setTime] = useState(moment()
      .tz(timeZone.timeZone)
      .format("hh:mm:ss"));

  useEffect(() => {
    setTimeout(() => {
      setTime(
        moment()
          .tz(timeZone.timeZone)
          .format("hh:mm:ss")
      );
    }, 1000);
    // return () => clearTimeout(timer);
  });

  return <div>{time}</div>;
};

export default Clock;
