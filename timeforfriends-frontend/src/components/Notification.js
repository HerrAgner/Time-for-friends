import React from "react";
import { green, red } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";

const Notification = ({ message, type }) => {
  const notificationStyle = {
    color: type === "error" ? red[400] : green[400],
    // background: "lightgrey",
    fontSize: "20px",
    // borderStyle: "solid",
    // borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px"
  };

  if (message === null) {
    return null;
  }

  return (
    <Paper className="notification" style={message && notificationStyle}>
      {message}
    </Paper>
  );
};

export default Notification;
