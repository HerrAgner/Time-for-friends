import React, { useState, useEffect, useContext } from "react";
import moment from "moment-timezone";
import { Store } from "../Store";

const Clock = timeZone => {
  const { state } = useContext(Store);
  const timeFormat = state.language.code === "en" ? "hh:mm:ss a" : "HH:mm:ss";
  const [time, setTime] = useState(
    moment()
      .tz(timeZone.timeZone)
      .format(timeFormat)
  );

  useEffect(() => {
    setTime(
      moment()
        .tz(timeZone.timeZone)
        .format(timeFormat)
    );
  }, [timeFormat, timeZone.timeZone]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTime(
        moment()
          .tz(timeZone.timeZone)
          .format(timeFormat)
      );
    }, 1000);
    return () => clearTimeout(timeout);
  });

  return <div>{time}</div>;
};

export default Clock;
